import { useEffect, useState } from 'react';
import { toDateKey, formatDateBR } from '../utils/date.js';
import { apiFetch } from '../utils/api.js';
import { fetchMockSlots, submitMockAppointment } from '../utils/mockSlots.js';

// true só se VITE_USE_MOCK=true estiver no .env (modo portfólio/demo)
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

const SERVICES = [
  'Corte simples',
  'Corte + barba',
  'Barba',
  'Corte degradê',
  'Sobrancelha',
];

export default function BookingForm({ selectedDate }) {
  const [slots, setSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', whatsapp: '', service: SERVICES[0], notes: '' });
  const [status, setStatus] = useState({ state: 'idle', message: '' }); // idle | loading | success | error

  const dateKey = selectedDate ? toDateKey(selectedDate) : null;

  useEffect(() => {
    if (!dateKey) return;
    setSelectedTime(null);
    setStatus({ state: 'idle', message: '' });
    setLoadingSlots(true);

    // ÚNICA mudança: escolhe a fonte do dado, resto do fluxo é idêntico
    const request = USE_MOCK
      ? fetchMockSlots()
      : apiFetch(`/appointments/available?date=${dateKey}`);

    request
      .then((data) => setSlots(data.slots || []))
      .catch(() => setSlots([]))
      .finally(() => setLoadingSlots(false));
  }, [dateKey]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!selectedTime) return;

    setStatus({ state: 'loading', message: '' });
    try {
      // ÚNICA outra mudança: mesmo esquema aqui
      if (USE_MOCK) {
        await submitMockAppointment();
      } else {
        await apiFetch('/appointments', {
          method: 'POST',
          body: JSON.stringify({ ...form, date: dateKey, time: selectedTime }),
        });
      }

      setStatus({
        state: 'success',
        message: `Agendamento confirmado para ${formatDateBR(dateKey)} às ${selectedTime}. Você vai receber um e-mail de confirmação.`,
      });
      setForm({ name: '', email: '', whatsapp: '', service: SERVICES[0], notes: '' });
      setSelectedTime(null);
      setSlots((prev) => prev.map((s) => (s.time === selectedTime ? { ...s, available: false } : s)));
    } catch (err) {
      setStatus({ state: 'error', message: err.message });
    }
  }

  if (!selectedDate) {
    return (
      <div className="booking-form booking-form--empty">
        <p>Selecione um dia no calendário para ver os horários disponíveis.</p>
      </div>
    );
  }

  return (
    <div className="booking-form">
      <h3 className="booking-form__date">{formatDateBR(dateKey)}</h3>

      {loadingSlots && <p className="booking-form__hint">Carregando horários…</p>}

      {!loadingSlots && slots.length > 0 && (
        <div className="slots">
          {slots.map((slot) => (
            <button
              type="button"
              key={slot.time}
              className={[
                'slots__item',
                !slot.available ? 'slots__item--disabled' : '',
                selectedTime === slot.time ? 'slots__item--selected' : '',
              ].join(' ').trim()}
              disabled={!slot.available}
              onClick={() => setSelectedTime(slot.time)}
            >
              {slot.time}
            </button>
          ))}
        </div>
      )}

      {selectedTime && (
        <form className="client-form" onSubmit={handleSubmit}>
          <div className="client-form__row">
            <label>
              Nome completo
              <input type="text" name="name" required value={form.name} onChange={handleChange} />
            </label>
          </div>

          <div className="client-form__row client-form__row--split">
            <label>
              E-mail
              <input type="email" name="email" required value={form.email} onChange={handleChange} />
            </label>
            <label>
              WhatsApp
              <input
                type="tel"
                name="whatsapp"
                placeholder="(12) 90000-0000"
                required
                value={form.whatsapp}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="client-form__row">
            <label>
              Serviço
              <select name="service" value={form.service} onChange={handleChange}>
                {SERVICES.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="client-form__row">
            <label>
              Observações (opcional)
              <textarea name="notes" rows={2} value={form.notes} onChange={handleChange} />
            </label>
          </div>

          <button type="submit" className="client-form__submit" disabled={status.state === 'loading'}>
            {status.state === 'loading' ? 'Confirmando…' : `Confirmar horário das ${selectedTime}`}
          </button>
        </form>
      )}

      {status.state === 'success' && <p className="booking-form__message booking-form__message--success">{status.message}</p>}
      {status.state === 'error' && <p className="booking-form__message booking-form__message--error">{status.message}</p>}
    </div>
  );
}