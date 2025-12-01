const carro = {
    modelo: "Uno",
    ano: 2023,
    km: 10000,
    combustivel: "Gasolina",
    litrosConsumidos: 625
};

let mediaKmLitros = carro.km / carro.litrosConsumidos //Pode fazer a conta dentro do console.log: ${carro.km / carro.litrosConsumidos}.

console.log('---------- Exercicio 01 ----------')
console.log(`O veiculo ${carro.modelo} ${carro.ano} fez em média ${mediaKmLitros} KM/L com o combustível ${carro.combustivel}.`)

//Continuação do exercicio: Adicione a propriedade "marca" e mostre na tela:
//"O carro Fiat Uno ano 2023 fez em média xxx KM/L de gasolina."

carro.marca = "Fiat" //Objeto recebe marca: "Fiat".
//console.log(carro) //Verificando a entrada do novo indice.

console.log('')
console.log('---------- Exercicio 02 ----------')
console.log(`O carro ${carro.marca} ${carro.modelo} ano ${carro.ano} fez em média ${carro.km / carro.litrosConsumidos} KM/L de ${carro.combustivel}.`)

