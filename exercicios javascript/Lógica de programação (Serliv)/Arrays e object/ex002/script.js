/* Dado um Array contendo os dias da semana, mostre em um alert qual é o dia atual */

let dayWeek = new Date()
let day = dayWeek.getDay()
let today = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sabádo']

console.log('Hoje é ' + today[day]) //Mostra na tela o indice da Array (today) sobre o indice da variavel (day).

/*
Estrutura com Switch

switch(day){
    case 0:
        console.log(today[0])
        break
    case 1:
        console.log(today[1])
        break
    case 2:
        console.log(today[2])
        break
    case 3:
        console.log(today[3])
        break
     case 4:
        console.log(today[4])
        break
    case 5:
        console.log(today[5])
        break
    case 6:
        console.log(today[6])
        break
}
*/