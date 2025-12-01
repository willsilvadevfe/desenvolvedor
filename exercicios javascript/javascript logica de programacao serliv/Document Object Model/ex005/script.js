let n1 = parseFloat(prompt("Digite o primeiro valor:"))
let n2 = parseFloat(prompt("Digite o segundo valor:"))

let media = (n1 + n2) / 2

if(media > 4 && n1 > 0 && n2 > 0){
    alert('APROVADO!')
}else{
    alert('REPROVADO!')
}
