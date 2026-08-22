let valores = [10, 23, 34, 2, 45, 2];

let totalValores = valores.reduce((acumulador, preco) => {
  return acumulador + preco
}, 0);

console.log(totalValores)