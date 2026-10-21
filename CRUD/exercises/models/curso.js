const express = require("express");
const router = express.Router();
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

router.get("/", (req, res) => {
  router.send("Funcionando...");
});

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
