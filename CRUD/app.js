const routers = require("./api");
const express = require("express");
const app = express();

app.use(express.json());
app.use("/", routers);

try {
  app.listen(3000, () => {
    console.log("Servidor rodando com sucesso...");
  });
} catch (error) {
  console.log("Erro de conexão com o servidor...");
}
