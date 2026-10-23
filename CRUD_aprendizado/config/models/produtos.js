const express = require("express");
const router = express.Router();
const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Produto = sequelize.define("Produto", {
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

module.exports = Produto;
