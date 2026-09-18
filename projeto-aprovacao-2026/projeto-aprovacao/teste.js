const addFinalArray = document.getElementById("add-final-array");
const addInicioArray = document.getElementById("add-inicio-array");
const delUltimoArray = document.getElementById("deletar-ultimo-array");
const delPrimeiroArray = document.getElementById("deletar-primeiro-array");
const somarTodos = document.getElementById("reduce");
const deletar = document.getElementById("deletar");
const resultado = document.getElementById("resultado");
let num = document.getElementById("input-num").value;

let numeros = [];
let i = 0;

addFinalArray.addEventListener("click", () => {
  numeros.push(Number(document.getElementById("input-num").value));
  document.getElementById("input-num").value = "";
  document.getElementById("input-num").focus();
  console.log(numeros[i]);
  resultado.innerHTML = `<ul>${numeros}</ul>`;
  resultado.innerHTML += `Adicionado ao final do array.`;
  i++;
  console.log(numeros);
  console.log(i);
});

addInicioArray.addEventListener("click", () => {
  numeros.unshift(Number(document.getElementById("input-num").value));
  document.getElementById("input-num").value = "";
  document.getElementById("input-num").focus();
  resultado.innerHTML = `<ul>${numeros}</ul>`;
  resultado.innerHTML += `Adicionado ao inicio do array.`;
  i++;
  console.log(numeros);
  console.log(i);
});

delUltimoArray.addEventListener("click", () => {
  numeros.pop(document.getElementById("input-num").value);
  document.getElementById("input-num").value = "";
  document.getElementById("input-num").focus();
  console.log(numeros);
  resultado.innerHTML = `<ul>${numeros}</ul>`;
  resultado.innerHTML += `Deletando último elemento do array.`;
  if (numeros.length == 0) {
    resultado.innerHTML += `<ul>Todos os elementos dentro do Array foram apagados.</ul>`;
    console.log("Todos elementos do array foram apagados.");
  }
});

delPrimeiroArray.addEventListener("click", () => {
  numeros.shift(document.getElementById("input-num").value);
  document.getElementById("input-num").value = "";
  document.getElementById("input-num").focus();
  console.log(numeros);
  resultado.innerHTML = `<ul>${numeros}</ul>`;
  resultado.innerHTML += `Deletando primeiro elemento do array.`;
  if (numeros.length == 0) {
    resultado.innerHTML += `<ul>Todos os elementos dentro do Array foram apagados.</ul>`;
    console.log("Todos elementos do array foram apagados.");
  }
});

deletar.addEventListener("click", () => {
  numeros = [];
  resultado.innerHTML = `<p>Todos os elementos do array foram deletados</p>`;
  resultado.innerHTML += `${numeros}`;
});

somarTodos.addEventListener("click", () => {
  const total = numeros.reduce((acumulador, numero) => {
    return acumulador + numero;
  }, 0);
  console.log(total);
  resultado.innerHTML = `A soma dos valores é: ${total}`;
});
