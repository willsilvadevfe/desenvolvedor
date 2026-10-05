import "./AtaPdf.css";
import logoPdc from "../img/logo_pdc.png";

const TOTAL_LINHAS = 16;

function Campo({ label, value, destaque = false }) {
  return (
    <div className={`ata-campo${destaque ? " ata-campo--destaque" : ""}`}>
      <span className="ata-campo__label">{label}</span>
      <span className="ata-campo__valor">{value || "\u00A0"}</span>
    </div>
  );
}

export default function AtaPdf({ form = {}, linhas = TOTAL_LINHAS }) {
  const dataEmissao = new Date().toLocaleDateString("pt-BR");

  return (
    <section className="ata-page">
      {/* Cabeçalho */}
      <header className="ata-header">
        <img className="ata-header__logo" src={logoPdc} alt="PDC" />
        <h1 className="ata-header__titulo">
          <strong>ATA DE REUNIÃO</strong> – Registro de ciência e tratativa de
          não conformidade
        </h1>
      </header>

      {/* Dados vindos do Form.jsx */}
      <div className="ata-info">
        <Campo label="Cliente" value={form.cliente} />
        <Campo label="Part Number" value={form.partNumber} />
        <Campo label="Tipo de falha" value={form.falha} />
        <Campo label="Área detectada" value={form.local} />
        <Campo label="Elaborador" value={form.elaborador} />
        <Campo label="Auditor aprovador" value={form.aprovador} />
      </div>

      {/* Descrição da falha em destaque */}
      <div className="ata-descricao">
        <span className="ata-descricao__label">
          Descrição da falha detectada
        </span>
        <p className="ata-descricao__texto">{form.descricao}</p>
      </div>

      {/* Tabela de assinaturas */}
      <div className="ata-tabela">
        <div className="ata-tabela__head">
          <span>Nome do colaborador</span>
          <span>Nº de registro</span>
          <span>Assinatura</span>
          <span>Data</span>
        </div>
        <div className="ata-tabela__body">
          {Array.from({ length: linhas }).map((_, i) => (
            <div className="ata-tabela__linha" key={i}>
              <span />
              <span />
              <span />
              <span />
            </div>
          ))}
        </div>
      </div>

      {/* Assinaturas finais */}
      <footer className="ata-footer">
        <div className="ata-footer__assinatura">
          <span className="ata-footer__nome">
            {form.elaborador || "\u00A0"}
          </span>
          <span className="ata-footer__linha" />
          <span className="ata-footer__legenda">
            Responsável pela elaboração do alerta de qualidade
          </span>
        </div>
        <div className="ata-footer__assinatura">
          <span className="ata-footer__nome">{form.aprovador || "\u00A0"}</span>
          <span className="ata-footer__linha" />
          <span className="ata-footer__legenda">Auditor aprovador</span>
        </div>
      </footer>
    </section>
  );
}
