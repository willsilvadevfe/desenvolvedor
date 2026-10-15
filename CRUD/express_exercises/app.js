const express = require("express");
const app = express();
const port = 3000;
const routers = require("./express_routes");

app.use(express.json());
app.use("/", routers);

try {
  app.listen(port, () => {
    console.log("Server is running...");
  });
} catch (error) {
  console.log("Failed connection with the server..." + error);
}
