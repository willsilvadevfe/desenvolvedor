
for(let i = 1; i <= 100; i++){
    if(i % 3 == 0){
        console.log(`${i} Fizz (Múltiplo de 3)`)
        console.log('---------------------------')
    }if(i % 5 == 0){
        console.log(`${i} Buzz (Múltiplo de 5)`)
        console.log('---------------------------')
    }if(i % 3 == 0 && i % 5 == 0){
        console.log(`${i} FizzBuzz (Múltiplo de ambos)`)
        console.log('---------------------------')
    }
    
}