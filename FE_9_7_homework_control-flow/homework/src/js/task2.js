let maxRange = 5,
    maxPrize = 10,
    attemptCounter = 1,
    prize = 10,
    rangeNumber = 5,
    totalPrize = 0,
    attempt,
    gamePrize,
    randomNumber;

if (confirm('Do you want to play a game?')) {
    start();
} else {
    alert('You did not become a millionaire, but can.');
}
function generateNumber(max) {
    randomNumber = Math.floor(Math.random() * max);

}
function guessingGame() {    
    //console.log(randomNumber);
    if (
        parseFloat(
            prompt(
                `Enter a number from 0 to ${rangeNumber}                
Attempts left: ${attempt}
Total prize: ${totalPrize}$
Possible prize on current attempt: ${gamePrize}$`
            )
        ) === randomNumber
    ) {
        totalPrize = totalPrize + gamePrize;
        if (
            confirm(`Congratulation!   
               Your prize is: ${totalPrize}$, Do you want to continue?`)
        ) {
            rangeNumber = rangeNumber * 2;
            prize = prize * 3;
            start();
        } else {
            alert(`Your prize is ${totalPrize}$`);
        }

    } else {
        attempt--;
        gamePrize = Math.floor(gamePrize / 2);
        if (attempt >= attemptCounter) {
            guessingGame();
        } else {
            alert(`Thank you for a game. Your prize is: ${totalPrize}$`);
            rangeNumber = maxRange;
            prize = maxPrize;
            totalPrize = 0;
            if (confirm('Do you want to play again')) {
                start();
            }
        }
    }
}

function start() {
    attempt = 3;
    gamePrize = prize;
    generateNumber(rangeNumber);
    guessingGame();
}