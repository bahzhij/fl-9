function* factorial(n) {
	let output = 1;

	for (let i = 1; i <= n; i++) {
		output *= i;

		yield output;
	}
}

for (let n of factorial(5)) {
	console.log(n);
}