//task 1
function findType(data) {
	return typeof data;
}

//task 2
function forEach(basicArray, func) {
	for (let i = 0; i < basicArray.length; i++) {
		func(basicArray[i]);
	}
}

//task 3
function map(basicArray, func) {
	let modifiedArray = [];
	forEach(basicArray, function(el) {
		modifiedArray.push(func(el));
	});
	return modifiedArray;
}

//task 4
function filter(basicArray, func) {
	let modifiedArray = [];
	forEach(basicArray, function(el) {
		if (func(el)) {
			modifiedArray.push(el);
		}
	});
	return modifiedArray;
}

//task 5
function getAdultAppleLovers(data) {
	return map(
		filter(data, function(el) {
			return el.favoriteFruit === 'apple' && el.age >= 18;
		}),
		function(el) {
			return el.name;
		}
	);
}

//task 6
function keys(basicArray) {
	let keysArray = [];
	for (let key in basicArray) {
		if (basicArray.hasOwnProperty(key)) {
			keysArray.push(key);
		}
	}
	return keysArray;
}

//task 7
function values(basicArray) {
	let valuesArray = [];
	for (let key in basicArray) {
		if (basicArray.hasOwnProperty(key)) {
			valuesArray.push(basicArray[key]);
		}
	}
	return valuesArray;
}

//task 8
function showFormattedDate(date) {
	const MONTH_NAMES = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	];
	return `It is ${date.getDate()} of ${
		MONTH_NAMES[date.getMonth()]
	}, ${date.getFullYear()};`;
}
