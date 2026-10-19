const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("class page is running...");
});

module.exports = router;
