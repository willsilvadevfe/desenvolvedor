let horas = document.getElementById('hour') //Cria variavel com elemento ID
let minutes = document.getElementById('minutes') //Cria variavel com elemento ID
let seconds = document.getElementById('seconds') //Cria variavel com elemento ID


let relogio = setInterval(function time(){ //Cria uma function para relógio com setInterval
    let dateToday = new Date() //Variavel para data exata, puxa info hr, min e sec
    let hr = dateToday.getHours() //Define variavel para pegar hora exata
    let min = dateToday.getMinutes() //Define variavel para pegar minuto exat
    let sec = dateToday.getSeconds() //Define variavel para pegar segundos exatos
    

    if(hr < 10) hr = '0' + hr //Se as horas forem menor que 10 add um '0' antes, sempre 2 digitos.
    if(min < 10) min = '0' + min //Se os minutos forem menor que 10 add um '0' antes, sempre 2 digitos.
    if(sec < 10) sec = '0' + sec //Se os segundos forem menor que 10 add um '0' antes, sempre 2 digitos.

    horas.textContent = hr //Pega a variavel horas(ID) e add hora exata na tela.
    minutes.textContent = min //Pega a variavel minutos(ID) e add hora exata na tela.
    seconds.textContent = sec //Pega a variavel segundos(ID) e add hora exata na tela.
})


//Formatação de estilo (CSS) para as variaveis horas, minutes e seconds.
//Melhorar...
horas.style.color = 'orange'
horas.style.fontSize = '6.2em'
horas.style.fontFamily = 'Orbitron'
horas.style.fontWeight = 'bold'

minutes.style.color = 'orange'
minutes.style.fontSize = '6.2em'
minutes.style.fontFamily = 'Orbitron'
minutes.style.fontWeight = 'bold'

seconds.style.color = 'orange'
seconds.style.fontSize = '6.2em'
seconds.style.fontFamily = 'Orbitron'
seconds.style.fontWeight = 'bold'