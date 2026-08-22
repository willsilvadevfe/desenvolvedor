//Descubra o menor número de um Array

let numeros = [3, 4, 12, 11, 22, 34, 45, 54, 5,];

let menor = numeros[0]

for(let i = 0; i < numeros.length; i++){
    if(numeros[i] < menor){
        menor = numeros[i]
    }
}

console.log(menor)