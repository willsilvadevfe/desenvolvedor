const express = require("express");
const app = express();
const routers = require("./routers");
const port = 8081;

app.use(express.json());
app.use("/", routers);

try {
  app.listen(port, () => {
    console.log("Server is running...");
  });
} catch (error) {
  console.log("Failed connection with the server..." + error);
}
