const express = require("express");
const app = express();
const router = express.Router();
const classRouter = require("./class");
const classSchool = require("./school");

router.get("/", (req, res) => {
  res.send("Index port is running...");
});

router.use("/class", classRouter);
router.use("/school", classSchool);

module.exports = router;
