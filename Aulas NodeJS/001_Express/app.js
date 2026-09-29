const express = require("express");
const app = express();

try {
  app.listen(8081, () => {
    console.log("Servidor conectado com sucesso...");
  });
} catch (erro) {
  console.log("Erro de conexão com o servidor..." + erro);
}

app.get("/", (req, res) => {
  res.send("Rota principal funcionando com sucesso...");
});

app.get("/module", (req, res) => {
  res.send("Rota modula funcionando com sucesso...");
});
