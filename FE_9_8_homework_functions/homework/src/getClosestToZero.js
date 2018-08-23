function getClosestToZero() {
    let min = arguments[0];
     for(let i = 0; i < arguments.length; i++) {
         if(Math.abs(min) > Math.abs(arguments[i])) {
             min = arguments[i];
         }
    }
    return min;
}