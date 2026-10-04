import logo from "../img/logo_pdc.png";
import "./AlertaPdf.css";

const AlertaPdf = ({ form, images }) => {
  const dataHoje = new Date().toLocaleDateString("pt-BR");

  return (
    <div className="alerta-pdf">
      {/* Título */}
      <header className="pdf-titulo">
        <img src={logo} alt="Logo" className="pdf-logo" />
        <h1>ALERTA DA QUALIDADE</h1>
        <span className="pdf-data">Emissão: {dataHoje}</span>
      </header>

      {/* Dados do formulário */}
      <section className="pdf-dados">
        <div className="pdf-campo c3">
          <label>Cliente</label>
          <span>{form.cliente}</span>
        </div>
        <div className="pdf-campo c3">
          <label>Part Number</label>
          <span>{form.partNumber}</span>
        </div>
        <div className="pdf-campo c3">
          <label>Tipo de falha</label>
          <span>{form.falha}</span>
        </div>
        <div className="pdf-campo c3">
          <label>Área detectada</label>
          <span>{form.local}</span>
        </div>
        <div className="pdf-campo c6">
          <label>Elaborador</label>
          <span>{form.elaborador}</span>
        </div>
        <div className="pdf-campo c6">
          <label>Auditor aprovador</label>
          <span>{form.aprovador}</span>
        </div>
        <div className="pdf-campo c12">
          <label>Descrição da falha detectada</label>
          <span>{form.descricao}</span>
        </div>
      </section>

      {/* Imagens */}
      <section className="pdf-imagens">
        <figure className="pdf-card aprovada">
          <div className="pdf-card-titulo">PEÇA APROVADA</div>
          <div className="pdf-moldura">
            {images.aprovada && (
              <img src={images.aprovada.url} alt="Peça aprovada" />
            )}
          </div>
          <figcaption>
            Condição de produto em conformidade com a qualidade.
          </figcaption>
        </figure>

        <figure className="pdf-card reprovada">
          <div className="pdf-card-titulo">PEÇA REPROVADA</div>
          <div className="pdf-moldura">
            {images.reprovada && (
              <img src={images.reprovada.url} alt="Peça reprovada" />
            )}
          </div>
          <figcaption>
            Condição de produto não conforme com a qualidade.
          </figcaption>
        </figure>
      </section>

      {/* Descrição de atividades */}
      <footer className="pdf-atividades">
        <h2>Descrição de atividades:</h2>
        <ol>
          <li>
            Realizar as inspeções visuais conforme os critérios de qualidade
            estabelecidos, segregando imediatamente as peças que apresentarem
            qualquer não conformidade.
          </li>
          <li>
            As peças não conformes devem ser devidamente segregadas,
            identificadas e encaminhadas para o local apropriado, conforme os
            procedimentos estabelecidos.
          </li>
          <li>
            Em caso de dúvidas quanto aos critérios dimensionais ou visuais,
            consultar os Auditores ou Técnicos da Qualidade antes de liberar ou
            movimentar as peças.
          </li>
        </ol>
      </footer>
    </div>
  );
};

export default AlertaPdf;
