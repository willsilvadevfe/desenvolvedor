const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Cars page is running...");
});

module.exports = router;
