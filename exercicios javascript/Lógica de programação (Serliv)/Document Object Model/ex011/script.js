/*Pedir para o usuário digitar um número e mostrar a tabuada de 1 até 1000, colocando uma linha divisória ou uma quebra de linha sempre que mudar de dezena.*/

//let num = parseInt(prompt('Digite um número:'))
let num = 9

let now = new Date()
let hour = now.getHours()
let min = now.getMinutes()
let sec = now.getSeconds()
let date = now.getUTCDate()
let year = now.getFullYear()
let ms = now.getUTCMonth()

if(num < 0){
    console.log('Digite apenas números acima de 0')
}else if(isNaN(num)){
    console.log('Caracteres não são válidos, digite apenas números.')
}else{

    if(hour < 10) hour = "0" + hour
    if(min < 10) min = "0" + min
    if(sec < 10) sec = "0" + sec

    if(date < 10) date = "0" + date
    if(ms < 10) ms = "0" + ms

    console.log(`>> Tabuada gerada conforme número digitado pelo usuário: ${num}`)
    console.log(`>> Data e hora em que tabuada foi gerada: ${date}/${ms}/${year} - ${hour}:${min}:${sec}`)
        console.log('')
    for(let contador = 1;contador <= 100;contador++){
        let res = num * contador
        console.log(`${num} X ${contador} = ${res}`)
        if(contador % 10 === 0){ console.log('')} 
    }
}