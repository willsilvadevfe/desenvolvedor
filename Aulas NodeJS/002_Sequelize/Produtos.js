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
  nome: "Gabinete F145X Concordia",
  preco: "399.99",
  descricao: "Gabinete branco transparente Concordia",
});

Produtos.sync({ force: false });
