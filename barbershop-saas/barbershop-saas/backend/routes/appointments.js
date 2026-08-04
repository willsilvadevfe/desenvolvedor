const express = require('express');
const router = express.Router();
const db = require('../db');
const { sendClientConfirmation, sendBarberNotification } = require('../mailer');
const { requireAdmin } = require('../auth');

// --- Regras de funcionamento da barbearia ---
const WORK_START_MINUTES = 8 * 60;   // 08:00
const WORK_END_MINUTES = 17 * 60;    // 17:00
const SLOT_DURATION_MINUTES = 30;    // corte demora 30 minutos
const CLOSED_WEEKDAY = 0;            // 0 = Domingo (getDay). Seg(1) a Sáb(6) funcionam.

function minutesToTime(minutes) {
  const h = String(Math.floor(minutes / 60)).padStart(2, '0');
  const m = String(minutes % 60).padStart(2, '0');
  return `${h}:${m}`;
}

// Gera todos os horários possíveis do dia (08:00, 08:30, ... até o último que caiba antes das 17:00)
function generateDaySlots() {
  const slots = [];
  for (
    let minutes = WORK_START_MINUTES;
    minutes + SLOT_DURATION_MINUTES <= WORK_END_MINUTES;
    minutes += SLOT_DURATION_MINUTES
  ) {
    slots.push(minutesToTime(minutes));
  }
  return slots;
}

// Interpreta 'YYYY-MM-DD' como data local (evita bug de fuso horário do `new Date('YYYY-MM-DD')`)
function parseDateLocal(dateStr) {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function isValidDateFormat(dateStr) {
  return /^\d{4}-\d{2}-\d{2}$/.test(dateStr);
}

function isWorkingDay(dateStr) {
  const date = parseDateLocal(dateStr);
  return date.getDay() !== CLOSED_WEEKDAY;
}

// GET /api/appointments/available?date=YYYY-MM-DD
// Retorna os horários do dia e se cada um está disponível ou já ocupado.
router.get('/available', (req, res) => {
  const { date } = req.query;

  if (!date || !isValidDateFormat(date)) {
    return res.status(400).json({ error: 'Informe uma data válida (YYYY-MM-DD).' });
  }

  if (!isWorkingDay(date)) {
    return res.json({ date, workingDay: false, slots: [] });
  }

  const booked = db
    .prepare('SELECT time FROM appointments WHERE date = ?')
    .all(date)
    .map((row) => row.time);

  const now = new Date();
  const isToday = parseDateLocal(date).toDateString() === now.toDateString();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  const slots = generateDaySlots().map((time) => {
    const [h, m] = time.split(':').map(Number);
    const slotMinutes = h * 60 + m;
    const isPast = isToday && slotMinutes <= nowMinutes;
    return {
      time,
      available: !booked.includes(time) && !isPast,
    };
  });

  res.json({ date, workingDay: true, slots });
});

// POST /api/appointments
// Cria um novo agendamento, bloqueando o horário para os demais.
router.post('/', async (req, res) => {
  const { name, email, whatsapp, service, notes, date, time } = req.body;

  if (!name || !email || !whatsapp || !service || !date || !time) {
    return res.status(400).json({ error: 'Preencha todos os campos obrigatórios.' });
  }

  if (!isValidDateFormat(date)) {
    return res.status(400).json({ error: 'Data inválida.' });
  }

  if (!isWorkingDay(date)) {
    return res.status(400).json({ error: 'A barbearia não funciona aos domingos.' });
  }

  if (!generateDaySlots().includes(time)) {
    return res.status(400).json({ error: 'Horário fora do funcionamento da barbearia.' });
  }

  try {
    const stmt = db.prepare(`
      INSERT INTO appointments (name, email, whatsapp, service, notes, date, time)
      VALUES (@name, @email, @whatsapp, @service, @notes, @date, @time)
    `);
    const appointment = { name, email, whatsapp, service, notes: notes || '', date, time };
    const info = stmt.run(appointment);
    appointment.id = info.lastInsertRowid;

    // Envia os e-mails, mas não deixa a reserva falhar caso o e-mail dê erro
    try {
      await sendClientConfirmation(appointment);
      await sendBarberNotification(appointment);
    } catch (mailError) {
      console.error('Falha ao enviar e-mail:', mailError.message);
    }

    res.status(201).json({ success: true, appointment });
  } catch (err) {
    if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return res.status(409).json({ error: 'Esse horário acabou de ser reservado por outra pessoa. Escolha outro.' });
    }
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar agendamento.' });
  }
});

// GET /api/appointments (protegida - painel do barbeiro)
// Lista todos os agendamentos, com filtro opcional por data.
router.get('/', requireAdmin, (req, res) => {
  const { date } = req.query;
  const rows = date
    ? db.prepare('SELECT * FROM appointments WHERE date = ? ORDER BY time ASC').all(date)
    : db.prepare('SELECT * FROM appointments ORDER BY date ASC, time ASC').all();
  res.json({ appointments: rows });
});

// DELETE /api/appointments/:id (protegida - painel do barbeiro cancela um horário)
router.delete('/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  const info = db.prepare('DELETE FROM appointments WHERE id = ?').run(id);
  if (info.changes === 0) {
    return res.status(404).json({ error: 'Agendamento não encontrado.' });
  }
  res.json({ success: true });
});

module.exports = router;
