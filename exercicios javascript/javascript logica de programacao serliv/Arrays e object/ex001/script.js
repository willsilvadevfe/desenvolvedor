//Mostrar indices do Array e quantidade de indices.
/*
let nomes = ['João', 'Mathias', 'Tamires', 'Jonas', 'Patricia', 'Osmar', 'Jurandir', 'Carla', 'Maria']
console.log(nomes)
console.log(nomes.length)
*/

let numeros = [2, 23, 45, 11, 22, 9, 5, 7, 25]
let numerosMulti = []

for(let i = 0; i < numeros.length; i++){
    let num = numeros[i] * 2
    numerosMulti.push(num)
    console.log(numerosMulti)
}