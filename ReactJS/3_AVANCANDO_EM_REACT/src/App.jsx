import { useState } from "react";
import "./App.css";
import City2 from "./assets/paisagem2.jpg";
import ConditionalRender from "./components/ConditionalRender";
import ListRender from "./components/ListRender";
import ManageData from "./components/ManageData";
import ShowUserName from "./components/ShowUserName";
import ButtonOne from "./components/ButtonOne";
import ButtonTwo from "./components/ButtonTwo";

function App() {
  const [userName] = useState("Wilhão");

  return (
    <div>
      <div>
        {/* Public */}
        <h1>Imagem através do public</h1>
        <p>Não há necessidade de importação, src="/paisagem.jpg".</p>
        <img src="/paisagem.jpg" alt="paisagem" />
      </div>
      <div>
        {/* Importação */}
        <h1>Imagens atráves de assets</h1>
        <p>
          Precisa fazer o <strong>import</strong> do arquivo.
        </p>
        <img src={City2} alt="Paisagem-2" />
      </div>
      <ManageData />
      <ListRender />
      <ConditionalRender />
      <ShowUserName name={userName} />
      <ButtonOne name="First button with props" />
      <ButtonTwo name="Second button with props"/>
    </div>
  );
}

export default App;
