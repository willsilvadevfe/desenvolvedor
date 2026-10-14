const express = require("express");
const router = express.Router();
const cursosRouter = require("./cursos");
const estudantesRouter = require("./estudantes");

router.use("/cursos", cursosRouter);
router.use("/estudantes", estudantesRouter);

module.exports = router;
