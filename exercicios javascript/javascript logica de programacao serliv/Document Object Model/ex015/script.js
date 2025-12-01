/*Mostre na tela os números de 0 á 100 ignorando os múltiplos de 10. Porém, a cada interação, sorteie um número de 1 à 100. Se o número mostrado for divisível pelo número sorteado, interrompa o loop */
let luck = parseInt(Math.random() * 100 + 1)
let num = 0

for(let i = 0; i <= 100; i++){
    if(i % 10 === 0){
        continue
    }
    console.log(i)
    let sorteio = parseInt(Math.random() * 100 + 1)
    console.log("sorteio", sorteio)

    if(i % sorteio === 0){
        break
    }
}