const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Servidor rodando na rota routers/index.js");
});

module.exports = router;
