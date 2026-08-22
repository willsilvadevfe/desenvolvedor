//Filtrar números pares dentro de um Array

let numeros = [ 3, 4, 5, 6, 7, 10, 9, 15, 20];

let pares = 0;

for(let i = 0; i < numeros.length; i++){
    if(numeros[i] % 2 == 0){
        pares += [numeros[i]]
        
    }
}

console.log(`Valores pares dentro do Array: ${pares}`)
