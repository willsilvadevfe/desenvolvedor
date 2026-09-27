const express = require("express"); //Importando express no app.js
const app = express(); //Agora a variavel app é o próprio express

app.listen(8081, () => {
  //Express escutando na porta padrão do node (8081), função assincrona para verificar funcionamento
  console.log("Servidor iniciado com sucesso..."); //Console.log para avisar que servidor está rodando normalmente
});

app.get("/", (req, res) => {
  //Express com método GET com parametros de requisição e resposta para enviar solicitação ao front
  res.send("Porta principal funcinando com sucesso..."); //Resposta enviada ao front-end
});
