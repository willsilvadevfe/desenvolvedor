const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Curso = sequelize.define("Curso", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  duracao: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Curso;
