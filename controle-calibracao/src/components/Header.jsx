import { FaCog, FaCheck, FaChartBar } from "react-icons/fa";
import "./Header.css";

function Header({ totalLancamentos }) {
  return (
    <header className="cabecalho">
      <div className="cabecalho-marca">
        {/* Ícone de qualidade: engrenagem com check no centro */}
        <div className="cabecalho-icone" aria-hidden="true">
          <FaCog className="icone-engrenagem" />
          <FaCheck className="icone-check" />
        </div>

        <span className="cabecalho-divisor" aria-hidden="true" />

        <div className="cabecalho-conteudo">
          <h1>Auditoria de Calibração</h1>
          <p className="cabecalho-subtitulo">
            Realize a auditoria, registre as informações e, ao finalizar, envie-o por e-mail ou baixe
            o relatório em CSV.
          </p>
        </div>
      </div>

      <div className="cabecalho-contador">
        <span className="contador-selo">
          Contador de dispositivos verificados <FaChartBar className="icone-grafico" />
        </span>
        <span className="contador-numero">{totalLancamentos}</span>
        <span className="contador-label">Dispositivos Auditados</span>
      </div>
    </header>
  );
}

export default Header;