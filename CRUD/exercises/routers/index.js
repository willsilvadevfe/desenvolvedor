const express = require("express");
const router = express.Router();
const Curso = require("../models/curso");

router.post("/cursos", async (req, res) => {
  try {
    const curso = await Curso.create({
      nome: req.body.nome,
      duracao: req.body.duracao,
    });
    res.status(201).json({
      mensagem: "Curso cadastrado com sucesso!",
      curso,
    });
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao cadastrar o curso!",
      error: error.message,
    });
  }
});

router.get("/", (req, res) => {
  res.send("API is running...");
});

module.exports = router;
