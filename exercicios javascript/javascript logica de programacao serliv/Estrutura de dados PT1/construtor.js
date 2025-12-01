class Filme {
  constructor(nome, ano, genero, nota) {
    this.nome = nome;
    this.ano = ano;
    this.genero = genero;
    this.nota = nota;
  }

  expoInfo() {
    console.log(
       `Filme: ${this.nome}, 
        Ano: ${this.ano},
        Genero: ${this.genero},
        Nota: ${this.nota}`
    );
  }
}

const filme1 = new Filme("Velozes e furiosos", 2001, "Corrida", 9.8);
const filme2 = new Filme("O resgate do soldado Ryan", 1998, "Guerra", 9.9);
const filme3 = new Filme("Titanic", 1999, "Drama", 9.7);
const filme4 = new Filme("Homen Aranha", 2002, "Ação", 8.9);

console.log(filme1.expoInfo());
console.log(filme2.expoInfo());
console.log(filme3.expoInfo());
console.log(filme4.expoInfo());
