const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Usuarios = sequelize.define("usuarios", {
  nome: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },

  sobrenome: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },

  data_nascimento: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },

  sexo: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
});

module.exports = Usuarios;

