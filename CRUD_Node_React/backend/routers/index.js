
const express = require("express");
const router = express.Router();

const Usuarios = require("../users/usuarios");

router.get("/", (req, res) => {
  res.send("Servidor rodando na rota routers/index.js");
});

router.post("/usuarios", async (req, res) => {
  try {
    const { nome, sobrenome, data_nascimento, sexo } = req.body;

    const novoUsuario = await Usuarios.create({
      nome,
      sobrenome,
      data_nascimento,
      sexo,
    });

    res.status(201).json(novoUsuario);
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);

    res.status(500).json({
      mensagem: "Erro ao cadastrar usuário.",
      erro: error.message,
    });
  }
});

module.exports = router;
