let precos = [10, 20, 50, 100];

const aumentar = precos.map((precos) => precos * 1.1);
console.log(aumentar);

//Desconto de 5 reais nos itens acima de 49 reais
const desconto = precos.filter((desc) => {
  if (desc >= 50) {
    desc -= 5;
    console.log(desc);
  }
});
