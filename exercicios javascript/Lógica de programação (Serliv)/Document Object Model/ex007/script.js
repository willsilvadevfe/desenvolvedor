let x = 2

switch(typeof x){
    case "boolean":
        alert('O tipo de variável digitada é: Boolean.')
    break
    case "string":
        alert('O tipo de variável digitada é: String. ')
    break
    case "number":
        alert('O tipo de variável digitada é: Número. ')
    break
    case "undefined":
        alert('O tipo de variável digitada é: Indefinido. ')
    break
    default: 
        alert('O tipo de variável digitado não foi reconhecido.')
}