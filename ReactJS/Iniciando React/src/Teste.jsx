import "./App.css";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/Vite.js.svg";
import BtnApp from "./button.jsx";

function Teste() {
  return (
    <>
      <div>
        <h1>Minha primeira página em ReactJS</h1>
        <p>Testes de importação de imagens e botões (import)</p>
        <p>Aplicando imagens SVG techicons.dev</p>
        <a href="https://react.dev" target="_blank">
          <img className="img-svg" src={reactLogo} alt="logo react" />
        </a>
        <a href="https://vite.dev" target="_blank">
          <img className="img-svg" src={viteLogo} alt="logo react" />
        </a>
        <h3></h3>
        <BtnApp />
      </div>
    </>
  );
}

export default Teste;
