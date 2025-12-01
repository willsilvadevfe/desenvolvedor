// Dado um Array contendo 3 objetos, cada um representando um produto, mostre em uma tag <table> o nome, o preço e a quantidade em estoque de cada produto.

const elementos = [
        {nome: "teclado", preco: 50, quantidade: 42},
        {nome: "mouse", preco: 35, quantidade: 22},
        {nome: "monitor", preco: 450, quantidade: 18},
        {nome: "gabinete", preco: 233, quantidade: 10},
        {nome: "headset", preco: 90, quantidade: 12},
]

for(let i = 0; i < elementos.length; i++){
    const list = document.getElementById('list')
    list.innerHTML += `<tr>
                <td>${elementos[i].nome}</td>
                <td>${elementos[i].preco.toFixed(2)}</td>
                <td>${elementos[i].quantidade}</td>
            </tr>`
    
}


