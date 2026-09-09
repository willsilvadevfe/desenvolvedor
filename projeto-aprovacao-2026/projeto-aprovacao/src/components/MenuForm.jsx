import "./MenuForm.css";

// Dados de exemplo — depois substitua por: const [registros, setRegistros] = useState([])
// e preencha via supabase.from('formularios').select('*')
const registros = [
  {
    id: 1,
    tipo: "V",
    partnumber: 6131,
    linha: "Linha 01",
    equipamento: "15PC",
    registro: 9960024,
  },
  {
    id: 2,
    tipo: "VS",
    partnumber: 4820,
    linha: "Linha 07",
    equipamento: "Borazon",
    registro: 9960031,
  },
  {
    id: 3,
    tipo: "XV",
    partnumber: 7302,
    linha: "AFTM (1)",
    equipamento: "CNC (1)",
    registro: 9960045,
  },
];

const MenuForm = () => {
  return (
    <div className="menu-form">
      <header className="menu-form__header">
        <div className="header-title">
          <h1>Sistema de Aprovação de Setup</h1>
          <small>Painel para gerenciamento de Setups — Auditor de Qualidade</small>
        </div>
        <button className="icon-btn" type="button" aria-label="Configurações">
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
                  <th className="col-acoes">Ações</th>
                </tr>
              </thead>
              <tbody>
                {registros.map((item) => (
                  <tr key={item.id}>
                    <td className="mono">{item.id}</td>
                    <td>
                      <span className="badge-tipo">{item.tipo}</span>
                    </td>
                    <td className="mono">{item.partnumber}</td>
                    <td>{item.linha}</td>
                    <td>{item.equipamento}</td>
                    <td className="mono">{item.registro}</td>
                    <td className="col-acoes">
                      <div className="acoes">
                        {/* TODO: trocar por navegação real (react-router) quando a página de aprovação existir */}
                        <button className="btn btn-aprovar" type="button">
                          <svg viewBox="0 -960 960 960" width="16" height="16">
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
                          <svg viewBox="0 -960 960 960" width="16" height="16">
                            <path
                              fill="currentColor"
                              d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
                            />
                          </svg>
                          Rejeitar
                        </label>

                        {/* Modal em CSS puro — controlado pelo checkbox escondido abaixo, sem JS */}
                        <input
                          type="checkbox"
                          id={`modal-rejeitar-${item.id}`}
                          className="modal-toggle"
                        />
                        <div className="modal-overlay">
                          <div className="modal" role="dialog" aria-modal="true">
                            <h2>Rejeitar solicitação #{item.id}</h2>
                            <p>
                              Informe o motivo da rejeição do setup{" "}
                              <strong>
                                {item.tipo} · PN {item.partnumber}
                              </strong>
                              .
                            </p>

                            <label htmlFor={`motivo-${item.id}`} className="modal-label">
                              Motivo
                            </label>
                            <textarea
                              id={`motivo-${item.id}`}
                              name={`motivo-${item.id}`}
                              rows={3}
                              placeholder="Descreva o motivo da rejeição..."
                            />

                            <div className="modal-actions">
                              <label
                                htmlFor={`modal-rejeitar-${item.id}`}
                                className="btn btn-ghost"
                              >
                                Cancelar
                              </label>
                              {/* TODO: implementar envio/gravação do motivo e delete no Supabase */}
                              <button type="button" className="btn btn-confirmar-rejeicao">
                                Confirmar rejeição
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {registros.length === 0 && (
              <p className="tabela-vazia">Nenhuma solicitação pendente no momento.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MenuForm;