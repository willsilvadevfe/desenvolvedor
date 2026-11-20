const path = require("path");

//Mostra o nome desse arquivo (path.js)
console.log(path.basename(__filename));

//Mostra o nome do direito desse arquivo
console.log(path.dirname(__filename));

//Mostra a extensão desse arquivo (.js)
console.log(path.extname(__filename));

//Mostra todas as opções anteriores em um objeto
console.log(path.parse(__filename));

//Função que junta partes de um caminho
//Muito utilizada em desenvolvimento com node
console.log(path.join(__dirname));
console.log(path.join(__dirname, "teste.html"));
