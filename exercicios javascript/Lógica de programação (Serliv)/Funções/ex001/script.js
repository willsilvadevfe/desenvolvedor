function clicar(){
    const tab = document.getElementById('tab')
    const btn = document.getElementById('btn')
    const boxValue = document.getElementById('numberbox')

    tab.style.color = '#fff'
    tab.style.textAlign = 'center'
    tab.style.marginTop = '50px'
    tab.style.fontSize = '1.25rem'
    

    clean() //Limpa tabuada anterior sozinho.

    if(boxValue.value <= 0 || boxValue.value > 100 || boxValue.value == isNaN(boxValue)){
        
        alert('Digite apenas números entre 1 e 100 para gerar sua tabuada, números negativos, números iguais a 0 e qualquer outro tipo de caracter não é válido.')
    }else{
        let contador = 0
        while(contador <= 10){
            
            tab.innerHTML += `${boxValue.value} X ${contador} = <strong>${boxValue.value * contador}</strong> </br>`          
            contador++
        }
            tab.innerHTML += "<br>Exercicio Javacript executado por<br> Willian Silva"
    }
}


function clean(){
    const tab = document.getElementById('tab')
    const clear = document.getElementById('clean')

    tab.innerHTML = ""
}