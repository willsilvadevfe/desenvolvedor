const express = require("express");
const app = express();

try {
  app.listen(8081, () => {
    console.log("Servidor funcionando com sucesso...");
  });
} catch (erro) {
  console.log("Erro ao se conectar com o servidor" + erro);
}

app.get("/", (req, res) => {
  res.send("Rota principal funcionando com sucesso.");
});

app.get("/contatos", (req, res) => {
  res.send("Rota de contatos funcionando com sucesso");
});

app.get("/contatos/:id", (req, res) => {
  if (req.params.id == "Willian") {
    res.send("Contato Willian encontrado com sucesso.");
  } else if (req.params.id == "Camila") {
    res.send("Contato Camila encontrado com sucesso.");
  } else {
    res.send("Nenhum contato foi encontrado.");
  }
});
