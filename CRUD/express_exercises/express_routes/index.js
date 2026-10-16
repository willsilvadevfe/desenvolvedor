const express = require("express");
const router = express.Router();
const carsRouter = require("./cars");

router.use("/cars", carsRouter);

router.get("/", (req, res) => {
  res.send("Page index.js is running...");
});

module.exports = router;
