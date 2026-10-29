const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  "Usuarios",
  "usuarios",
  "postgres",
  "will8864",
  {
    host: "localhost",
    dialect: "postgres",
    port: 5432,
  },
);

module.exports = sequelize;
