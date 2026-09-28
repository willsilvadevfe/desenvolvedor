const express = require("express");
const app = express();

try {
  app.listen(8081, () => {
    console.log("Servidor rodando com sucesso...");
  });
} catch (error) {
  console.log("Erro de conexão com o servidor ", error);
}

app.get("/", (req, res) => {
  res.send("Rota princial rodando com sucesso");
});

app.get("/parametros/:id", (req, res) => {
  if (req.params.id == "1") {
    res.send("Rota com parametro 1 encontrada e funcionando com sucesso...");
  } else if (req.params.id == "2") {
    res.send("Rota com parametro 2 encontrada e funcionando com sucesso...");
  } else if (req.params.id == "3") {
    res.send("Rota com parametro 3 encontrada e funcionando com sucesso...");
  } else {
    res.send("Nenhuma rota foi encontrada com o parametro digitado...");
  }
});
