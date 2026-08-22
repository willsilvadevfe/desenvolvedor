//Calculando a média de números em um Array

let numeros = [22, 34, 12, 10, 5, 2, 65, 12, 2, 6];

let soma = 0;

for (let i = 0; i < numeros.length; i++) {
  soma += numeros[i];
}

let media = soma / numeros.length;

console.log(`Soma de todos números no Array: ${soma}`);
console.log(`Quantidade de números dentro do Array: ${numeros.length}`)
console.log(`Média: ${media}`)
