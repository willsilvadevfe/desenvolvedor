const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("porta principal usando rotas rodando com sucesso...");
});

module.exports = router;
