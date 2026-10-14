const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Aba estudantes funcionando com sucesso...");
});

module.exports = router;
