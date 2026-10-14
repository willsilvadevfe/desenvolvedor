const express = require("express");
const router = express.Router();

router.use("/", (req, res) => {
  res.send("Aba estudantes funcionando com sucesso...");
});

module.exports = router;
