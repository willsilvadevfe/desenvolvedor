const express = require("express");
const router = express.Router();
const Produtos = require("./models/produtos");

router.get("/", (req, res) => {
  res.send("Rota index.js funcionando com sucesso...");
});

router.post("/produtos", async (req, res) => {
  try {
    const { item, preco, descricao } = req.body;
    const novoProduto = await Produtos.create({
      item,
      preco,
      descricao,
    });

    res.status(201).json(novoProduto);
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao cadastrar produto.",
      erro: error.message,
    });
  }
});

module.exports = router;
