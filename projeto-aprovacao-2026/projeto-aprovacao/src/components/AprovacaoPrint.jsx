import "./AprovacaoPrint.css";
import { useState } from "react";
import Swal from "sweetalert2";

const AprovacaoPrint = () => {
  const [caracteristica, setCaracteristica] = useState("");
  const [comprimento, setComprimento] = useState("");
  const [esquadro, setEsquadro] = useState("");
  const [deformacao, setDeformacao] = useState("");
  const [observacao, setObservacai] = useState("");

  function Aprovar() {
    if (!caracteristica || !comprimento || !esquadro) {
      Swal.fire({
        title: "Atenção!",
        html: `<h3>Preencha todos os campos obrigatórios</h3><br>
              <p>Caracteristica de comprimento,</p>
              <p>Valor de comprimento e</p>
              <p>Esquadro do topo.</p><br>
              <h4>São campos obrigatórios!</h4>
              `,
        icon: "error",
        iconColor: "#ef4444",
        confirmButtonText: "Tentar novamente",
        confirmButtonColor: "#2563eb",

        customClass: {
          popup: "meu-swal",
          title: "meu-swal-title",
          htmlContainer: "meu-swal-text",
        },
      });
    } else {
      alert("Tudo certo!");
    }
  }

  function Rejeitar() {
    alert("Funcionando!");
  }

  return (
    <div>
      <div className="container">
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
        <div className="form">
          
          <h2>Formulário para aprovação</h2>
          <small>FIP021 - Borazon - Corte de comprimento</small>
          <div className="input-form">
            <label htmlFor="caracteristica">
              Caracteristica
              <select
                name="caracteristica"
                id="caracteristica"
                value={caracteristica}
                onChange={(e) => setCaracteristica(e.target.value)}
                required
              >
                <option value="">Selecione...</option>
                <option value="Comprimento face/ponta">
                  Comprimento face/ponta
                </option>
                <option value="Comprimento sede/ponta">
                  Comprimento sede/ponta
                </option>
                <option value="Comprimento enchimento/ponta">
                  Comprimento enchimento/ponta
                </option>
              </select>
            </label>

            <label htmlFor="comprimento">
              Valor do comprimento
              <input
                type="text"
                placeholder="Ex.: -0,03"
                name="comprimento"
                id="comprimento"
                value={comprimento}
                onChange={(e) => setComprimento(e.target.value)}
                required
              />
            </label>

            <label htmlFor="esquadro">
              Esquadro do topo
              <input
                type="text"
                placeholder="Ex.: 0,038"
                name="esquadro"
                id="esquadro"
                value={esquadro}
                onChange={(e) => setEsquadro(e.target.value)}
                required
              />
            </label>
            <label htmlFor="deformacao">
              Deformação do topo
              <input
                type="text"
                placeholder="Ex.: 0,04"
                name="deformacao"
                value={deformacao}
                onChange={(e) => setDeformacao(e.target.value)}
                required
              />
            </label>
            <label htmlFor="observacao">
              <textarea
                name="observacao"
                id="observacao"
                placeholder="Adicione aqui uma observação caso necessário."
                value={observacao}
                onChange={(e) => setObservacao(e.target.value)}
              ></textarea>
            </label>
            <input type="submit" onClick={Aprovar} />
            <button onClick={Rejeitar}>Rejeitar</button>
          </div>
        </div>
        <div class="parent">
          <div class="div1">
            <span>Operação</span>
            <p>Borazon</p>
            <span>Válvula</span>
            <p>V6131</p>
            <span>Linha</span>
            <p>Linha 01</p>
            <span>Data</span>
            <p>26/02/2026</p>
            <span>Hora</span>
            <p>21:32</p>
            <span>Auditor</span>
            <p>Willian Silva</p>
            <span>DOC. REF. FIP</span>
            <p>021</p>
          </div>
          <div class="div2"></div>
          <div class="div3">
            <div className="Aprovalues">
              <span className="caracter-number">1</span>
              <span>{caracteristica}</span>
              <p>{comprimento}</p>
            </div>
            <div className="Aprovalues">
              <span className="caracter-number">2</span>
              <span>Esquadro do topo:</span>
              <p>{esquadro}</p>
            </div>
            <div className="Aprovalues">
              <span className="caracter-number">3</span>
              <span>Deformação do topo:</span>
              <p>{deformacao}</p>
            </div>
            <div className="visual">
              <span>Visual:</span> OK (&nbsp;X&nbsp;) NOK
              (&nbsp;&nbsp;&nbsp;&nbsp;)
            </div>
          </div>
          <div class="div4">
            <span>Observações:</span>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod
              aspernatur error harum velit temporibus at iusto perferendis,
              veritatis sint culpa recusandae illo voluptas rem sequi
              dignissimos est ducimus. Voluptatibus, corrupti!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AprovacaoPrint;
