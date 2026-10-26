const express = require("express");
const router = express.Router();
const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Produto = sequelize.define("Produtos", {
  estoque: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  preco: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

module.exports = router;
module.exports = Produto;
