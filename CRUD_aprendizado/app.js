const express = require("express");
const app = express();
const router = express.Router();
const PORT = 3000;
const indexRouter = require("./config");

app.use(express.json());
app.use("/", indexRouter);

try {
  app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso na porta: ${PORT}`);
  });
} catch (erro) {
  console.log("Erro de conexão com o servidor..." + erro);
}
