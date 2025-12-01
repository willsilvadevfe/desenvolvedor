function verificar(){
    var hora = new Date()
    var ano = hora.getFullYear()
    var res = document.getElementById('res')
    var nasc = document.getElementById('txtano')
    
    if (nasc.value == 0 || Number(nasc.value) > ano){
        window.alert('ERRO, Verifique os dados e tente novamente!')
    } else{
        var fsex = document.getElementsByName('radsex')
        var idade = ano - nasc.value
        var genero = ''
        var img = document.createElement('img')
        img.setAttribute('id', 'foto')
        if (fsex[0].checked) {
            genero = 'homen'
            if (idade > 0 && idade < 10){
                img.setAttribute('src', 'childM.png')
            }else if (idade < 21){
                img.setAttribute('src', 'youngM.png')
            }else if (idade < 50){
                img.setAttribute('src', 'adultoM.png')
            }else{
                img.setAttribute('src', 'oldM.png')
            }
        } else if (fsex[1].checked){
            genero = 'mulher'
            if (idade > 0 && idade < 10){
                img.setAttribute('src', 'childF.png')
            }else if (idade < 21){
                img.setAttribute('src', 'youngF.png')
            }else if (idade < 50){
                img.setAttribute('src', 'adultoF.png')
            }else{
                img.setAttribute('src', 'oldF.png')  
            }
        }
        res.style.fontSize = '20px'
        res.style.textAlign = 'center'
        res.style.paddingTop = '20px'
        res.innerHTML = `Detectamos ${genero} com ${idade} anos de idade!<br>`
        img.style.width = '250px'
        img.style.paddingTop = '20px'
        res.appendChild(img)
        
    }

}
