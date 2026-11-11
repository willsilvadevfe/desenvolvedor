import { useState } from "react";
import Swal from "sweetalert2";
import Header from "./components/Header";
import {
  FaGithub,
  FaLockOpen,
  FaUser,
  FaIndustry,
  FaChevronDown,
  FaCheck,
  FaWhatsapp,
  FaShieldAlt,
  FaCog,
} from "react-icons/fa";
import FormularioLancamento from "./components/FormularioLancamento";
import ListaLancamentos from "./components/ListaLancamentos";
import ModalConfirmacao from "./components/ModalConfirmacao";
import { gerarArquivoCSV, baixarCSV } from "./services/csvService";
import { enviarRelatorioPorEmail } from "./services/emailService";
import { calcularStatus, STATUS } from "./utils/statusCalibracao";
import { LINHAS, DESTINATARIOS } from "./data/opcoes";

import "./App.css";

const WHATSAPP_NUMERO = "5512991199357";
const WHATSAPP_MENSAGEM =
  "Olá! Preciso de ajuda com o sistema de Controle de Calibração.";
const LINK_WHATSAPP = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(
  WHATSAPP_MENSAGEM,
)}`;

let proximoId = 1;

function App() {
  const [registros, setRegistros] = useState([]);

  // Nome e Linha: pedidos uma única vez por sessão, igual como já
  // funcionava com o nome. Ambos somem se a página recarregar.
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [nomeTemporario, setNomeTemporario] = useState("");
  const [linhaSelecionada, setLinhaSelecionada] = useState("");
  const [linhaTemporaria, setLinhaTemporaria] = useState("");

  const [mensagemSucesso, setMensagemSucesso] = useState("");
  const [avisoSemRegistros, setAvisoSemRegistros] = useState(false);

  const [modalAberto, setModalAberto] = useState(false);
  const [statusEnvio, setStatusEnvio] = useState("idle");
  const [arquivoGerado, setArquivoGerado] = useState(null);

  // E-mail que receberá o CSV. Escolhido num select dentro do modal,
  // entre os endereços cadastrados em DESTINATARIOS (não é digitado).
  const [destinatario, setDestinatario] = useState("");

  const identificacaoCompleta = Boolean(nomeUsuario && linhaSelecionada);

  // Confirma nome + linha da tela de identificação e libera o
  // restante do app. Só avança se os dois campos estiverem preenchidos.
  function confirmarIdentificacao(evento) {
    evento.preventDefault();

    const nomeLimpo = nomeTemporario.trim();
    if (nomeLimpo && linhaTemporaria) {
      setNomeUsuario(nomeLimpo);
      setLinhaSelecionada(linhaTemporaria);
    } else if (!nomeUsuario || !linhaSelecionada) {
      Swal.fire({
        icon: "warning",
        title: "Campos obrigatórios",
        html: `
    <p style="margin: 0;">
      Para continuar, informe seu nome e selecione
      uma linha de produção.
    </p>
  `,
        confirmButtonText: "Tentar novamente",
        background: "#0a1a30",
        color: "#e8f1fc",
        backdrop: "rgba(3, 8, 18, 0.80)",
        customClass: {
          popup: "alerta-personalizado",
          title: "alerta-titulo",
          htmlContainer: "alerta-texto",
          confirmButton: "alerta-botao",
        },
      });
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
      `Instrumento lançado com sucesso! Total de instrumentos lançados: ${registros.length + 1}`,
    );
    setTimeout(() => setMensagemSucesso(""), 3500);
  }

  function removerRegistro(id) {
    setRegistros((anteriores) =>
      anteriores.filter((registro) => registro.id !== id),
    );
  }

  function calcularResumo() {
    const totais = {
      total: registros.length,
      validos: 0,
      alerta: 0,
      vencidos: 0,
    };

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
    setStatusEnvio("idle");
    // Zera a escolha para o usuário selecionar o destinatário a cada envio.
    setDestinatario("");
    setModalAberto(true);
  }

  async function confirmarFinalizacao() {
    // Sem destinatário escolhido, não envia (o botão do modal também
    // fica desabilitado, esta é só uma segunda proteção).
    if (!destinatario) return;

    setStatusEnvio("enviando");

    const { blob, nomeArquivo } = gerarArquivoCSV(registros);
    setArquivoGerado({ blob, nomeArquivo });

    try {
      await enviarRelatorioPorEmail({
        csvBlob: blob,
        nomeArquivo,
        destinatario,
      });
      setStatusEnvio("sucesso");
    } catch (erro) {
      console.error("Erro ao enviar relatório por e-mail:", erro);
      setStatusEnvio("erro");
    }
  }

  async function baixarArquivoGerado() {
    if (arquivoGerado) {
      await baixarCSV(arquivoGerado.blob, arquivoGerado.nomeArquivo);
    }
  }

  function iniciarNovoRelatorio() {
    setRegistros([]);
    setModalAberto(false);
    setStatusEnvio("idle");
    setArquivoGerado(null);
    setDestinatario("");
    location.reload(); // Reinicia a página para limpar nome e linha, como na primeira abertura.
  }

  function fecharModal() {
    if (statusEnvio === "enviando") return;
    setModalAberto(false);
    location.reload(); // Reinicia a página para limpar nome e linha, como na primeira abertura.
  }

  return (
    <div className="pagina">
      <Header totalLancamentos={registros.length} />

      <main className="conteudo">
        {!identificacaoCompleta ? (
          <div className="identificacao">
            {/* Marca d'água decorativa (esquerda) */}
            <div
              className="identificacao-lateral identificacao-marca"
              aria-hidden="true"
            >
              <FaCog />
            </div>

            <form
              className="formulario formulario-identificacao"
              onSubmit={confirmarIdentificacao}
            >
              <div className="identificacao-topo">
                <FaLockOpen aria-hidden="true" />
                <h2>Abertura de Auditoria</h2>
              </div>

              <div className="identificacao-corpo">
                <p className="identificacao-intro">
                  Preencha seus dados para iniciar a verificação dos
                  dispositivos da linha selecionada.
                </p>

                <div className="campo">
                  <label htmlFor="nomeUsuario">Seu nome</label>
                  <div className="campo-icone">
                    <FaUser
                      className="campo-icone-esquerda"
                      aria-hidden="true"
                    />
                    <input
                      id="nomeUsuario"
                      type="text"
                      value={nomeTemporario}
                      onChange={(e) => setNomeTemporario(e.target.value)}
                      placeholder="Digite seu nome..."
                      autoComplete="name"
                      autoFocus
                    />
                  </div>
                </div>

                <div className="campo">
                  <label htmlFor="linhaSelecionada">Linha</label>
                  <div className="campo-icone">
                    <FaIndustry
                      className="campo-icone-esquerda"
                      aria-hidden="true"
                    />
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
                    <FaChevronDown
                      className="campo-icone-direita"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                <button type="submit" className="botao botao-lancar">
                  <FaCheck aria-hidden="true" />
                  Continuar
                </button>

                <a
                  className="botao-ajuda"
                  href={LINK_WHATSAPP}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaWhatsapp aria-hidden="true" />
                  Precisa de ajuda?
                </a>

                <p className="identificacao-nota">
                  <FaShieldAlt aria-hidden="true" />
                  Informações ficam salvas apenas nesta sessão.
                </p>
              </div>
            </form>

            {/* Frase de apoio (direita) */}
            <aside className="identificacao-lateral identificacao-slogan">
              <p>
                Precisão que gera <strong>confiança.</strong>
              </p>
            </aside>
          </div>
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
                Nenhum relógio foi lançado. Realize pelo menos um lançamento
                antes de finalizar o relatório.
              </div>
            )}

            <ListaLancamentos
              registros={registros}
              onRemover={removerRegistro}
            />

            <div className="acoes-finalizar">
              <button
                type="button"
                className="botao botao-finalizar"
                onClick={abrirFinalizacao}
              >
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
          destinatarios={DESTINATARIOS}
          destinatario={destinatario}
          onSelecionarDestinatario={setDestinatario}
          onCancelar={fecharModal}
          onConfirmar={confirmarFinalizacao}
          onBaixarCSV={baixarArquivoGerado}
          onNovoRelatorio={iniciarNovoRelatorio}
        />
      )}

      <div className="footer-dev">
        <a
          href="https://github.com/willsilvadevfe"
          target="_blank"
          rel="noreferrer"
        >
          <p>
            Desenvolvido por <FaGithub size={22} />
            /willsilvadevfe
          </p>
          <span>Desenvolvedor Full Stack</span>
        </a>
      </div>
    </div>
  );
}

export default App;
