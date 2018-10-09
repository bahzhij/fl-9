import Calculation from './modules_default_export_math.js';

let arg1 = process.argv[2];
let arg2 = process.argv[3];

console.log(Calculation.PI);
console.log(Calculation.sqrt(+arg1));
console.log(Calculation.square(+arg2));