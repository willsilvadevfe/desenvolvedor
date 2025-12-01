//Pedir para um usuario digitar um numero 
//e mostrar todos os números pares de 2
//inclusive até o número que o usuário digitou. 

let num = parseInt(20)
let restDiv = num % 2
let contador = 0

if(restDiv === 1){
    console.log('ERRO! Digite um número "PAR".')
}else if(isNaN(num)) {
    console.log('Caracteres e letras não são aceitáveis')
} else {
    while(contador <= num && restDiv === 0){
        console.log(contador)
    }
}


//while(num = true){
 //   console.log(contador)
//    contador++
//}