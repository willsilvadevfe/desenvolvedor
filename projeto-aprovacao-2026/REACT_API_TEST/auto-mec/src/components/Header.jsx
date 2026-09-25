import { useState } from "react";
import "./Header.css";

function Header() {
  const [menuAberto, setMenuAberto] = useState(false);

  const rolarPara = (id) => {
    const secao = document.getElementById(id);
    if (secao) {
      secao.scrollIntoView({ behavior: "smooth" });
    }
    setMenuAberto(false); // fecha o menu ao clicar (mobile)
  };

  return (
    <header className="cd-header">
      <div className="cd-header-logo">
        <img src="/logo.png" alt="Logo da oficina" />
      </div>

      <button
        className={`cd-hamburguer ${menuAberto ? "aberto" : ""}`}
        onClick={() => setMenuAberto(!menuAberto)}
        aria-label="Abrir menu"
        aria-expanded={menuAberto}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav className={`cd-nav ${menuAberto ? "cd-nav-aberto" : ""}`}>
        <ul>
          <li>
            <button onClick={() => rolarPara("servicos")}>Serviços</button>
          </li>
          <li>
            <button onClick={() => rolarPara("sobre")}>Sobre</button>
          </li>
          <li>
            <button onClick={() => rolarPara("contato")}>Contato</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;