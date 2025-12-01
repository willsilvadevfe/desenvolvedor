/*Pedir para o usuário digitar um número e mostrar a tabuada de 1 até 1000, colocando uma linha divisória ou uma quebra de linha sempre que mudar de dezena.*/

//let num = parseInt(prompt('Digite um número:'))
let num = 5
//let contador = 0

if(num < 0){
    console.log('Digite apenas números acima de 0')
}else if(isNaN(num)){
    console.log('Caracteres não são válidos, digite apenas números.')
}else{
    for(let contador = 0;contador <= 20;contador++){
        let res = num * contador
        console.log(`${num} X ${contador} = ${res}`)
    }

    while(contador = 10){
        console.log('-------------------')
    }
}