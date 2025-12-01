let num = parseInt(prompt('Digite um número:'))
let contador = 0


while(contador <= 30){
    let mult = num * contador
    document.write(num + " X " + contador + " = " + mult + '<br>')
    contador++
}


/* TENTATIVA PUXANDO ELEMENTO POR ID, NÃO FUNFOU */

/*let n1 = parseFloat(prompt('Digite um número:'))
let contador = 0
let res = document.getElementById('res')

while(contador <= 20){
    res.innerHTML = (n1 + ' X ' + contador + ' = ' + n1 * contador)
    contador++
}*/


/*let num = parseFloat(prompt('Digite um número para gerar tabuada:'))

if(isNaN(num)){
    alert('Digite apenas números!')
} else{
    let res = document.getElementById('res')
    let contador = 0

    while(contador <= 50){
        res.innerHTML = (`${num} X ${contador} = ${contador*num}`)
        contador++
    }
}*/