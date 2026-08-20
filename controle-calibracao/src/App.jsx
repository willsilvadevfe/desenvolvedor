import { useState } from 'react';
import Header from './components/Header';
import FormularioLancamento from './components/FormularioLancamento';
import ListaLancamentos from './components/ListaLancamentos';
import ModalConfirmacao from './components/ModalConfirmacao';
import { gerarArquivoCSV, baixarCSV } from './services/csvService';
import { enviarRelatorioPorEmail } from './services/emailService';
import { calcularStatus, STATUS } from './utils/statusCalibracao';
import { obterDataHoraAtualFormatada } from './utils/formatarData';
import { LINHAS } from './data/opcoes';
import './App.css';

let proximoId = 1;

function App() {
  const [registros, setRegistros] = useState([]);

  // Nome e Linha: pedidos uma única vez por sessão, igual como já
  // funcionava com o nome. Ambos somem se a página recarregar.
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [nomeTemporario, setNomeTemporario] = useState('');
  const [linhaSelecionada, setLinhaSelecionada] = useState('');
  const [linhaTemporaria, setLinhaTemporaria] = useState('');

  const [mensagemSucesso, setMensagemSucesso] = useState('');
  const [avisoSemRegistros, setAvisoSemRegistros] = useState(false);

  const [modalAberto, setModalAberto] = useState(false);
  const [statusEnvio, setStatusEnvio] = useState('idle');
  const [arquivoGerado, setArquivoGerado] = useState(null);

  const identificacaoCompleta = Boolean(nomeUsuario && linhaSelecionada);

  // Confirma nome + linha da tela de identificação e libera o
  // restante do app. Só avança se os dois campos estiverem preenchidos.
  function confirmarIdentificacao(evento) {
    evento.preventDefault();
    const nomeLimpo = nomeTemporario.trim();
    if (nomeLimpo && linhaTemporaria) {
      setNomeUsuario(nomeLimpo);
      setLinhaSelecionada(linhaTemporaria);
    }
  }

  // Chamada pelo FormularioLancamento quando um lançamento é válido.
  function adicionarRegistro(dados) {
    const novoRegistro = {
      id: proximoId++,
      nome: nomeUsuario,
      linha: linhaSelecionada,
      ...dados,
    };
    setRegistros((anteriores) => [...anteriores, novoRegistro]);

    setMensagemSucesso(
      `Instrumento lançado com sucesso! Total de instrumentos lançados: ${registros.length + 1}`
    );
    setTimeout(() => setMensagemSucesso(''), 3500);
  }

  function removerRegistro(id) {
    setRegistros((anteriores) => anteriores.filter((registro) => registro.id !== id));
  }

  function calcularResumo() {
    const totais = { total: registros.length, validos: 0, alerta: 0, vencidos: 0 };

    registros.forEach((registro) => {
      const status = calcularStatus(registro.dataVencimento);
      if (status === STATUS.VALIDO) totais.validos += 1;
      else if (status === STATUS.ALERTA) totais.alerta += 1;
      else totais.vencidos += 1;
    });

    return totais;
  }

  function abrirFinalizacao() {
    if (registros.length === 0) {
      setAvisoSemRegistros(true);
      setTimeout(() => setAvisoSemRegistros(false), 4000);
      return;
    }
    setStatusEnvio('idle');
    setModalAberto(true);
  }

  async function confirmarFinalizacao() {
    setStatusEnvio('enviando');

    const { blob, nomeArquivo } = gerarArquivoCSV(registros);
    setArquivoGerado({ blob, nomeArquivo });

    const { data, horario } = obterDataHoraAtualFormatada();
    const resumo = { ...calcularResumo(), data, horario };

    try {
      await enviarRelatorioPorEmail({ resumo, csvBlob: blob, nomeArquivo });
      setStatusEnvio('sucesso');
    } catch (erro) {
      console.error('Erro ao enviar relatório por e-mail:', erro);
      setStatusEnvio('erro');
    }
  }

  function baixarArquivoGerado() {
    if (arquivoGerado) {
      baixarCSV(arquivoGerado.blob, arquivoGerado.nomeArquivo);
    }
  }

  function iniciarNovoRelatorio() {
    setRegistros([]);
    setModalAberto(false);
    setStatusEnvio('idle');
    setArquivoGerado(null);
  }

  function fecharModal() {
    if (statusEnvio === 'enviando') return;
    setModalAberto(false);
  }

  return (
    <div className="pagina">
      <Header totalLancamentos={registros.length} />

      <main className="conteudo">
        {!identificacaoCompleta ? (
          <form className="formulario formulario-identificacao" onSubmit={confirmarIdentificacao}>
            <div className="campo">
              <label htmlFor="nomeUsuario">Seu nome</label>
              <input
                id="nomeUsuario"
                type="text"
                value={nomeTemporario}
                onChange={(e) => setNomeTemporario(e.target.value)}
                placeholder="Ex: João Silva"
                autoFocus
              />
            </div>

            <div className="campo">
              <label htmlFor="linhaSelecionada">Linha</label>
              <select
                id="linhaSelecionada"
                value={linhaTemporaria}
                onChange={(e) => setLinhaTemporaria(e.target.value)}
              >
                <option value="">Selecione...</option>
                {LINHAS.map((linha) => (
                  <option key={linha} value={linha}>
                    {linha}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="botao botao-lancar">
              Continuar
            </button>
          </form>
        ) : (
          <>
            <FormularioLancamento onLancar={adicionarRegistro} />

            {mensagemSucesso && (
              <div className="alerta alerta-sucesso" role="status">
                ✓ {mensagemSucesso}
              </div>
            )}

            {avisoSemRegistros && (
              <div className="alerta alerta-erro" role="alert">
                Nenhum relógio foi lançado. Realize pelo menos um lançamento antes de
                finalizar o relatório.
              </div>
            )}

            <ListaLancamentos registros={registros} onRemover={removerRegistro} />

            <div className="acoes-finalizar">
              <button type="button" className="botao botao-finalizar" onClick={abrirFinalizacao}>
                Finalizar relatório
              </button>
            </div>
          </>
        )}
      </main>

      {modalAberto && (
        <ModalConfirmacao
          resumo={calcularResumo()}
          statusEnvio={statusEnvio}
          onCancelar={fecharModal}
          onConfirmar={confirmarFinalizacao}
          onBaixarCSV={baixarArquivoGerado}
          onNovoRelatorio={iniciarNovoRelatorio}
        />
      )}
    </div>
  );
}

export default App;