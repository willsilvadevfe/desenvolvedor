import { useState, useMemo } from "react";
import { SETORES, opcoesPorTipo, CAMPO_INICIAL } from "../data/opcoes";
import { validarRegistro } from "../utils/validacoes";
import "./FormularioLancamento.css";

const MESES = [
  "01", "02", "03", "04", "05", "06",
  "07", "08", "09", "10", "11", "12",
];

function gerarOpcoesMesAno(anoInicial, anoFinal) {
  const opcoes = [];
  for (let ano = anoInicial; ano <= anoFinal; ano++) {
    for (let mes = 1; mes <= 12; mes++) {
      const mesFormatado = String(mes).padStart(2, "0");
      opcoes.push({
        value: `${ano}-${mesFormatado}`,
        label: `${MESES[mes - 1]}/${ano}`,
      });
    }
  }
  return opcoes;
}

// Soma 6 meses a uma data "YYYY-MM", ajustando o ano quando necessário.
// Dias são ignorados de propósito — só mês/ano importam aqui.
function calcularDataVencimento(dataCalibracao) {
  if (!dataCalibracao) return "";

  const [anoStr, mesStr] = dataCalibracao.split("-");
  let ano = parseInt(anoStr, 10);
  let mes = parseInt(mesStr, 10) + 6;

  while (mes > 12) {
    mes -= 12;
    ano += 1;
  }

  return `${ano}-${String(mes).padStart(2, "0")}`;
}

function formatarLabelMesAno(valor) {
  if (!valor) return "—";
  const [ano, mes] = valor.split("-");
  return `${mes}/${ano}`;
}

function FormularioLancamento({ onLancar }) {
  const [dados, setDados] = useState(CAMPO_INICIAL);
  const [erros, setErros] = useState({});

  const opcoesMesAno = useMemo(() => gerarOpcoesMesAno(2026, 2027), []);

  function atualizarCampo(campo, valor) {
    setDados((anterior) => {
      const novoEstado = { ...anterior, [campo]: valor };

      if (campo === "setor") {
        novoEstado.responsavel = "";
      }

      // Ao escolher a data de calibração, a de vencimento é
      // recalculada automaticamente (+6 meses).
      if (campo === "dataCalibracao") {
        novoEstado.dataVencimento = calcularDataVencimento(valor);
      }

      return novoEstado;
    });

    if (erros[campo]) {
      setErros((anterior) => ({ ...anterior, [campo]: undefined }));
    }
    if (campo === "dataCalibracao" && erros.dataVencimento) {
      setErros((anterior) => ({ ...anterior, dataVencimento: undefined }));
    }
  }

  function lidarComEnvio(evento) {
    evento.preventDefault();

    const resultado = validarRegistro(dados);
    if (!resultado.valido) {
      setErros(resultado.erros);
      return;
    }

    onLancar(dados);
    setDados(CAMPO_INICIAL);
    setErros({});
  }

  return (
    <form className="formulario" onSubmit={lidarComEnvio} noValidate>
      <div className="formulario-grade">
        <div className="campo">
          <label htmlFor="codigoObjeto">Código</label>
          <input
            id="codigoObjeto"
            type="text"
            value={dados.codigoObjeto}
            onChange={(e) => atualizarCampo("codigoObjeto", e.target.value)}
            placeholder="Ex: R-3251"
          />
          {erros.codigoObjeto && (
            <span className="campo-erro">{erros.codigoObjeto}</span>
          )}
        </div>

        <div className="campo">
          <label htmlFor="dataCalibracao">Data de calibração</label>
          <select
            id="dataCalibracao"
            value={dados.dataCalibracao}
            onChange={(e) => atualizarCampo("dataCalibracao", e.target.value)}
          >
            <option value="">Não informado</option>
            {opcoesMesAno.map((opcao) => (
              <option key={opcao.value} value={opcao.value}>
                {opcao.label}
              </option>
            ))}
          </select>
          {erros.dataCalibracao && (
            <span className="campo-erro">{erros.dataCalibracao}</span>
          )}
        </div>

        <div className="campo">
          <label htmlFor="dataVencimento">Data de vencimento</label>
          <input
            id="dataVencimento"
            type="text"
            value={formatarLabelMesAno(dados.dataVencimento)}
            disabled
            readOnly
          />
          {erros.dataVencimento && (
            <span className="campo-erro">{erros.dataVencimento}</span>
          )}
        </div>

        <div className="campo">
          <label htmlFor="setor">Equipamento</label>
          <select
            id="setor"
            value={dados.setor}
            onChange={(e) => atualizarCampo("setor", e.target.value)}
          >
            <option value="">Selecione...</option>
            {SETORES.map((setor) => (
              <option key={setor} value={setor}>
                {setor}
              </option>
            ))}
          </select>
          {erros.setor && <span className="campo-erro">{erros.setor}</span>}
        </div>

        <div className="campo">
          <label htmlFor="responsavel">Caracteristica</label>
          <select
            id="responsavel"
            value={dados.responsavel}
            onChange={(e) => atualizarCampo("responsavel", e.target.value)}
            disabled={!dados.setor}
          >
            <option value="">
              {dados.setor
                ? "Selecione..."
                : "Selecione um equipamento primeiro"}
            </option>
            {(opcoesPorTipo[dados.setor] ?? []).map((caracteristica) => (
              <option key={caracteristica} value={caracteristica}>
                {caracteristica}
              </option>
            ))}
          </select>
          {erros.responsavel && (
            <span className="campo-erro">{erros.responsavel}</span>
          )}
        </div>

        <div className="campo campo-radio">
          <span className="campo-rotulo">Etiqueta legível?</span>
          <div className="campo-radio-opcoes">
            <label htmlFor="etiquetaLegivelSim">
              <input
                id="etiquetaLegivelSim"
                type="radio"
                name="etiquetaLegivel"
                checked={dados.etiquetaLegivel === true}
                onChange={() => atualizarCampo("etiquetaLegivel", true)}
              />
              Sim
            </label>
            <label htmlFor="etiquetaLegivelNao">
              <input
                id="etiquetaLegivelNao"
                type="radio"
                name="etiquetaLegivel"
                checked={dados.etiquetaLegivel === false}
                onChange={() => atualizarCampo("etiquetaLegivel", false)}
              />
              Não
            </label>
          </div>
          {erros.etiquetaLegivel && (
            <span className="campo-erro">{erros.etiquetaLegivel}</span>
          )}
        </div>
      </div>

      <button type="submit" className="botao botao-lancar">
        Lançar instrumento
      </button>
    </form>
  );
}

export default FormularioLancamento;