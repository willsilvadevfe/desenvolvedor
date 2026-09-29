const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("cadastro", "root", "123456", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Banco de dados conectado com sucesoo...");
  })
  .catch((error) => {
    console.log("Erro de conexão com o banco de dados..." + error);
  });

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize,
};
