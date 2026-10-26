const express = require("express");
const app = express();
const PORT = 3000;
const router = express.Router();
const indexRouter = require("./config");

app.use(express.json());
app.use("/", indexRouter);

try {
  app.listen(PORT, () => {
    console.log(`Servidor funcionando na porta ${PORT}`);
  });
} catch (erro) {
  console.log("Erro de conexão com o servidor..." + erro);
}

module.exports = router;
