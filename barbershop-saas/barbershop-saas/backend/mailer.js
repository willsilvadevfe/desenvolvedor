const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT || 465),
  secure: Number(process.env.EMAIL_PORT || 465) === 465, // true para porta 465, false para 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

function formatDateBR(dateStr) {
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
}

async function sendClientConfirmation(appointment) {
  const shopName = process.env.BARBERSHOP_NAME || 'Barbearia';

  const html = `
    <div style="font-family: Arial, sans-serif; background:#111; color:#eee; padding:24px; border-radius:8px;">
      <h2 style="color:#a855f7; margin-top:0;">${shopName}</h2>
      <p>Olá, <strong>${appointment.name}</strong>! Seu agendamento foi confirmado com sucesso. ✅</p>
      <table style="width:100%; border-collapse: collapse; margin-top:16px;">
        <tr><td style="padding:6px 0; color:#aaa;">Serviço</td><td style="padding:6px 0;"><strong>${appointment.service}</strong></td></tr>
        <tr><td style="padding:6px 0; color:#aaa;">Data</td><td style="padding:6px 0;"><strong>${formatDateBR(appointment.date)}</strong></td></tr>
        <tr><td style="padding:6px 0; color:#aaa;">Horário</td><td style="padding:6px 0;"><strong>${appointment.time}</strong></td></tr>
        <tr><td style="padding:6px 0; color:#aaa;">WhatsApp informado</td><td style="padding:6px 0;">${appointment.whatsapp}</td></tr>
      </table>
      ${appointment.notes ? `<p style="margin-top:16px; color:#ccc;">Observações: ${appointment.notes}</p>` : ''}
      <p style="margin-top:24px; color:#999; font-size:13px;">Caso precise cancelar ou remarcar, entre em contato pelo WhatsApp da barbearia.</p>
    </div>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to: appointment.email,
    subject: `Agendamento confirmado - ${formatDateBR(appointment.date)} às ${appointment.time}`,
    html,
  });
}

async function sendBarberNotification(appointment) {
  const barberEmail = process.env.BARBER_EMAIL;
  if (!barberEmail) return;

  const html = `
    <div style="font-family: Arial, sans-serif;">
      <h3>Novo agendamento recebido</h3>
      <p><strong>Cliente:</strong> ${appointment.name}</p>
      <p><strong>E-mail:</strong> ${appointment.email}</p>
      <p><strong>WhatsApp:</strong> ${appointment.whatsapp}</p>
      <p><strong>Serviço:</strong> ${appointment.service}</p>
      <p><strong>Data:</strong> ${formatDateBR(appointment.date)} às ${appointment.time}</p>
      ${appointment.notes ? `<p><strong>Observações:</strong> ${appointment.notes}</p>` : ''}
    </div>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to: barberEmail,
    subject: `Novo agendamento - ${formatDateBR(appointment.date)} às ${appointment.time}`,
    html,
  });
}

module.exports = { sendClientConfirmation, sendBarberNotification };
