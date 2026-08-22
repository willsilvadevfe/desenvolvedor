let idade = [12, 28, 11, 23, 12, 18, 17, 9];

let menorDeIdade = idade.filter((menor) => {
    if (menor < 18) {
        console.log(menor);
    }
});

