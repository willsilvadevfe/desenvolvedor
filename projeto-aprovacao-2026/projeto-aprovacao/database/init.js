//init.js para executar o banco de dados e criar a tabela de usuarios caso não exista
import db from "./database.js";

console.log(
  "Banco de dados inicializado e tabela de usuários criada com sucesso!",
);

db.close();
