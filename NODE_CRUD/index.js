const express = require("express");
const router = express.Router();
const usuarios = require("./database/users");

router.get("/", (req, res) => {
  res.send("Funcionando com sucesso...");
});

router.post("/usuarios", async (req, res) => {
  try {
    const { nome, sobrenome, email } = req.body;

    if (!nome || !sobrenome || !email) {
      return res.status(400).json({
        mensagem: "Preencha todos os campos!",
      });
    }
    const newUser = await usuarios.create({
      nome,
      sobrenome,
      email,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao cadastrar",
      erro: error.message,
    });
  }
});

module.exports = router;
