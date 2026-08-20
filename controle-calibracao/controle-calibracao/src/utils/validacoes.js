// Recebe os dados de um lançamento e devolve quais campos estão
// inválidos (e por quê). Não mexe na tela, não usa alert() — apenas
// calcula e retorna um resultado, que o formulário usa para mostrar
// as mensagens de erro.
export function validarRegistro(dados) {
  const erros = {};

  if (!dados.codigoObjeto || !dados.codigoObjeto.trim()) {
    erros.codigoObjeto = "Informe o código do relógio.";
  }

  if (!dados.dataCalibracao) {
    erros.dataCalibracao = "Informe a data de calibração.";
  }

  // dataVencimento agora é calculada automaticamente a partir da
  // dataCalibracao (+6 meses). Essa checagem só deve disparar se
  // algo sair errado no cálculo — funciona como uma segurança.
  if (!dados.dataVencimento) {
    erros.dataVencimento = "Data de vencimento não pôde ser calculada.";
  }

  if (!dados.setor) {
    erros.setor = "Selecione o equipamento.";
  }

  if (!dados.responsavel) {
    erros.responsavel = "Selecione a caracteristica.";
  }

  if (dados.etiquetaLegivel === undefined || dados.etiquetaLegivel === null) {
    erros.etiquetaLegivel = "Selecione se a etiqueta está legível.";
  }

  return {
    valido: Object.keys(erros).length === 0,
    erros,
  };
}