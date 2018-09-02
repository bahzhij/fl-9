function userCard(key) {
    const TAX = 0.005;

    let balance = 100,
        transactionLimit = 100,
        historyLogs = [];
    
    return {
        getCardOptions: function () {
            return {
                balance,
                transactionLimit,
                historyLogs,
                key
            };
        },

        putCredits: function (amount) {
            balance += amount;
            historyLogs.push({
                operationType: 'Received credits',
                credits: amount,
                operationTime: new Date().toLocaleString('en-GB')
            });
        },

        takeCredits: function (amount) {
            if (balance >= amount && transactionLimit >= amount) {
                balance -= amount;
                historyLogs.push({
                operationType: 'Withdrawal of credits',
                credits: amount,
                operationTime: new Date().toLocaleString('en-GB')
            });
            } else {
                console.log(`ERROR: Balance or transaction limit exceeded.`);
            }
        },

        setTransactionLimit: function (amount) {
            transactionLimit = amount;
            historyLogs.push({
                operationType: 'Transaction limit change',
                credits: amount,
                operationTime: new Date().toLocaleString('en-GB')
            });
        },

        transferCredits: function (amount, card) {
            let amountWithTax = amount + amount * TAX;

            if (balance >= amountWithTax && transactionLimit >= amountWithTax) {               
                this.takeCredits(amountWithTax);
                card.putCredits(amount);
            } else {
                console.log(`ERROR: Balance or transaction limit exceeded.`);
            }
        }
    };
}

class UserAccount {
    constructor(name) {
        this.name = name,
        this.cards = [],
        this.cardsLimit = 3;
    }

    addCard() {
        if (this.cards.length < this.cardsLimit) {
            this.cards.push(userCard(this.cards.length + 1))
        } else {
            console.log(`ERROR: Maximum amount of cards exceeded.`);
        }
    }

    getCardByKey(key) {
        return this.cards[key - 1];
      }
}