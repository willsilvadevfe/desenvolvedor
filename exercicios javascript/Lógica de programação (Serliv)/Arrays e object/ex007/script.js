/* Dado um Array qualquer, mostre em um alert ou terminal um boolean indicando se encontrou um dos seguintes valores do Array: null, undefined ou NaN */

const arr = [2, null, "T01", 30, 33, undefined, 21, 3, NaN, null, "T02"]
let search = false

for(let i = 0; i < arr.length; i++){
    if(arr[i] === null || arr[i] === undefined || isNaN(arr[i])){
        search = true
        break
    }
}
    console.log('Detectado typeof = null, undefined ou NaN: ' + search)



