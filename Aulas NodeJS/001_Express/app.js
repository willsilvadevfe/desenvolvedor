const express = require("express");
const app = express();

try {
  app.listen(8081, () => {
    console.log("Servidor rodando com sucesso...");
  });
} catch (error) {
  console.log("Erro ao conectar o servidor..." + error);
}

app.get("/", (req, res) => {
  res.send("Rota principal funcionando com sucesso...");
});

app.get("/contatos", (req, res) => {
  res.send("Rota de contatos funcionando com sucesso...");
});

app.get("/contatos/:id", (req, res) => {
  if (req.params.id == "1") {
    res.send("Parametro 1 encontrado com sucesso...");
  } else if (req.params.id == "2") {
    res.send("Parametro 2 encontrado com sucesso...");
  } else {
    res.send("Nenhum parametro encontrado, tente novamente...");
  }
});
