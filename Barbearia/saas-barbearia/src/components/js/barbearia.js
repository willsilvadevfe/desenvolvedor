export const BARBEARIA = {
  nome: "Navalha & Cia",
  // Número do barbeiro no formato internacional, apenas dígitos
  whatsapp: "5511999999999",
  telefoneVisivel: "+55 (11) 99999-9999",
  endereco: "Rua das Tesouras, 120 — Centro",
  horario: "Seg a Sáb · 08:00 às 17:00",
  instagram: "@navalhaecia",
};

export const SERVICOS = [
  { id: "corte", nome: "Corte Clássico", descricao: "Tesoura e máquina com finalização em toalha quente.", preco: "R$ 55" },
  { id: "barba", nome: "Barba Terapia", descricao: "Navalha, óleos quentes e massagem facial.", preco: "R$ 45" },
  { id: "combo", nome: "Cabelo + Barba", descricao: "O ritual completo da casa.", preco: "R$ 90" },
  { id: "pigmentacao", nome: "Pigmentação", descricao: "Preenchimento de falhas na barba ou cabelo.", preco: "R$ 40" },
  { id: "infantil", nome: "Corte Infantil", descricao: "Paciência de sobra para os pequenos.", preco: "R$ 45" },
  { id: "acabamento", nome: "Acabamento Express", descricao: "Pezinho, contorno e retoque rápido.", preco: "R$ 25" },
];

// Funcionamento: 08:00 às 17:00, cortes de 30 minutos
export const ABERTURA = 8;
export const FECHAMENTO = 17;
export const DURACAO_MIN = 30;

export function gerarHorarios() {
  const slots = [];
  for (let m = ABERTURA * 60; m + DURACAO_MIN <= FECHAMENTO * 60; m += DURACAO_MIN) {
    const h = String(Math.floor(m / 60)).padStart(2, "0");
    const min = String(m % 60).padStart(2, "0");
    slots.push(`${h}:${min}`);
  }
  return slots;
}

const DIAS = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
const MESES = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];

export function formatarData(date) {
  return `${DIAS[date.getDay()]}, ${date.getDate()} de ${MESES[date.getMonth()]} de ${date.getFullYear()}`;
}

export function isDomingo(date) {
  return date.getDay() === 0;
}

export function soDigitos(valor) {
  return (valor || "").replace(/\D/g, "");
}

export function whatsappUrl(numero, mensagem) {
  return `https://wa.me/${soDigitos(numero)}?text=${encodeURIComponent(mensagem)}`;
}

export function mensagemBarbeiro({ nome, servico, data, hora, telefone }) {
  return [
    `*Novo agendamento — ${BARBEARIA.nome}*`,
    "",
    `Cliente: ${nome}`,
    telefone ? `Telefone: ${telefone}` : null,
    `Serviço: ${servico.nome} (${servico.preco})`,
    `Data: ${formatarData(data)}`,
    `Horário: ${hora} (${DURACAO_MIN} min)`,
    "",
    "Corte marcado, por favor confirmar com o cliente.",
  ].filter(Boolean).join("\n");
}

export function mensagemCliente({ nome, servico, data, hora }) {
  return [
    `Olá, ${nome}! Aqui é a ${BARBEARIA.nome}.`,
    "",
    "O seu agendamento foi registado:",
    `Serviço: ${servico.nome} (${servico.preco})`,
    `Data: ${formatarData(data)}`,
    `Horário: ${hora}`,
    `Local: ${BARBEARIA.endereco}`,
    "",
    "Até já! Se precisar remarcar, é só responder esta mensagem.",
  ].join("\n");
}
