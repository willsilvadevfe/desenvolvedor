export const WEEKDAY_LABELS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
export const MONTH_LABELS = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

// Formata um objeto Date para 'YYYY-MM-DD' usando o horário LOCAL
// (evita o bug de fuso horário do toISOString, que usa UTC).
export function toDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function isSameDay(a, b) {
  return toDateKey(a) === toDateKey(b);
}

export function isPastDay(date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const compare = new Date(date);
  compare.setHours(0, 0, 0, 0);
  return compare < today;
}

export function formatDateBR(dateKey) {
  const [year, month, day] = dateKey.split('-');
  return `${day}/${month}/${year}`;
}
