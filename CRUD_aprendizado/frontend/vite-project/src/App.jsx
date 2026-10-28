
import { useState } from "react";

function App() {
  const [item, setItem] = useState("");
  const [preco, setPreco] = useState("");
  const [descricao, setDescricao] = useState("");

  async function cadastrarProduto(e) {
    e.preventDefault();

    const resposta = await fetch("http://localhost:3000/produtos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        item,
        preco,
        descricao,
      }),
    });

    if (resposta.ok) {
      alert("Produto cadastrado com sucesso!");

      setItem("");
      setPreco("");
      setDescricao("");
    } else {
      alert("Erro ao cadastrar produto.");
    }
  }

  return (
    <div>
      <h1>Cadastro de Produtos</h1>

      <form onSubmit={cadastrarProduto}>
        <div>
          <label>Item</label>
          <input
            type="text"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Preço</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Descrição</label>
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default App;
