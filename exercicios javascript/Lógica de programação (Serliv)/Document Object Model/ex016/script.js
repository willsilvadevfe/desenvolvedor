/* Mostre na tela todos os anos bissextos segundo a regra do mundo real (procure na internet como saber se o ano é bissexto ou não). Utilize os controladores de fluxo BREAK e/ou CONTINUE caso queira (opcional) */

for(let ano = 1004; ano <= 2024 ; ano+=4){
    let anoBissexto = ano % 100 != 0 || ano % 400 === 0

    if(anoBissexto){
    console.log(`${ano} Ano bissexto detectado...`)
}else{
    console.log(`${ano} Não é bissexto!`)
}}




