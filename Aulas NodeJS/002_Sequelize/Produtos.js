const db = require("./db");

const Produtos = db.sequelize.define("produtos", {
  nome: {
    type: db.Sequelize.STRING,
    allowNull: false,
  },
  preco: {
    type: db.Sequelize.DOUBLE,
    allowNull: false,
  },
  descricao: {
    type: db.Sequelize.TEXT,
    allowNull: false,
  },
});

Produtos.create({
  nome: "Monitor Gamer Concordio XF125",
  preco: "789.50",
  descricao: "Monitor tela curva Gamer 125hz",
});

Produtos.sync({ force: false });
