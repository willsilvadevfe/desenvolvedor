import './Header.css';

function Header({ totalLancamentos }) {
  return (
    <header className="cabecalho">
      <div className="cabecalho-conteudo">
        <h1>Controle de Calibração</h1>
        <p className="cabecalho-subtitulo">
          Realize a auditoria, registre as informações e, ao finalizar, gere o relatório em CSV ou envie-o por e-mail.
        </p>
      </div>

      <div className="cabecalho-contador">
        <span className="contador-numero">{totalLancamentos}</span>
        <span className="contador-label">Dispositivos Auditados</span>
      </div>
    </header>
  );
}

export default Header;
