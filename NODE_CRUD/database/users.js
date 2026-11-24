const { DataTypes } = require("sequelize");
const sequelize = require("./database");

const Usuarios = sequelize.define("usuarios", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  sobrenome: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Usuarios;
