class Veiculo {
  constructor(marca, modelo, ano, cor, combustivel) {
    this.marca = marca;
    this.modelo = modelo;
    this.ano = ano;
    this.cor = cor;
    this.combustivel = combustivel;
  }

  expoInfo() {
    console.log(
      `       Marca: ${this.marca} 
       Modelo: ${this.modelo} 
       Ano: ${this.ano} 
       Cor: ${this.cor} 
       Combustivel: ${this.combustivel}`
    );
  }
}

let carro1 = new Veiculo("Ford", "Ka", 2013, "Preto", "Flex");
let carro2 = new Veiculo("Chevrolet", "Prisma", 2012, "Cinza Orion", "Flex");
let carro3 = new Veiculo("Chevrolet", "Celta", 2007, "Preto", "Flex");
let carro4 = new Veiculo("Volkswagem", "Gol", 1992, "Verde", "Gasolina");

console.log(carro1.expoInfo());
console.log(carro2.expoInfo());
console.log(carro3.expoInfo());
console.log(carro4.expoInfo());
