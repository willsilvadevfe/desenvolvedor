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

Produtos.destroy({
  where: {
    id: 6,
  },
});

Produtos.sync({ force: false });
