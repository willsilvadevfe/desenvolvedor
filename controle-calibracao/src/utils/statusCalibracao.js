// Quantidade de dias antes do vencimento em que o item passa a ser
// considerado "próximo do vencimento". Se um dia quiser mudar esse
// prazo de 30 para 45 dias, por exemplo, só precisa alterar aqui.
export const DIAS_ALERTA = 30;

export const STATUS = {
  VALIDO: 'valido',
  ALERTA: 'alerta',
  VENCIDO: 'vencido',
};

// Recebe a data de vencimento (formato AAAA-MM-DD, vindo do input date)
// e devolve qual dos três status ela representa hoje.
export function calcularStatus(dataVencimento) {
  if (!dataVencimento) return STATUS.VALIDO;

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const vencimento = new Date(`${dataVencimento}T00:00:00`);
  const diferencaEmDias = Math.ceil((vencimento - hoje) / (1000 * 60 * 60 * 24));

  if (diferencaEmDias < 0) return STATUS.VENCIDO;
  if (diferencaEmDias <= DIAS_ALERTA) return STATUS.ALERTA;
  return STATUS.VALIDO;
}

// Traduz o status "cru" (valido/alerta/vencido) em tudo que a
// interface precisa para exibi-lo: texto, emoji e cor.
// "label" é a versão sem acento, usada no CSV para evitar problemas
// de compatibilidade com alguns leitores.
export function obterInfoStatus(status) {
  switch (status) {
    case STATUS.VALIDO:
      return { label: 'Valido', texto: 'Válido', emoji: '🟢', cor: 'verde' };
    case STATUS.ALERTA:
      return {
        label: 'Proximo do vencimento',
        texto: 'Próximo do vencimento',
        emoji: '🟡',
        cor: 'amarelo',
      };
    case STATUS.VENCIDO:
      return { label: 'Vencido', texto: 'Vencido', emoji: '🔴', cor: 'vermelho' };
    default:
      return { label: '', texto: '', emoji: '', cor: '' };
  }
}
