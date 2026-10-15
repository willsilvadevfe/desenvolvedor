const express = require("express");
const app = express();
const router = express.Router();
const carsRoute = require("./cars");

router.use("/cars", carsRoute);

router.get("/", (req, res) => {
  res.send("Port index is running...");
});

module.exports = router;
