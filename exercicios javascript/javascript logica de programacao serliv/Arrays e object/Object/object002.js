// Adicione uma propriedade chamada endereço em pessoa que "aponte" para o objeto endereço.

const endereco = {
    logradouro: "Rua Colombo",
    numero: 75,
}

const pessoa = {
    nome: "Camila",
    sobrenome: "Montanholi",
    endereco //Faz a ligação de um outro objeto dentro do Objeto "pessoa".
}

console.log(pessoa)