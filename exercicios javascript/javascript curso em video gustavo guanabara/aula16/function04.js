function fatorial(n){
    let fat = 1
    for(let v = n;v > 1; v--){
        fat *= v
    }
        return fat
}
 
console.log(fatorial(5))