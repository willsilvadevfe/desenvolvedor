const express = require("express");
const app = express();
const PORT = 3000;
const cors = require("cors");

const indexRouter = require("./routers");
const sequelize = require("./database/database");

const Usuarios = require("./users/usuarios");

app.use(cors());
app.use(express.json());
app.use("/", indexRouter);

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Conexão com banco estabelecida.");

    await sequelize.sync();
    console.log("Modelo sincronizado.");

    app.listen(PORT, () => {
      console.log("Servidor funcionando com sucesso.");
    });
  } catch (erro) {
    console.log("Erro ao se conectar com o banco.", erro);
  }
}

startServer();
