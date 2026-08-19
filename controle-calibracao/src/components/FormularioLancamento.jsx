import { useState, useMemo } from "react";
import { LINHAS, SETORES, opcoesPorTipo, CAMPO_INICIAL } from "../data/opcoes";
import { validarRegistro } from "../utils/validacoes";
import "./FormularioLancamento.css";

const NOMES_MESES = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

// Gera as opções de mês/ano dentro do intervalo permitido para calibração.
// Formato do value: "AAAA-MM" (mesmo padrão de um input type="date",
// só que sem o dia — assim continua fácil de ordenar/exportar no CSV).
function gerarOpcoesMesAno(anoInicial, anoFinal) {
  const opcoes = [];
  for (let ano = anoInicial; ano <= anoFinal; ano++) {
    for (let mes = 1; mes <= 12; mes++) {
      const mesFormatado = String(mes).padStart(2, "0");
      opcoes.push({
        value: `${ano}-${mesFormatado}`,
        label: `${NOMES_MESES[mes - 1]}/${ano}`,
      });
    }
  }
  return opcoes;
}

// "onLancar" é uma função que vem do App.jsx (component pai).
// Esse formulário não sabe nada sobre a lista de registros — ele só
// valida os dados e, se estiverem certos, avisa o pai através dessa
// função. Isso é o que chamamos de "levantar o estado" (lifting state up).
function FormularioLancamento({ onLancar }) {
  // dados: guarda o que o usuário está digitando/selecionando agora.
  const [dados, setDados] = useState(CAMPO_INICIAL);
  // erros: guarda as mensagens de validação de cada campo.
  const [erros, setErros] = useState({});

  // Intervalo fixo: janeiro/2025 até dezembro/2027.
  // Se precisar mudar a janela de anos no futuro, é só ajustar aqui.
  const opcoesMesAno = useMemo(() => gerarOpcoesMesAno(2025, 2027), []);

  function atualizarCampo(campo, valor) {
    setDados((anterior) => {
      const novoEstado = { ...anterior, [campo]: valor };
      // Se o equipamento mudou, a lista de características muda junto,
      // então limpamos a seleção anterior pra evitar um valor "fantasma"
      // que não existe mais nas novas opções.
      if (campo === "setor") {
        novoEstado.responsavel = "";
      }
      return novoEstado;
    });

    if (erros[campo]) {
      setErros((anterior) => ({ ...anterior, [campo]: undefined }));
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
          <select
            id="dataVencimento"
            value={dados.dataVencimento}
            onChange={(e) => atualizarCampo("dataVencimento", e.target.value)}
          >
            <option value="">Não informado</option>
            {opcoesMesAno.map((opcao) => (
              <option key={opcao.value} value={opcao.value}>
                {opcao.label}
              </option>
            ))}
          </select>
          {erros.dataVencimento && (
            <span className="campo-erro">{erros.dataVencimento}</span>
          )}
        </div>

        <div className="campo">
          <label htmlFor="tipoObjeto">Linhas</label>
          <select
            id="tipoObjeto"
            value={dados.tipoObjeto}
            onChange={(e) => atualizarCampo("tipoObjeto", e.target.value)}
          >
            <option value="">Selecione...</option>
            {LINHAS.map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>
          {erros.tipoObjeto && (
            <span className="campo-erro">{erros.tipoObjeto}</span>
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
