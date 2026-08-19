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

  if (!dados.dataVencimento) {
    erros.dataVencimento = "Informe a data de vencimento.";
  }

  if (!dados.tipoObjeto) {
    erros.tipoObjeto = "Selecione a linha.";
  }

  if (!dados.setor) {
    erros.setor = "Selecione o equipamento.";
  }

  if (!dados.responsavel) {
    erros.responsavel = "Selecione a caracteristica.";
  }

  // Só compara as datas se as duas estiverem preenchidas,
  // para não sobrescrever as mensagens de campo obrigatório acima.
  if (dados.dataCalibracao && dados.dataVencimento) {
    if (dados.dataVencimento < dados.dataCalibracao) {
      erros.dataVencimento =
        "A data de vencimento não pode ser anterior à data de calibração.";
    }
  }

  return {
    valido: Object.keys(erros).length === 0,
    erros,
  };
}
