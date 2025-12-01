//Dado um objeto com nome do aluna e um Array com notas, mostre na tela as seguintes informações: 
//Nome, lista com as notas, média e se foi aprovado ou reprovado (nota de corte 7).

const aluno = {
    nome: "João",
    sobrenome: "Cavalcante",
    notas: [1, 3, 3, 8]
}

let contador = 0

for(let i = 0;i < aluno.notas.length;i++){
    contador += aluno.notas[i]
}

let media = contador / aluno.notas.length

console.log('Informações de avaliação do aluno.')
console.log('----------------------------------')
console.log(`Nome do aluno: ${aluno.nome} ${aluno.sobrenome}`)
console.log('----------------------------------')

if(media >= 7){
console.log(`A nota média do aluno foi ${media}, está aprovado.`)
console.log(`A nota para aprovação deve ser igual ou maior do que 7.`)
console.log(`Parabéns.`)
}else{
console.log(`A nota média do aluno foi ${media}, está reprovado.`)
console.log(`A nota para aprovação deve ser igual ou maior do que 7.`)
console.log(`Continue estudando para realizar uma nova avaliação.`)
}



