//Usando filter() para obter maior de idade dentro de um Array.

let idade = [17, 16, 21, 19, 34, 15, 18];

const filtro = idade.filter((age) => {
  if (age >= 18) {
    console.log(age);
  }
});
