const express = require("express");
const cursosRouter = require("./cursos");
const estudantesRouter = require("./estudantes");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Router index.js funcionando com sucesso.");
});

router.use("/estudantes", estudantesRouter);
router.use("/cursos", cursosRouter);

module.exports = router;
