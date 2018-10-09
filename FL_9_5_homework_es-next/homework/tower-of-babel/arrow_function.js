let inputs = process.argv.slice(2);
let result = inputs.map((x) => x[0])
                   .reduce((result, x) => (result + x).toUpperCase());
console.log(result);