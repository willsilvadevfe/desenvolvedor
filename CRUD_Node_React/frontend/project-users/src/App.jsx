import { useState } from "react";

import "./App.css";

function App() {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [sexo, setSexo] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const resposta = await fetch("http://localhost:3000/usuarios", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        nome,
        sobrenome,
        data_nascimento: nascimento,
        sexo,
      }),
    });

    if (resposta.ok) {
      alert("Pessoa cadastrada com sucesso.");
      setNome("");
      setSobrenome("");
      setNascimento("");
      setSexo("");
    } else {
      alert("Erro ao cadastrar...");
    }
  }

  return (
    <>
      <h2>Cadastro de pessoas</h2>
      <form onSubmit={handleSubmit}>
        <label>Nome</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />

        <label>Sobrenome</label>
        <input
          type="text"
          value={sobrenome}
          onChange={(e) => setSobrenome(e.target.value)}
          required
        />

        <label>Data de nascimento</label>
        <input
          type="date"
          value={nascimento}
          onChange={(e) => setNascimento(e.target.value)}
          required
        />

        <label>Sexo</label>
        <select
          name="sexo"
          id="sexo"
          value={sexo}
          onChange={(e) => setSexo(e.target.value)}
          required
        >
          <option value="">Selecione...</option>
          <option value="Masculino">Masculino</option>
          <option value="Feminino">Feminino</option>
        </select>

        <button type="submit">Enviar</button>
      </form>
    </>
  );
}

export default App;
