import { useState } from 'react';
import Header from './components/Header';
import FormularioLancamento from './components/FormularioLancamento';
import ListaLancamentos from './components/ListaLancamentos';
import ModalConfirmacao from './components/ModalConfirmacao';
import { gerarArquivoCSV, baixarCSV } from './services/csvService';
import { enviarRelatorioPorEmail } from './services/emailService';
import { calcularStatus, STATUS } from './utils/statusCalibracao';
import { obterDataHoraAtualFormatada } from './utils/formatarData';
import './App.css';

// Contador simples para gerar um "id" único por lançamento, sem
// precisar de biblioteca. Fica fora do componente para não ser
// reiniciado a cada nova renderização.
let proximoId = 1;

function App() {
  // registros: a lista de instrumentos lançados NA SESSÃO ATUAL.
  // É só um array em memória — não é salvo em nenhum lugar. Se a
  // página for recarregada, a lista some (é assim mesmo, de propósito).
  const [registros, setRegistros] = useState([]);

  // Nome de quem está lançando os instrumentos. Pedido uma única vez
  // por sessão — também some se a página recarregar, igual aos registros.
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [nomeTemporario, setNomeTemporario] = useState('');

  const [mensagemSucesso, setMensagemSucesso] = useState('');
  const [avisoSemRegistros, setAvisoSemRegistros] = useState(false);

  const [modalAberto, setModalAberto] = useState(false);
  // 'idle' | 'enviando' | 'sucesso' | 'erro'
  const [statusEnvio, setStatusEnvio] = useState('idle');
  const [arquivoGerado, setArquivoGerado] = useState(null);

  // Confirma o nome digitado na tela de identificação e libera o
  // restante do app. Só avança se o campo não estiver vazio.
  function confirmarNome(evento) {
    evento.preventDefault();
    const nomeLimpo = nomeTemporario.trim();
    if (nomeLimpo) {
      setNomeUsuario(nomeLimpo);
    }
  }

  // Chamada pelo FormularioLancamento quando um lançamento é válido.
  function adicionarRegistro(dados) {
    const novoRegistro = { id: proximoId++, nome: nomeUsuario, ...dados };
    setRegistros((anteriores) => [...anteriores, novoRegistro]);

    setMensagemSucesso(
      `Instrumento lançado com sucesso! Total de instrumentos lançados: ${registros.length + 1}`
    );
    setTimeout(() => setMensagemSucesso(''), 3500);
  }

  // Chamada pela ListaLancamentos quando o usuário clica em "Remover".
  function removerRegistro(id) {
    setRegistros((anteriores) => anteriores.filter((registro) => registro.id !== id));
  }

  // Conta quantos registros estão em cada status, para exibir no
  // resumo e enviar no corpo do e-mail.
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

  // Gera o CSV e envia por e-mail. É chamada tanto no primeiro clique
  // em "Finalizar relatório" quanto no botão "Tentar novamente".
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

  // Só limpa os registros quando o usuário confirma que quer
  // começar um novo relatório — nunca automaticamente em caso de erro.
  function iniciarNovoRelatorio() {
    setRegistros([]);
    setModalAberto(false);
    setStatusEnvio('idle');
    setArquivoGerado(null);
  }

  function fecharModal() {
    if (statusEnvio === 'enviando') return; // evita fechar durante o envio
    setModalAberto(false);
  }

  return (
    <div className="pagina">
      <Header totalLancamentos={registros.length} />

      <main className="conteudo">
        {!nomeUsuario ? (
          <form className="formulario formulario-identificacao" onSubmit={confirmarNome}>
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
                Nenhum instrumento foi lançado. Realize pelo menos um lançamento antes de
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