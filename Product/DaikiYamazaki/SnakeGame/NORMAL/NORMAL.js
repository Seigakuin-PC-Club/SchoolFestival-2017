let W = 20,
	H = 20,
	S = 20;
let snake = [],
	foods = [];


let keyCode = 0;
let point = 0;
let timer;
let speed = 200;
let ctx;
let playing = false;
let direction;
let moving = "";
const fruits = ["🍎", "🍌", "🍒", "💀"];



onload = init;

//Point Object
class Point {

	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

class Food extends Point {
	constructor(x, y, rnd) {
		super(x, y);
		// this.x = x;
		// this.y = y;
		this.rnd = rnd;
	}
}

//init
function init() {
	const canvas = document.getElementById('field');
	if (canvas instanceof HTMLCanvasElement) {
		W = canvas.clientHeight / S;
		H = canvas.clientHeight / S;
		ctx = canvas.getContext('2d');
		ctx.font = "20px Arial";
	}
	// snake init
	snake.push(new Point(W / 2, H / 2)); // starts in middle
	// snake food
	for (let i = 0; i < 15; i++) {
		foods = addFood(foods, snake);
	}
	// speed = 200
	timer = setInterval("tick()", speed);
	onkeydown = keydown;

	playing = true;
}


//add food
function addFood(f, s) {
	while (true) {
		let x = Math.floor(Math.random() * W);
		let y = Math.floor(Math.random() * H);
		if (isHit(f, x, y) || isHit(s, x, y)) {
			continue;
		}
		let rnd = Math.floor(Math.random() * fruits.length);
		f.push(new Food(x, y, rnd));
		break;
	}
	return f;
}

// collision
function isHit(data, x, y) {
	for (let i = 0; i < data.length; i++) {
		if (data[i].x === x && data[i].y === y) {
			return true;
		}
	}
	return false;
}

function isHitFood(foods, x, y) {
	for (let i = 0; i < foods.length; i++) {
		if (foods[i].x === x && foods[i].y === y) {
			switch (true) {
				case foods[i].rnd === 0:
					return {
						hit: true,
						rnd: 0
					};
				case foods[i].rnd === 1:
					return {
						hit: true,
						rnd: 1
					};
				case foods[i].rnd === 2:
					return {
						hit: true,
						rnd: 2
					};
				case foods[i].rnd == 3:
					return {
						hit: true,
						rnd: 3
					};
				default:
					return;
			}
		}
	}

	return {};
}


function moveFood(f, x, y) {
	let filteredFood = f.filter(function (p) {
		return (p.x !== x || p.y !== y);
	});
	foods = addFood(filteredFood, snake);
}

function tick() {
	let x = snake[0].x; // snake[0] is the head snake point
	let y = snake[0].y;

	let directionX = 0;
	let directionY = 0;

	if (snake.length > 1) {
		let fx = snake[1].x; // after the head
		let fy = snake[1].y;

		directionX = x - fx;
		directionY = y - fy;
		direction = new Point(directionX, directionY);
		moving = checkDirection(direction);
		//console.log(checkDirection(direction));
	}


	switch (true) {
		case (keyCode == 37 && moving != 'R') || (keyCode == 39 && moving == 'L'):
			x--
			break; // left
		case (keyCode == 38 && moving != 'D') || (keyCode == 40 && moving == 'U'):
			y--;
			break; // up
		case (keyCode == 39 && moving != 'L') || (keyCode == 37 && moving == 'R'):
			x++
			break; // right
		case (keyCode == 40 && moving != 'U') || (keyCode == 38 && moving == 'D'):
			y++;
			break; // down
		default:
			paint();
			return;
	}
	// you or wall collision
	if (isHit(snake, x, y) || x < 0 || x >= W || y < 0 || y >= H) {
		clearInterval(timer); // timer is setInterval("tick()", speed) (*speed is 200)
		paint();
		alert("スペースキーを押して再チャレンジ! 次はHARDにチャレンジしないかい?");
		playing = false;
		return;
	}

	// add to head
	snake.unshift(new Point(x, y));

	let hitFood = isHitFood(foods, x, y);

	if (hitFood.hit) {
		console.log(hitFood);
	}

	if (hitFood.hit) {
		switch (hitFood.rnd) {
			case 0:
				point += 50;
				break;
			case 1:
				point += 100;
				break;
			case 2:
				point += 200;
				break;
			case 3:
				point -= 100;
				break;
		}

		moveFood(foods, x, y); // move the eaten food to random pos
		if (speed >= 50) {
			speed -= 10;
			clearInterval(timer);
			timer = setInterval("tick()", speed);
		}
	} else {
		snake.pop(); // delete the last snake point
	}
	paint(); // clear canvas and point
}



function paint() {
	if (ctx instanceof CanvasRenderingContext2D) {
		ctx.clearRect(0, 0, W * S, H * S); // clear screen

		ctx.fillStyle = "rgb(256, 256, 256)"; // color for snake and food
		ctx.font = 'bold 20px MV Boli';

		foods.forEach(function (p) {
			if (ctx instanceof CanvasRenderingContext2D) {

				// TODO: Choose a random fruit
				let fruit = chooseFruit(p.rnd, fruits);
				ctx.fillText(fruit, p.x * S, (p.y + 1) * S);

			}
		});

		// ctx.drawImage(apple, 100, 100);
		// ctx.fillText("sldkfjsdlk", 200,200);


		ctx.font = 'bold 40px Arial';
		ctx.fillStyle = "rgb(6, 228, 80)";
		snake.forEach(function (p) {
			if (ctx instanceof CanvasRenderingContext2D) {
				ctx.fillText("●", (p.x * S), ((p.y + 1) * S));

			}
		});

		ctx.font = 'bold 25px MV Boli';
		ctx.fillStyle = "rgb(255,13,13)"; // font color for points
		ctx.fillText("POINT: " + point, S, (S * 2)); // write score

		ctx.fillStyle = "rgb(256,256,15)";
		ctx.fillText("SPEED: " + speed, S, (S * 4));
	}
}


function chooseFruit(num, fruits) {
	if (num < fruits.length) {
		return fruits[num];
	};
}

function checkDirection(direction) {
	if (direction.x == -1 && direction.y == 0) {
		return "L";
	} else if (direction.x == 0 && direction.y == -1) {
		return "U";
	} else if (direction.x == 1 && direction.y == 0) {
		return "R";
	} else {
		return "D";
	}
};

function keydown(event) {
	keyCode = event.keyCode;
	(keyCode);
	if (!playing) {
		if (keyCode == 32) {
			location.reload();
		}
	}
};