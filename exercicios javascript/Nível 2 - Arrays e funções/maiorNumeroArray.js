//Maior número de um Array

let numeros = [2, 3, 5, 22, 33, 12, 34, 25, 1, 4, 6, 65];

let maior = numeros[0];

for (let i = 0; i < numeros.length; i++) {
  if (numeros[i] > maior) {
    maior = numeros[i];
  }
}

console.log(maior);
