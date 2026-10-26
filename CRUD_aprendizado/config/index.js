const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Rota index.js funcionando com sucesso...");
});

module.exports = router;
