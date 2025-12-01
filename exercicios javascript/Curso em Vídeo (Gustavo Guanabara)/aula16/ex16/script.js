
let num = document.getElementById('inpnumber') //Cria váriavel para caixa de texto
let lista = document.getElementById('add') //Cria váriavel para caixa que ficará os itens (select)
let res = document.getElementById('res') //Cria várial para mostrar resultado na tela
let valores = [] //Cria uma váriavel para armazenar array (guarda mais de um valor)

function isNumero(n){
    if(Number(n) >= 1 && Number(n) < 100){
        return true
} else{
        return false
    }
}

function inLista(n, l){
    if(l.indexOf(Number(n)) != -1){ //-1 Significa que o valor não foi encontrado na lista (!= diferente)
        return true
    }else{
        return false
    }
}

function adicionar(){ //Cria uma função 
    if(isNumero(num.value) && !inLista(num.value, valores)){ //! Significa NÃO em JS
    valores.push(Number(num.value))
    let item = document.createElement('option')
    item.text = `O valor ${num.value} foi adicionado.`
    lista.appendChild(item)
    res.innerHTML = ''
} else{
    window.alert('Valor inválido ou já encontrado na lista')
    }
}

num.value = ''
num.focus()

function finalizar(){
    if(valores.length == 0){
        window.alert('Não há dados adicionados')
}   else{
    let tot = valores.length
    let maior = valores[0]
    let menor = valores[0]
    let soma = 0
    let media = 0


    for(let pos in valores){
        soma += valores[pos]
        if(valores[pos] > maior)
            maior = valores[pos]
        if(valores[pos] < menor)
            menor = valores[pos]
    }
    media = soma / tot
    res.innerHTML = ''
    res.innerHTML += `<p>Ao todo temos ${tot} números cadastrados.</p>`
    res.innerHTML += `<p>O maior valor encontrado foi ${maior}</p>`
    res.innerHTML += `<p>O menor valor encontrado foi ${menor}</p>`
    res.innerHTML += `<p>Somando todos os valores temos um total de ${soma}</p>`
    res.innerHTML += `<p>A média dos valores é ${media}</p>`
}
}

























/*
        function adicionar(){
            let dados = window.document.getElementById('add')
            let num = window.document.getElementById('inpnumber')
            let userNum = Number(num)
            if(num.value == 0 || num.value < 0 || num.value > 100){
                alert('[ERRO] Digite um numero maior do que "0" e menor do que "100".')
            }else{
                let c = 1

                for(let cnum = 1;cnum <= 1;cnum++){
                    let item = document.createElement('option')
                    item.text = `O valor ${num.value} foi adicionado!`
                    dados.appendChild(item)
                    c++
                }
            }
        }

        function finalizar(){
            let res = window.document.getElementById('res')
            let dados = window.document.getElementById('add')
            dados = document.createElement('option')
            add.appendChild(dados)
            dados = dados.value
        }
*/