const express = require("express");
const router = express.Router();
const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Produtos = sequelize.define("Produtos", {
  item: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  preco: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
});

module.exports = router;
module.exports = Produtos;
