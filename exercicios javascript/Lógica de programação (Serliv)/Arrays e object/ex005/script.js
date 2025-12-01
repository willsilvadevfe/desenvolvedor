/* Dado um Array que pode conter valores de tipos diferentes, mostre em um alert ou terminal qual é o valor que está no meio (pode ser aproximado) */

const arr = [2, 'NAME', 28, null, 77, 33, undefined, false, 12, 'NAME2']
let qtd = arr.length
qtd = parseInt(arr.length) / 2
console.log('Na posição do meio está: ' + arr[qtd])
console.log('O typeof é: ' + (typeof arr[qtd]))
