function Store(pizzaSlicePrice) {
  this.pizzaSlicePrice = Number(pizzaSlicePrice) || 47;
  this.weekendDiscount = 0;
  this.nightDiscount = 0;
  this.bonus = 0;

  this.buyPizzaSlice = function () {
    return `Price after discount is ${this.totalPrice()} and you have ${this.bonus} bonuses`;
  };

  this.totalPrice = function () {
    let discount = this.nightDiscount + this.weekendDiscount;
    let currentPrice = this.pizzaSlicePrice;
    currentPrice -= currentPrice * discount;

    return currentPrice;
  };
}

function getDiscount(store) {
  const orderHour = new Date().getHours();
  const orderDay = new Date().getDay();

  if (orderHour <= 6 || orderHour >= 23) {
    store.nightDiscount = 0.05;
  }
  if (orderDay === 6 || orderDay === 0) {
    store.weekendDiscount = 0.1;
  }

  store.totalPrice();
}

function setBonus(store) {
  store.bonus += Math.round(store.totalPrice() / 10);

  return store;
}

// code run example
const testStore = new Store();
console.log(testStore.buyPizzaSlice());
getDiscount(testStore);
setBonus(testStore);
console.log(testStore.buyPizzaSlice());
getDiscount(testStore);
setBonus(testStore);
console.log(testStore.buyPizzaSlice());