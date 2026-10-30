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
        nascimento,
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
      <form action={handleSubmit}>
        <label>Nome</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
      </form>
    </>
  );
}

export default App;
