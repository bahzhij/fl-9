let amount = parseFloat(prompt('Please enter price', '0'));
let discount = parseFloat(prompt('Please enter your discount', '0'));

let saved = amount / 100 * discount;
let priceDiscount = amount - saved;
let result;

if (
  isNaN(amount) ||
  isNaN(discount) ||
  amount <= 0 ||
  discount < 0 ||
  discount > 100
) {
  result = 'Invalid data!';
} else {
  result = `
    Price without discount: ${+parseInt(amount * 100) / 100} 
    Discount: ${+parseInt(discount * 100) / 100}%
    Price with discount: ${+parseInt(priceDiscount * 100) / 100}
    Saved: ${+parseInt(saved * 100) / 100}`;
}

console.log(result);

