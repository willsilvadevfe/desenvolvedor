const express = require("express");
const app = express();

try {
  app.listen(8081, () => {
    console.log("Servidor funcionando com sucesso...");
  });
} catch (error) {
  console.log("Erro ao se conectar com o servidor... ", error);
}

app.get("/cursos", (req, res) => {
  res.send(
    "Página principal - Área de Cursos. --- Digite o id após /cursos para navegar no curso desejado.",
  );
});

app.get("/cursos/:id", (req, res) => {
  if (req.params.id == "1") {
    res.send("1 - Análise e Desenvolvimento de Sistemas.");
  } else if (req.params.id == "2") {
    res.send("2 - Ciência da Computação.");
  } else if (req.params.id == "3") {
    res.send("3 - Engenharia de Software.");
  } else {
    res.send(
      "Nenhuma curso foi encontrado pelo ID digitado, tente novamente...",
    );
  }
});
