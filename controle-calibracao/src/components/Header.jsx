import './Header.css';

function Header({ totalLancamentos }) {
  return (
    <header className="cabecalho">
      <div className="cabecalho-conteudo">
        <h1>Controle de Calibração</h1>
        <p className="cabecalho-subtitulo">
          Realize os lançamentos dos instrumentos e finalize o relatório ao terminar.
        </p>
      </div>

      <div className="cabecalho-contador">
        <span className="contador-numero">{totalLancamentos}</span>
        <span className="contador-label">lançamentos realizados</span>
      </div>
    </header>
  );
}

export default Header;
