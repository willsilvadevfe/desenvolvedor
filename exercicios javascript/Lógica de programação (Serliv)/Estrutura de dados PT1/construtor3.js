class Produto {
  constructor(item, preco, tipo, validade) {
    this.item = item;
    this.preco = preco;
    this.tipo = tipo;
    this.validade = validade;
  }

  expoInfo() {
    console.log(`
        Item: ${this.item}
        Preço: ${this.preco}
        Tipo: ${this.tipo}
        Validade: ${this.validade}
        `);
  }
}

const item1 = new Produto("Azeite", 25.5, "Alimento", 2026);
const item2 = new Produto("Café", 18.99, "Alimento", 2027);
const item3 = new Produto("Papel Higienico", 12.99, "Higiene", 2032);
const item4 = new Produto("Refrigerante", 7.99, "Alimento", 2026);
const item5 = new Produto("Leite", 5.99, "Alimento", 2025);

console.log(item1.expoInfo());
console.log(item2.expoInfo());
console.log(item3.expoInfo());
console.log(item4.expoInfo());
console.log(item5.expoInfo());
