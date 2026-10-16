const express = require("express");
const app = express();
const port = 8081;
const routers = require("./express_routes");

app.use(express.json());
app.use("/", routers);

try {
  app.listen(port, () => {
    console.log("Server is running...");
  });
} catch (error) {
  console.log("Failed connect with the server..." + error);
}
