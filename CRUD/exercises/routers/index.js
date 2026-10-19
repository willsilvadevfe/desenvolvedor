const express = require("express");
const router = express.Router();
const routerClass = require("./class");
const routerSchool = require("./school");

router.use("/class", routerClass);
router.use("/school", routerSchool);

router.get("/", (req, res) => {
  res.send("index page running...");
});

router.get("/country/:id", (req, res) => {
  if (req.params.id == 1) {
    res.send("Brazil id number one detected...");
  } else if (req.params.id == 2) {
    res.send("United States id number two detected...");
  } else {
    res.send("Country not registered...");
  }
});

module.exports = router;
