export function calcularMinutosDecorridos(dataChegada) {
  const diffMs = Date.now() - new Date(dataChegada).getTime();
  return Math.floor(diffMs / 60000);
}

export function formatarTempoEspera(dataChegada) {
  const minutos = calcularMinutosDecorridos(dataChegada);
  if (minutos < 3) return "Agora mesmo";
  if (minutos < 60) return `${minutos} min`;
  const horas = Math.floor(minutos / 60);
  const min = minutos % 60;
  return `${horas}h ${min}min`;
}

export function getStatusEspera(dataChegada) {
  const minutos = calcularMinutosDecorridos(dataChegada);
  if (minutos < 15) return "verde";
  if (minutos < 40) return "amarela";
  return "vermelha";
}