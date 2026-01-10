import "./App.css";
import City2 from "./assets/paisagem2.jpg";
import ListRender from "./components/ListRender";
import ManageData from "./components/ManageData";

function App() {
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
    </div>
  );
}

export default App;
