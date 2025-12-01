const endereco = {
    bairro: "Conjunto residencial Galo Branco",
    logradouro: "Rua Benedito de Andrade",
    numero: 585,
}

const proprietario = {
    nome: "Waldir",
    sobrenome: "Rodrigues",
    sexo: "Masculino",
    endereco
}

console.log(`${proprietario.nome} ${proprietario.sobrenome} é proprietário da residencia que fica localizada em ${proprietario.endereco.bairro}, ${proprietario.endereco.logradouro} Nº${proprietario.endereco.numero}.`)