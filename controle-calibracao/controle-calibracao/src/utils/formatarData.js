// O input type="date" do HTML sempre entrega a data no formato
// AAAA-MM-DD. Essa função converte para o formato que usamos na
// tela e no CSV: DD/MM/AAAA.
export function formatarDataBR(dataISO) {
  if (!dataISO) return '';
  const [ano, mes, dia] = dataISO.split('-');
  return `${dia}/${mes}/${ano}`;
}

// Usada para carimbar o relatório (nome do arquivo e corpo do e-mail)
// com a data e a hora exatas em que o usuário finalizou o relatório.
export function obterDataHoraAtualFormatada() {
  const agora = new Date();
  const dois = (numero) => String(numero).padStart(2, '0');

  return {
    data: `${dois(agora.getDate())}/${dois(agora.getMonth() + 1)}/${agora.getFullYear()}`,
    horario: `${dois(agora.getHours())}:${dois(agora.getMinutes())}`,
  };
}
