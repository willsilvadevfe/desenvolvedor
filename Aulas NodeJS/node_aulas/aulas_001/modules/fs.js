const { error } = require("console");
const fs = require("fs");
const path = require("path");

//Comando para criar um pasta com fs
// fs.mkdir(path.join(__dirname, "/teste"), (error) => {
//   if (error) {
//     return console.log("Error: ", error);
//   }
//   console.log("Diretório criado com sucesso!");
// });

// //Comando para criar um arquivo com fs
// fs.writeFile(
//   path.join(__dirname, "/teste", "teste.txt"),
//   "Essa pasta foi criada a partir do 'fs'.",
//   (error) => {
//     if (error) {
//       return console.log("Error: ", error);
//     }
//     console.log("Arquivo criado com sucesso!");
//   },
// );


//Comando para ler um arquivo com fs
const filePath = path.join(__dirname, "/teste", "teste.txt");

fs.readFile(filePath, "utf-8", (error, data) => {
  if (error) {
    return console.log("Error: ", error);
  }
  console.log("Conteúdo do arquivo: ", data);
});
