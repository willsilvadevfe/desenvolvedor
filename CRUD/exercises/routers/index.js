const express = require("express");
const router = express.Router();
const routerClass = require("./class");
const routerSchool = require("./school");

router.use("/class", routerClass);
router.use("/school", routerSchool);


router.get("/", (req, res) => {
  res.send("API is running...");
});




module.exports = router;
