const express = require("express");
const router = express.Router();
const routerClass = require("./class");
const routerSchool = require("./school");

router.use("/class", routerClass);
router.use("/school", routerSchool);

const cursos = [];

router.get("/", (req, res) => {
  res.json(cursos);
});

router.post("/", (req, res) => {
  const curso = req.body;
  cursos.push(curso);

  res.status(201).json({
    mensagem: "Curso cadastrado com sucesso!",
    cursos: curso,
  });
});


module.exports = router;
