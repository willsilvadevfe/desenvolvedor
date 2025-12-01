let dado1 = parseInt(Math.random() * 6 + 1)
let dado2 = parseInt(Math.random() * 6 + 1)

let contador = 1

do{ 
    contador++
    dado1 = parseInt(Math.random() * 6 + 1)
    dado2 = parseInt(Math.random() * 6 + 1)
    console.log(dado1, dado2)
}while(dado1 !== dado2)

    console.log(`Os dados foram jogador ${contador} vezes, e os números que se repetiram foi o ${dado1}.`)