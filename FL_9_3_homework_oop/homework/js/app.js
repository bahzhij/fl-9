function Product(name, description, price) {
    if (typeof name === 'string' && name.trim().length !== 0) {
        this.name = name;
    } else {
        console.log('ERROR: product name cannot be empty');

        return;
    }

    if (typeof description === 'object') {
        this.description = JSON.stringify(description);
    } else {
        console.log('ERROR: product description must be object');

        return;
    }

    if (typeof price === 'number' && !isNaN(price) && isFinite(price) && price > 0) {
        this.price = price;
    } else {
        console.log('ERROR: price must be number greater than zero');

        return;
    }

    const _logs = [];
    let _currentCart = '';

    this.getPrice = function() {
        return this.price;
    };

    this.setPrice = function(newPrice) {
		if (typeof newPrice === 'number' && !isNaN(newPrice) 
			&& isFinite(newPrice) && newPrice > 0 && newPrice > this.price) {
            _logs.push(`change price from ${this.price} to ${newPrice}`);
            this.price = newPrice;
        } else {
            _logs.push(`try to change price from ${this.price} to ${newPrice}`);
        }

        return this;
    };

    this.add = function(shoppingCart) {
        if (shoppingCart instanceof ShoppingCart) {
            _currentCart = shoppingCart.name;
            _logs.push(`${this.name} was added to ${_currentCart} on ${new Date().toLocaleString()}`);
        }

        return this;
    };

    this.removeProduct = function(shoppingCart) {
        if (shoppingCart instanceof ShoppingCart) {
            _logs.push(`${this.name} was removed from ${_currentCart} on ${new Date().toLocaleString()}`);
            _currentCart = '';
        }
    };

    this.getHistory = function() {
        return _logs;
    };
}

function ShoppingCart(name, owner, maxCount) {
    if (typeof name === 'string' && name.trim().length !== 0) {
        this.name = name;
    } else {
        console.log('ERROR: shopping cart name cannot be empty');

        return;
    }
    if (typeof owner === 'string' && owner.trim().length !== 0) {
        this.owner = owner;
    } else {
        console.log('ERROR: owner name cannot be empty');

        return;
    }
    if (typeof maxCount === 'number' && !isNaN(maxCount) && isFinite(maxCount) && maxCount > 0) {
        this.maxCount = maxCount;
    } else {
        console.log('ERROR: maximum count of products inside the cart must be number greater than zero');

        return;
    }

    const _products = [];
    const _logs = [`${this.name} was created on ${new Date().toLocaleString()}`];

    this.addNewProduct = function(product) {
        if (product instanceof Product) {
            if (_products.length !== this.maxCount) {
                if (_products.includes(product)) {
                    this.removeProduct(product)
                }
                _products.push(product);
            } else {
                let lowestPrice = _products[0].price;
                let index;
                for (let i = 0; i < _products.length; i++) {
                    if (lowestPrice > _products[i].price) {
                        lowestPrice = _products[i].price;
                        index = i;
                    }
                }
                _products.splice(index, 1);
                if (_products.includes(product)) {
                    this.removeProduct(product)
                }
                _products.push(product);
            }
            product['dateOfAddingToCart'] = new Date().toLocaleString();
            product.add(this);
            _logs.push(`${product.name} was added to ${this.name} on ${product['dateOfAddingToCart']}`);
        } else {
            console.log('ERROR: only instance of Product can be added to cart');
        }

        return this;
    };

    this.removeProduct = function(product) {
        if (product instanceof Product) {
            _logs.push(`${product.name} was removed from ${this.name} on ${new Date().toLocaleString()}`);
            let productIndex = _products.indexOf(product);
            _products.splice(productIndex, 1);
            product.removeProduct(this);
        } else {
            console.log('ERROR: only instance of Product can be removed from cart');
        }

        return this;
    };

    this.getAvaragePrice = function() {
        let sum = 0;
        _products.forEach(function(product) {
            sum += product.getPrice();
        });
        return (sum / _products.length).toFixed(2);
    };

    this.getProducts = function() {
        return _products;
    };

    this.getFormattedListOfProducts = function() {
        return this.getProducts().map(product =>
            `${product.name} - is on ${this.name} from ${product['dateOfAddingToCart']}.\
			Detailed product description: ${product.description}`);
    };

    this.getTotalPrice = function() {
        let total = 0;
        _products.forEach(function(product) {
            total += product.getPrice();
        });
        return total;
    };

    this.getHistory = function() {
        return _logs;
    };
}

// CODE EXAMPLE

const pineapple = new Product('pineapple', {
    color: 'yellow',
    size: 'big'
}, 120);
const apple = new Product('apple', {
    color: 'green',
    size: 'medium'
}, 10);
const lemon = new Product('lemon', {
    color: 'yellow',
    size: 'small'
}, 15);
const cherry = new Product('cherry', {
    color: 'red',
    size: 'small'
}, 4);
const banana = new Product('banana', {
    color: 'yellow',
    size: 'medium'
}, 45);
const melon = new Product('melon', {
    color: 'yellow',
    size: 'big'
}, 67);

const stevesShopCart = new ShoppingCart('stevesCart', 'Steve', 5);
stevesShopCart
    .addNewProduct(apple)
    .addNewProduct(apple)
    .addNewProduct(pineapple)
    .removeProduct(apple)
    .addNewProduct(lemon)
    .addNewProduct(apple)
    .addNewProduct(cherry)
    .addNewProduct(melon)
    .addNewProduct(banana);

console.log('Cart log:', stevesShopCart.getHistory(), 'Product log:', apple.getHistory());
console.log(`Currently in Steve's cart:`, stevesShopCart.getProducts());
lemon.setPrice(5);
lemon.setPrice(16);
console.log('lemon price:', lemon.getPrice());
console.log(lemon.getHistory());
console.log(`Steve's shopping cart average price:`, stevesShopCart.getAvaragePrice());
console.log(`Steve's shopping cart total price:`, stevesShopCart.getTotalPrice());
stevesShopCart.addNewProduct('apple string');
console.table(stevesShopCart.getFormattedListOfProducts());