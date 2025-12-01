/* Dado um Array que pode conter valores de tipos diferentes, mostre em um alert ou terminal a soma de todos os números */

const arr = [1, 3, 'Texto', null, undefined, 10, 12, 'Texto2']

let soma = 0

for(let i = 0;i < arr.length; i++){
        let num = arr[i] 
        if(typeof num === "number"){
            soma = soma + num
        }
    }
    console.log(soma)
