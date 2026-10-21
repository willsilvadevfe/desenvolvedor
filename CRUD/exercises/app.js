const express = require("express");
const app = express();
const routers = require("./routers");
const sequelize = require("./config/database");
const Curso = require("./models/curso");
const cors = require("cors");

app.use(express.json());
app.use("/", routers);
app.use("/curso", Curso);
app.use(cors());

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Connect PostgreSQL success!");

    await sequelize.sync();
    console.log("Create table success!");

    app.listen(3000, () => {
      console.log("Server is running...");
    });
  } catch (error) {
    console.log("Connection server error" + error);
  }
}

startServer();
