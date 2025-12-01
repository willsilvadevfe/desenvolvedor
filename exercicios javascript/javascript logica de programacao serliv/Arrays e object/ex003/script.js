/* Dado um Array de números, mostre em um alert ou terminal a soma de todos eles */

const num = [12, 2, 56, 89, 45, 5, 4, 9, 3]

let soma = 0

for(let i = 0; i < num.length;i++){
    let numero = num[i]
    soma = soma + numero
}

console.log(`A soma dos números dentro do Array é de ${soma}`)