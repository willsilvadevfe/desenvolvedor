const express = require("express");
const sequelize = require("./database/database");
const cors = require("cors");
const app = express();
const PORT = 8080;
const indexRouter = require("./index");
const Usuarios = require("./database/users");

app.use(cors());
app.use(express.json());
app.use("/", indexRouter);

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Conexão com o banco estabelecida com sucesso...");

    await sequelize.sync();
    console.log("Modelo sincronizado...");

    app.listen(PORT, () => {
      console.log(`Servidor rodando com sucesso na porta ${PORT}`);
    });
  } catch (error) {
    console.log("Erro ao iniciar a aplicação: ", error);
  }
}

startServer();
