const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Servidor rodando na rota routers/index.js");
});

router.post("/usuarios", (req, res) => {
  try {
    const { nome, sobrenome, data_nascimento, sexo } = req.body;
    const novoUsuario = Usuarios.create({
      nome,
      sobrenome,
      data_nascimento,
      sexo,
    });

    res.status(201).json(novoUsuario);
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao cadastrar usuario.",
      erro: error.message,
    });
  }
});

module.exports = router;
