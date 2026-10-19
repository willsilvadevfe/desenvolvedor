const express = require("express");
const app = express();
const port = 8081;
const routers = require("./routers");

app.use(express.json());
app.use("/", routers);

try {
  app.listen(port, () => {
    console.log("Server connect...");
  });
} catch (error) {
  console.log("Connection with the server failed..." + error);
}
