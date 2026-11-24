import { useState } from "react";
import "./App.css";

function App() {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");

  async function cadastrarUsuarios(e) {
    e.preventDefault();

    const resposta = await fetch("http://localhost:8080/usuarios", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        nome,
        sobrenome,
        email,
      }),
    });

    if (resposta.ok) {
      alert("Usuário cadastrado com sucesso!");
      setNome("");
      setSobrenome("");
      setEmail("");
    } else {
      alert("Erro ao cadastrar usuário.");
    }
  }

  return (
    <>
      <h1>Cadastro de usuários</h1>
      <form onSubmit={cadastrarUsuarios}>
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
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Enviar</button>
      </form>
    </>
  );
}

export default App;
