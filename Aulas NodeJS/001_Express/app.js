const express = require("express");
const app = express();

try {
  app.listen(8081, () => {
    console.log("Servidor funcionando com sucesso...");
  });
} catch (error) {
  console.log("Erro ao conectar com o servidor... ", error);
}

app.get("/", (req, res) => {
  res.send("Rota principal funcionando com sucesso...");
});

app.get("/parametros", (req, res) => {
  res.send("Rota de parametros criada com sucesso...");
});

app.get("/parametros/:id", (req, res) => {
  if (req.params.id == "1") {
    res.send('Parametro "1" funcionando com sucesso');
  } else if (req.params.id == "2") {
    res.send('Parametro "2" funcionando com sucesso');
  } else {
    res.send(
      "Nenhuma parametro com essa chave foi encontrado, tente novamente...",
    );
  }
});
