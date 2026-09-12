import { useEffect, useState, useRef } from "react";
import "./MenuForm.css";
import { supabase } from "../supabaseClient";
import { formatarTempoEspera, getStatusEspera } from "../utils/tempoEspera";
import { useTick } from "../hooks/useTick";
import LoginUser from "./LoginUser";
import { useNavigate } from "react-router-dom";
import { normalizarId } from "../utils/normalizar";
import Swal from "sweetalert2";

const CORES_STATUS = {
  verde: "#28a745",
  amarela: "#ffc107",
  vermelha: "#dc3545",
};

const MenuForm = () => {
  const navigate = useNavigate();

  const [registros, setRegistros] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [motivos, setMotivos] = useState({});
  const [enviando, setEnviando] = useState({});

  const checkboxRefs = useRef({});

  useTick(15000); // re-renderiza a cada 15s pra atualizar bolinha/tempo

  function handleAprovar(item) {
    navigate(`/aprovacao/${normalizarId(item.equipamento)}`, {
      state: { item },
    });
  }

  useEffect(() => {
    async function buscarRegistros() {
      setCarregando(true);
      setErro(null);

      const { data, error } = await supabase
        .from("formularios")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        console.error(error);
        setErro(
          "Não foi possível carregar as solicitações. Verifique sua conexão.",
        );
      } else {
        setRegistros(data);
      }

      setCarregando(false);
    }

    buscarRegistros();
  }, []);

  async function handleRejeitar(item) {
    const motivo = (motivos[item.id] || "").trim();

    if (!motivo) {
      Swal.fire({
        title: "Erro ao rejeitar!",
        html: "<p>Preencha o <strong>motivo da rejeição</strong>, campo obrigatório.</p>",
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

    setEnviando((prev) => ({ ...prev, [item.id]: true }));

    try {
      // 1. grava no banco local (sqlite via Electron)
      await window.api.criarRejeicao({
        tipo: item.tipo,
        partnumber: item.partnumber,
        linha: item.linha,
        equipamento: item.equipamento,
        registro: item.ecnumber,
        motivo,
      });

      // 2. remove do Supabase
      const { error } = await supabase
        .from("formularios")
        .delete()
        .eq("id", item.id);

      if (error) throw error;

      // 3. atualiza a lista local (some da tabela sem precisar recarregar)
      setRegistros((prev) => prev.filter((r) => r.id !== item.id));

      // 4. limpa o motivo guardado e fecha o modal
      setMotivos((prev) => {
        const novo = { ...prev };
        delete novo[item.id];
        return novo;
      });

      if (checkboxRefs.current[item.id]) {
        checkboxRefs.current[item.id].checked = false;
      }
    } catch (err) {
      console.error("Erro ao rejeitar solicitação:", err);
      alert("Não foi possível concluir a rejeição. Tente novamente.");
    } finally {
      setEnviando((prev) => ({ ...prev, [item.id]: false }));
    }
  }

  return (
    <div className="menu-form">
      <header className="menu-form__header">
        <div className="header-title">
          <h1>Sistema de Aprovação de Setup</h1>
          <small>
            Painel para gerenciamento de Setups — Auditor de Qualidade
          </small>
        </div>
        <button
          className="icon-btn"
          type="button"
          aria-label="Configurações"
          onClick={() => navigate("/LoginUser")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="26px"
            viewBox="0 -960 960 960"
            width="26px"
          >
            <path
              fill="currentColor"
              d="m388-80-20-126q-19-7-40-19t-37-25l-118 54-93-164 108-79q-2-9-2.5-20.5T185-480q0-9 .5-20.5T188-521L80-600l93-164 118 54q16-13 37-25t40-18l20-127h184l20 126q19 7 40.5 18.5T669-710l118-54 93 164-108 77q2 10 2.5 21.5t.5 21.5q0 10-.5 21t-2.5 21l108 78-93 164-118-54q-16 13-36.5 25.5T592-206L572-80H388Zm48-60h88l14-112q33-8 62.5-25t53.5-41l106 46 40-72-94-69q4-17 6.5-33.5T715-480q0-17-2-33.5t-7-33.5l94-69-40-72-106 46q-23-26-52-43.5T538-708l-14-112h-88l-14 112q-34 7-63.5 24T306-642l-106-46-40 72 94 69q-4 17-6.5 33.5T245-480q0 17 2.5 33.5T254-413l-94 69 40 72 106-46q24 24 53.5 41t62.5 25l14 112Zm44-210q54 0 92-38t38-92q0-54-38-92t-92-38q-54 0-92 38t-38 92q0 54 38 92t92 38Zm0-130Z"
            />
          </svg>
        </button>
      </header>

      <main className="menu-form__main">
        <div className="table-form-supabase">
          {carregando && (
            <p className="tabela-status">Carregando solicitações...</p>
          )}

          {!carregando && erro && (
            <p className="tabela-status tabela-status--erro">{erro}</p>
          )}

          {!carregando && !erro && (
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Tipo</th>
                    <th>PartNumber</th>
                    <th>Linha</th>
                    <th>Equipamento</th>
                    <th>Registro</th>
                    <th>Aguardando</th>
                    <th className="col-acoes">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {registros.map((item, index) => {
                    const status = getStatusEspera(item.created_at);
                    return (
                      <tr key={item.id}>
                        <td className="mono">{index + 1}</td>
                        <td>
                          <span className="badge-tipo">{item.tipo}</span>
                        </td>
                        <td className="mono">{item.partnumber}</td>
                        <td>{item.linha}</td>
                        <td>{item.equipamento}</td>
                        <td className="mono">{item.ecnumber}</td>
                        <td>
                          <div className="status-espera">
                            <span
                              className="bolinha-status"
                              style={{
                                display: "inline-block",
                                width: 10,
                                height: 10,
                                borderRadius: "50%",
                                backgroundColor: CORES_STATUS[status],
                                marginRight: 6,
                              }}
                              title={new Date(item.created_at).toLocaleString(
                                "pt-BR",
                              )}
                            />
                            {formatarTempoEspera(item.created_at)}
                          </div>
                        </td>
                        <td className="col-acoes">
                          <div className="acoes">
                            {/* TODO: trocar por navegação real (react-router) quando a página de aprovação existir */}
                            <button
                              className="btn btn-aprovar"
                              type="button"
                              onClick={() => handleAprovar(item)}
                            >
                              <svg
                                viewBox="0 -960 960 960"
                                width="16"
                                height="16"
                              >
                                <path
                                  fill="currentColor"
                                  d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"
                                />
                              </svg>
                              Aprovar
                            </button>

                            <label
                              className="btn btn-rejeitar"
                              htmlFor={`modal-rejeitar-${item.id}`}
                            >
                              <svg
                                viewBox="0 -960 960 960"
                                width="16"
                                height="16"
                              >
                                <path
                                  fill="currentColor"
                                  d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
                                />
                              </svg>
                              Rejeitar
                            </label>

                            <input
                              type="checkbox"
                              id={`modal-rejeitar-${item.id}`}
                              className="modal-toggle"
                              ref={(el) => (checkboxRefs.current[item.id] = el)}
                            />
                            <div className="modal-overlay">
                              <div
                                className="modal"
                                role="dialog"
                                aria-modal="true"
                              >
                                <h2>Rejeitar solicitação</h2>
                                <p>
                                  Informe o motivo da rejeição do setup{" "}
                                  <strong>
                                    {item.tipo}
                                    {item.partnumber}
                                  </strong>
                                  .
                                </p>

                                <label
                                  htmlFor={`motivo-${item.id}`}
                                  className="modal-label"
                                >
                                  Motivo
                                </label>
                                <textarea
                                  id={`motivo-${item.id}`}
                                  name={`motivo-${item.id}`}
                                  rows={3}
                                  placeholder="Descreva o motivo da rejeição..."
                                  value={motivos[item.id] || ""}
                                  onChange={(e) =>
                                    setMotivos((prev) => ({
                                      ...prev,
                                      [item.id]: e.target.value,
                                    }))
                                  }
                                />

                                <div className="modal-actions">
                                  <label
                                    htmlFor={`modal-rejeitar-${item.id}`}
                                    className="btn btn-ghost"
                                  >
                                    Cancelar
                                  </label>
                                  <button
                                    type="button"
                                    className="btn btn-confirmar-rejeicao"
                                    onClick={() => handleRejeitar(item)}
                                    disabled={enviando[item.id]}
                                  >
                                    {enviando[item.id]
                                      ? "Enviando..."
                                      : "Confirmar rejeição"}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {registros.length === 0 && (
                <p className="tabela-vazia">
                  Nenhuma solicitação pendente no momento.
                </p>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MenuForm;
