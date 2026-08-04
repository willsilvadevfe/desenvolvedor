// src/utils/mockSlots.js
// Dados falsos usados só quando VITE_USE_MOCK=true (modo portfólio/demo)

export const MOCK_SLOTS = [
  { time: '09:00', available: true },
  { time: '09:30', available: true },
  { time: '10:00', available: false },
  { time: '10:30', available: true },
  { time: '11:00', available: true },
  { time: '14:00', available: true },
  { time: '14:30', available: false },
  { time: '15:00', available: true },
  { time: '15:30', available: true },
  { time: '16:00', available: true },
];

// Simula o delay de rede pra parecer real (opcional, mas ajuda na demo)
export function fetchMockSlots() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ slots: MOCK_SLOTS }), 500);
  });
}

// Simula o POST de confirmação de agendamento
export function submitMockAppointment() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ ok: true }), 700);
  });
}