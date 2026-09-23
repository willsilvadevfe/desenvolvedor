import { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { caracteristicasEquipamento } from "../configs/CaracteristicaEquipamento";
import { supabase } from "../supabaseClient";
import "./FichaAprovacao.css";

function valoresIniciais(campos) {
  return Object.fromEntries(campos.map((c) => [c.id, ""]));
}

const FichaAprovacao = () => {
  const { equipamentoId } = useParams();

  const { state } = useLocation();
  const item = state?.item; // dados da solicitação vindos do MenuForm (Supabase)

  const config = caracteristicasEquipamento[equipamentoId];

  if (!config) {
    return <p>Equipamento "{equipamentoId}" não encontrado na configuração.</p>;
  }

  if (!item) {
    return (
      <p>Nenhuma solicitação selecionada. Volte ao menu e escolha novamente.</p>
    );
  }

  const [valores, setValores] = useState(() => valoresIniciais(config.campos));
  const [observacao, setObservacao] = useState("");
  const [auditorNome, setAuditorNome] = useState("");

  function atualizarCampo(id, valor) {
    setValores((prev) => ({ ...prev, [id]: valor }));
  }

  function validarObrigatorios() {
    return config.campos
      .filter((c) => c.obrigatorio)
      .every((c) => valores[c.id]?.trim());
  }

  async function handleAprovar() {
    if (!validarObrigatorios()) {
      Swal.fire({
        title: "Atenção!",
        html: "<p>Preencha todos os campos obrigatórios antes de aprovar.</p>",
        icon: "warning",
        iconColor: "#f36d00",

        confirmButtonText: "Tentar novamente",
        confirmButtonColor: "#2563eb",

        customClass: {
          popup: "swal-popup",
          title: "swal-title",
          htmlContainer: "swal-text",
          confirmButton: "swal-confirm-button",
        },

        buttonsStyling: true,
      });
      return;
    }

    const listaHtml = config.campos
      .map(
        (campo) =>
          `<p><strong>${campo.label}:</strong> ${valores[campo.id] || "-"}</p>`,
      )
      .join("");

    const revisao = await Swal.fire({
      title: "Verifique as informações da aprovação",
      html: `<div style="text-align:left">${listaHtml}<p><strong>Observação:</strong> ${observacao || "-"}</p></div>`,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Aprovar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#dc2626",
      customClass: {
        popup: "swal-popup",
        title: "swal-title",
        htmlContainer: "swal-text",
        cancelButton: "swal-cancel-button",
      },
    });

    if (!revisao.isConfirmed) {
      return; // usuário clicou Cancelar
    }

    // --- Swal 2: login e senha ---
    const login = await Swal.fire({
      title: "Confirme sua identidade",
      html: `
      <input id="swal-registro" class="swal2-input" placeholder="ID">
      <input id="swal-senha" type="password" class="swal2-input" placeholder="Senha">
    `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#dc2626",
      customClass: {
        popup: "swal-popup",
        title: "swal-title",
        htmlContainer: "swal-text",
        cancelButton: "swal-cancel-button",
      },
      preConfirm: () => {
        const registro = document.getElementById("swal-registro").value.trim();
        const senha = document.getElementById("swal-senha").value.trim();
        if (!registro || !senha) {
          Swal.showValidationMessage(
            "Preencha as informações - Registro (ID) e Senha",
          );
          return false;
        }
        return { registro, senha };
      },
    });

    if (!login.isConfirmed) {
      return; // cancelou o login
    }

    const { registro, senha } = login.value;
    const usuario = await window.api.verificarLogin(registro, senha);

    if (!usuario) {
      Swal.fire({
        title: "Atenção!",
        html: "<p><strong>Registro (ID)</strong> ou <strong>Senha</strong> estão incorretos!</p>",
        icon: "error",
        iconColor: "#f50808",
        confirmButtonText: "Tentar novamente",
        confirmButtonColor: "#2563eb",
        customClass: {
          popup: "swal-popup",
          title: "swal-title",
          htmlContainer: "swal-text",
          confirmButton: "swal-confirm-button",
        },
      });
      return;
    }

    // login válido: guarda o nome vindo do banco
    setAuditorNome(usuario.nome);

    const { pdfBase64, imagemBase64 } = await gerarPdfBase64();

    const nomeArquivo = `${config.operacao}_${item.tipo}${item.partnumber}_${Date.now()}.pdf`;

    const resultado = await window.api.salvarPdfAprovacao({
      nomeArquivo,
      pdfBase64,
      imagemBase64, 
    });

    if (resultado?.sucesso) {
      try {
        await window.api.criarAprovacao({
          operacao: config.operacao,
          valvula: `${item.tipo}${item.partnumber}`,
          linha: item.linha,
          data: new Date().toLocaleDateString("pt-BR"),
          hora: new Date().toLocaleTimeString("pt-BR").slice(0, 5),
          auditor: usuario.nome,
        });

        await supabase.from("formularios").delete().eq("id", item.id);
      } catch (err) {
        console.error("Erro ao registrar aprovação/apagar do Supabase:", err);
      }

      Swal.fire({
        title: "Aprovado com sucesso.",
        html: "<p>Aprovação realizada com sucesso. ✅</p><p>PDF gerado e armazenado com sucesso. ✅</p><p>Aprovação registrada no banco de dados. ✅",
        icon: "success",
        iconColor: "#0f8300",
        confirmButtonText: "OK",
        confirmButtonColor: "#2563eb",
        customClass: {
          popup: "swal-popup",
          title: "swal-title",
          htmlContainer: "swal-text",
          confirmButton: "swal-confirm-button",
        },
      });
    } else {
      Swal.fire({
        title: "Erro.",
        html: "<p>Não foi possivel salvar o PDF.",
        icon: "error",
        iconColor: "#f70303",
        confirmButtonText: "Tentar novamente",
        confirmButtonColor: "#2563eb",
        customClass: {
          popup: "swal-popup",
          title: "swal-title",
          htmlContainer: "swal-text",
          confirmButton: "swal-confirm-button",
        },
      });
    }
  }

  async function gerarPdfBase64() {
    const elemento = document.getElementById("area-impressao");

    const canvas = await html2canvas(elemento, {
      scale: 2,
      useCORS: true,
    });

    const imagemBase64 = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    const margemMM = 10;
    const larguraPagina = pdf.internal.pageSize.getWidth();
    const alturaPagina = pdf.internal.pageSize.getHeight();
    const larguraUtil = larguraPagina - margemMM * 2;
    const alturaUtil = alturaPagina - margemMM * 2;
    const alturaImagem = (canvas.height * larguraUtil) / canvas.width;

    pdf.addImage(
      imagemBase64,
      "PNG",
      margemMM,
      margemMM,
      larguraUtil,
      Math.min(alturaImagem, alturaUtil),
    );

    return { pdfBase64: pdf.output("datauristring"), imagemBase64 };
  }

  return (
    <div className="ficha-aprovacao">
      <div className="form">
        <a className="exit-icon" href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="48px"
            viewBox="0 -960 960 960"
            width="48px"
            fill="#000000"
          >
            <path d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h299v60H180v600h299v60H180Zm486-185-43-43 102-102H360v-60h363L621-612l43-43 176 176-174 174Z" />
          </svg>
        </a>
        <h2>Formulário para aprovação</h2>
        <small>{config.titulo}</small>

        <div className="input-form">
          <div className="linha-principal">
            {config.campos.map((campo) => (
              <label key={campo.id} htmlFor={campo.id}>
                {campo.tipo === "select" ? (
                  <select
                    id={campo.id}
                    value={valores[campo.id]}
                    onChange={(e) => atualizarCampo(campo.id, e.target.value)}
                    required={campo.obrigatorio}
                  >
                    <option value="">Selecione...</option>
                    {campo.opcoes.map((op) => (
                      <option key={op} value={op}>
                        {op}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    id={campo.id}
                    placeholder={campo.placeholder}
                    value={valores[campo.id]}
                    onChange={(e) => atualizarCampo(campo.id, e.target.value)}
                    required={campo.obrigatorio}
                  />
                )}
                {campo.label}
              </label>
            ))}
          </div>

          <div className="linha-inferior">
            <label htmlFor="observacao" className="campo-observacao">
              Observação
              <textarea
                id="observacao"
                placeholder="Adicione aqui uma observação caso necessário."
                value={observacao}
                onChange={(e) => setObservacao(e.target.value)}
              />
            </label>

            <div className="form-actions">
              <input type="submit" value="Enviar" onClick={handleAprovar} />
            </div>
          </div>
        </div>
      </div>

      {/* área que vira o PDF */}
      <div className="parent" id="area-impressao">
        <div className="div1">
          <div className="linha-setup">
            <span>Operação</span>
          </div>
          <div className="linha-setup">
            <p>{config.operacao}</p>
          </div>

          <div className="linha-setup">
            <span>Válvula</span>
          </div>
          <div className="linha-setup">
            <p>
              {item.tipo}
              {item.partnumber}
            </p>
          </div>

          <div className="linha-setup">
            <span>Linha</span>
          </div>
          <div className="linha-setup">
            <p>{item.linha}</p>
          </div>

          <div className="linha-setup">
            <span>Data</span>
          </div>
          <div className="linha-setup">
            <p>{new Date().toLocaleDateString("pt-BR")}</p>
          </div>

          <div className="linha-setup">
            <span>Hora</span>
          </div>
          <div className="linha-setup">
            <p>{new Date().toLocaleTimeString("pt-BR").slice(0, 5)}</p>
          </div>

          <div className="linha-setup">
            <span>Auditor</span>
          </div>
          <div className="linha-setup">
            <p>{auditorNome}</p>
          </div>

          <div className="linha-setup">
            <span>DOC. REF. FIP</span>
          </div>
          <div className="linha-setup">
            <p>{config.docRef}</p>
          </div>
        </div>
        <div className="div2">
          <img
            src={config.imagem}
            alt={config.imagemAlt || `Desenho técnico - ${config.operacao}`}
          />
        </div>

        <div className="div3">
          {config.campos.map((campo, index) => (
            <div className="valores-aprovados" key={campo.id}>
              <span className="caracter-number">{index + 1}</span>
              <span>{campo.label}:</span>
              <p>{valores[campo.id]}</p>
            </div>
          ))}
          <div className="visual">
            <p>Visual: OK</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#000"
            >
              <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
            </svg>
            <p>NOK</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#000"
            >
              <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
            </svg>
          </div>
        </div>

        <div className="div4">
          <span>Observações:</span>
          <p>{observacao}</p>
        </div>
      </div>
    </div>
  );
};

export default FichaAprovacao;
