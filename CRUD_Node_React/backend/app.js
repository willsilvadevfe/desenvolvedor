const express = require("express");
const app = express();
const PORT = 3000;
const indexRouter = require("./routers");

app.use(express.json());
app.use("/", indexRouter);

try {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta: ${PORT}`);
  });
} catch (error) {
  console.log("Erro ao se conectar com o servidor.", error);
}
