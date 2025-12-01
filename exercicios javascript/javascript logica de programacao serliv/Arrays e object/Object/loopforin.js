//Loop for in ... interagindo com um objeto.

const endereco = {
    bairro: "Jardim Satélite",
    rua: "Valdemar Vasconcelos",
    numero: 1623,
}

const pessoa = {
    nome: "Alexandre",
    sobrenome: "Fernandes",
    sexo: "Masculino",
    cpf: 44596895522,
}

for(let prop in pessoa){
    console.log(prop) //Retorna a váriavel ex: "nome", "sobrenome", "sexo" e "cpf".
    console.log(pessoa[prop])//Retorna a váriavel e valor: "nome", "Alexandre" etc...
}

