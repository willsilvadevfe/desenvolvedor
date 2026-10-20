const express = require("express");
const app = express();
const PORT = 8081;
const routers = require("./routers");
const sequelize = require("./config/database");

app.use(express.json());
app.use("/", routers);

app.get("/", (req, res) => {
  res.send("API is running...");
});

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Connect PostgreSQL success!");

    await sequelize.sync();
    console.log("Create tables success!");

    app.listen(PORT, () => {
      console.log("Server is running...");
    });
  } catch (error) {
    console.log("Connection server error" + error);
  }
}

startServer();
