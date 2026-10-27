const express = require("express");
const app = express();
const PORT = 3000;

const indexRouter = require("./config");
const sequelize = require("./config/database/database");

const Produtos = require("./config/models/produtos");

app.use(express.json());
app.use("/", indexRouter);

async function startServer() {
  try {
    //1 - Testa conexão com banco de dados
    await sequelize.authenticate();
    console.log("Conexão com o banco estabelecida com sucesso!");

    //2 - Sincroniza os modelos com o banco
    await sequelize.sync();
    console.log("Modelos sincronizados com o banco!");

    //3 - Inicia o servidor
    app.listen(PORT, () => {
      console.log(`Servidor conectado com sucesso na porta: ${PORT}`);
    });
  } catch (error) {
    console.log("Erro de conexão com o banco de dados...", error);
  }
}

startServer();
