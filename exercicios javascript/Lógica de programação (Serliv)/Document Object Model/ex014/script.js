/* Jogue dois dados quantas vezes forem necessárias até que a soma dos pontos dos dados seja par por 10 vezes. Não contabilize as vezes em que os dados forem iguais. Quantas vezes os dados foram jogados ? */

let vezesDadosJogados = 0
let subtracaoDados = 10
let vezesDadosDivisiveisPorDez = 0

while(true){
    let dado1 = parseInt(Math.random() * 6) + 1
    let dado2 = parseInt(Math.random() * 6) + 1
    console.log(dado1, dado2)
    vezesDadosJogados++

    if((dado1 + dado2) % 2 === 0){
        vezesDadosDivisiveisPorDez++
    }

    if(dado1 === dado2){
        console.log(`Dados iguais detectados, desconsiderando adição a variável.`)
        subtracaoDados--
    }

    if(subtracaoDados == 0){
        break
    }
}
console.log(`-------------------------------------------------`)
console.log(`         Os dados foram jogados ${vezesDadosJogados} vezes`)
console.log(`-------------------------------------------------`)