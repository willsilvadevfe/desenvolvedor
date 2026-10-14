const express = require("express");
const router = express.Router();
const cursosRouter = require("./cursos");
const estudantesRouter = require("./estudantes");

router.get("/", (req, res) => {
  res.send("Router index.js funcionando com sucesso.");
});

router.use("/estudantes", estudantesRouter);
router.use("/cursos", cursosRouter);

module.exports = router;
