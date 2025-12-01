let valorHaste = 9.610;
let camadaCromo = 0.014;

const blendNitretado = valorHaste - 0.01;
const blendMilesimal = valorHaste;
const blendCentesimal = valorHaste + 0.005 - 0.05;

console.log(`Valor inserido: ${valorHaste}`);

console.log("----------------------------------------------------------------------------");
console.log(`Resultado para peça nitretada: ${blendNitretado}`);
console.log(`Cálcula considerando o cálculo: Diâmetro da haste acabado - 0.010.`);
console.log("----------------------------------------------------------------------------");

console.log("----------------------------------------------------------------------------");
console.log(`Resultado para peça com blend centesimal (não concorda): ${blendCentesimal - camadaCromo}`);
console.log(`Cálculo considerando o cálculo: Diâmetro da haste - cromo + 0.005 - 0.050.`);
console.log("----------------------------------------------------------------------------");

console.log("----------------------------------------------------------------------------");
console.log(`Resultado para peça com blend milesimal (concorda raio).`);
console.log(`Resultado para válvulas com stock 0.070 na operação 15S: ${(blendMilesimal - camadaCromo) + 0.070}`);
console.log(`Resultado para válvulas com stock 0.055 na operação 15S: ${(blendMilesimal - camadaCromo) + 0.055}`);
console.log(`Resultado para válvulas com stock 0.050 na operação 15S: ${(blendMilesimal - camadaCromo) + 0.050}`);
console.log(`Cálculo considerando o cálculo: Diâmetro da haste - cromo + 0.005 - 0.050.`);
console.log("----------------------------------------------------------------------------");

console.log("Controle dimensional por linhas:");
console.log("----------------------------------------------------------------------------");
console.log("Linha 01: Diâmetro da canaleta + diâmetro do blend/rebaixo + Comprimento face/canaleta.");
console.log("----------------------------------------------------------------------------");
console.log("Linha 02: Diâmetro da canaleta + diâmetro do blend/rebaixo + Comprimento face/canaleta.");
console.log("----------------------------------------------------------------------------");
console.log("Linha 03: Diâmetro da canaleta + diâmetro do blend/rebaixo + Comprimento canaleta/ponta.");
console.log("----------------------------------------------------------------------------");
console.log("Linha 04: Diâmetro da canaleta + diâmetro do blend/rebaixo + Comprimento canaleta/ponta.");
console.log("----------------------------------------------------------------------------");
console.log("Linha 05: Diâmetro da canaleta + diâmetro do blend/rebaixo + Comprimento face/canaleta + comprimento sede/canaleta.");
console.log("Atenção: Controle para 15PC após processo de nitretação, para peças cromadas exemplo XV6140 considerar:");
console.log("Diâmetro da canaleta + diâmetro do blend/rebaixo + Comprimento face/canaleta.");
console.log("----------------------------------------------------------------------------");





