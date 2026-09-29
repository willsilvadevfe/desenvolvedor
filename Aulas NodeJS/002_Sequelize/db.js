const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("cadastro", "root", "12345", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Banco de dados conectado com sucesso...");
  })
  .catch((erro) => {
    console.log("Erro de conexão com o banco de dados." + erro);
  });

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize,
};
