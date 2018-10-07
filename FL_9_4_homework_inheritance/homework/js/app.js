//Task 1
function assign(target) {
	if (target === null) {
		throw new TypeError('Cannot convert undefined or null to object');
	}
	let result = Object(target);

	for (let i = 1; i < arguments.length; i++) {
		let source = arguments[i];
		if (source !== null) {
			for (let key in source) {
				if (Object.prototype.hasOwnProperty.call(source, key)) {
					result[key] = source[key];
				}
			}
		}
	}

	return result;
}

//Task 2
function Bot(object) {
	this.name = object.name;
	this.speed = object.speed;
	this.defaultSpeed = object.speed;
	this.x = object.x;
	this.y = object.y;
}

Bot.prototype.getSpeed = function() {
	return this.speed;
};

Bot.prototype.setSpeed = function(newSpeed) {
	this.speed = newSpeed;

	return this.speed;
};

Bot.prototype.getDefaultSpeed = function() {
	return this.defaultSpeed;
};

Bot.prototype.getCoordinates = function() {
	return { x: this.x, y: this.y };
};

Bot.prototype.setCoordinates = function(x, y) {
	this.x = x;
	this.y = y;
};

Bot.prototype.move = function(direction) {
	direction.toLowerCase();
	switch (direction) {
		case 'up':
			this.y += this.getSpeed();
			break;
		case 'down':
			this.y -= this.getSpeed();
			break;
		case 'left':
			this.x -= this.getSpeed();
			break;
		case 'right':
			this.x += this.getSpeed();
			break;
		default:
			console.log(
				'Wrong direction! Can accept 1 of 4 possible directions (up, down, left, right)'
			);
	}
};

Bot.prototype.showPosition = function() {
    return console.log(`I am ${this.constructor.name} '${this.name}'.\
    I am located at ${this.getCoordinates().x}:${this.getCoordinates().y}`);
};

function Racebot(object) {
	Bot.call(this, object);
	this.previousMove = null;
}

Racebot.prototype = Object.create(Bot.prototype);
Racebot.prototype.constructor = Racebot;

Racebot.prototype.move = function(direction) {
	if (this.previousMove === direction) {
		this.setSpeed(this.getSpeed() + 1);
	} else {
		this.setSpeed(this.getDefaultSpeed());
	}
	this.previousMove = direction;

	return Bot.prototype.move.call(this, direction);
};

function Speedbot(object) {
	Bot.call(this, object);
}

Speedbot.prototype = Object.create(Bot.prototype);
Speedbot.prototype.constructor = Speedbot;

Speedbot.prototype.prepareEngine = function() {
	this.setSpeed(this.getSpeed() + 2);
};

Speedbot.prototype.move = function(direction) {
	Bot.prototype.move.call(this, direction);
	if (this.getSpeed() > this.getDefaultSpeed()) {
		this.setSpeed(this.getSpeed() - 1);
	}
};