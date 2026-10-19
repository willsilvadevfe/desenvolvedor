const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const id = req.params.id;
  res.json({
    mensagem: "Curso encontrado",
    id: id,
  });
});
module.exports = router;
