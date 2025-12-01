/* Dado um Array de números, mostre em um alert ou terminal a soma dos números ímpares */

const numeros = [2, 5, 6, 12, 66, 33, 7, 8, 9, 1, 4]
let soma = 0

for(let i = 0; i < numeros.length; i++){
    let num = numeros[i] //Declara var para passar pelos indices do Array
        if(num % 2 !== 0){ //Se o resto da divisão entre os indices do Array for resto 1 (impar)
            soma += num
        }
}
    console.log('A soma entre os índices impares do Array é: ' + soma)

    