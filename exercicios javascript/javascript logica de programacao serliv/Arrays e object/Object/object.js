class Produto {
  constructor(nome, quantidade) {
    this.nome = nome;
    this.quantidade = quantidade;
  }
  comprar(qtd) {
    this.quantidade -= qtd;
  }

  adicionar(qtd) {
    this.quantidade += qtd;
  }
}

const p01 = new Pessoa("caneta", 34);
const P02 = new Pessoa("lapis", 22);

console.log()
