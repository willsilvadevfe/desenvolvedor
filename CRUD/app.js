const express = require("express");
const app = express();
const router = require("./api");

app.use(express.json());

try {
  app.listen(3000, () => {
    console.log("Servidor rodando com sucesso...");
  });
} catch (error) {
  console.log("Erro de conexão com o servidor...");
}
