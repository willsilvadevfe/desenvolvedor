/*Mostre na tela todos os anos a partir de 1004 até o ano de 2024, pulando de quatro em quatro anos.
Por exemplo: 
    1004
    1008
    1012
    E assim por diante.
É como mostrar os anos bissextos, mas sem as regras para descobrir se um ano é bissexto ou não. (vamos imaginar que se o ano é múltiplo de quatro, ele é bissexto).*/

let contador = 1004
let loop = 0
let now = new Date()
let year = now.getFullYear()

do{
    console.log(contador)
    contador += 4
    loop++
}while(contador <= year)

    console.log('Código que mostra todos os anos bissextos a partir de 1004 até o ano atual.')
    console.log(`O código foi executado ${loop} vezes.`)

//console.log(year)