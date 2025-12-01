/*Jogue dois dados quantas vezes forem necessárias até que a soma de pontos dos dados seja par por 10 vezes. Quantas vezes os dados foram jogados ?*/

let dado1 = parseInt(Math.random() * 6 + 1)
let dado2 = parseInt(Math.random() * 6 + 1)
dado1 = dado1 % 2
dado2 = dado2 % 2
let res = (dado1+dado2) % 2
let contador = 0


while(contador <= 10){
    let dado1 = parseInt(Math.random() * 6 + 1)
    let dado2 = parseInt(Math.random() * 6 + 1)
    console.log(dado1, dado2)
        if(dado1 !== 1 && dado2 !== 1){
            console.log(`Números pares encontrados... Continuando... ${[contador]}`)
            contador++
            continue
        }
}
console.log(`Os dados foram jogados ${contador} vezes.`)
    


/*for(let p = 0;p < 5;p++){
    let dado1 = parseInt(Math.random() * 6 + 1)
    let dado2 = parseInt(Math.random() * 6 + 1)
    console.log(dado1, dado2)
     if(res === true){
        console.log('Números pares detectados ... Continuando ...')
        continue
     }
    }

    

//let respar = (dado1+dado2) % 2
//let loop = 0*/


