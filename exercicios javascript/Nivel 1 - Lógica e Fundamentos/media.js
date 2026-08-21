let nota1 = 6;
let nota2 = 1;
let nota3 = 10;

let resultadoNota = (nota1 + nota2 + nota3) / 3;
let notaInt = parseInt(resultadoNota);
let notaAprovacao = 6;

if (resultadoNota >= notaAprovacao) {
  console.log(`Parabéns você foi aprovado na próxima etapa.`);
  console.log(`Suas notas foram, ${nota1}, ${nota2}, ${nota3}.`);
  console.log(`A média foi de ${notaInt}`);
} else {
  console.log(`Infelizmente você foi reprovado para a próxima etapa.`);
  console.log(`Suas notas foram, ${nota1}, ${nota2}, ${nota3}.`);
  console.log(`A média foi de ${notaInt}`);
}
