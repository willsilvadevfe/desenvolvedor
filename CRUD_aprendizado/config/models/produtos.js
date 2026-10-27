const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Produtos = sequelize.define("Produtos", {
  item: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },

  preco: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },

  descricao: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
});

module.exports = Produtos;
