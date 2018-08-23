function reverseNumber(n) {    
    let reversedVersion = parseInt(Math.abs(n).toString().split('').reverse().join(''));
    if(n < 0) {
        return -reversedVersion;
    } else {
        return reversedVersion;
    }
} 