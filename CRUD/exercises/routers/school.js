const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json(
    {
      mensagem: "Cursos encontrados",
      cursos: ["React", "PHP", "Python", "Node.js"],
    }
  );
});

module.exports = router;
