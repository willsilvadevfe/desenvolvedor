let dado1 = parseInt(Math.random() * 6 + 1)
let dado2 = parseInt(Math.random() * 6 + 1)

let contador = 1

do{ 
    contador++
    dado1 = parseInt(Math.random())
    dado1 = parseInt(Math.random())
    console.log(dado1, dado2)
}while(dado1 !== dado2)

    console.log(`Os dados foram jogador ${contador} vezes, e o número que se repetiu foi ${dado1}`)