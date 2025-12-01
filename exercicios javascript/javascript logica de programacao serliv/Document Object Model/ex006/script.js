let n1 = parseFloat(prompt('Digite um número maior que 0 e menor que 10'))
let n2 = parseFloat(prompt('Digite outro número maior que 0 e menor que 10'))

if(n1 < 1 || n2 < 1 || n1 > 10 || n2 > 10){
    window.alert('Digite números válidos conforme a solicitação.')
} else if(isNaN(n1) || isNaN(n2)){
    window.alert('Digite apenas números, textos não são válidos.')
} else{
    let soma = n1 + n2
    window.alert('A soma dos valores é ' + soma)
}


