const FRUITS = ["🍎", "🍌", "🍒", "💀", "👑", "☠"];
const SCORES = {
	EASY: [20, 50, 100],
	NORMAL: [50, 100, 200, -100],
	HARD: [100, 300, 500, -200],
	FEVER: [500, 700, 800, -500, 1000, -1000]
}
const COLORS = {
	EASY: { SNAKE: "RGB(6, 0, 234)", POINT: "RGB(255, 0, 0)", SPEED: "RGB(256, 256, 15)" },
	NORMAL: { SNAKE: "RGB(6, 228, 80)", POINT: "RGB(255, 13, 13)", SPEED: "RGB(256, 256, 15)" },
	HARD: { SNAKE: "RGB(255, 13, 13)", POINT: "RGB(256, 150, 150)", SPEED: "RGB(256, 256, 15)" },
	FEVER: { SNAKE: "RGB(0, 0, 0)", POINT: "RGB(256, 150, 150)", SPEED: "RGB(256, 256, 15)" }
}

const EASY = Symbol.for("EASY");
const NORMAL = Symbol.for("NORMAL");
const HARD = Symbol.for("HARD");
const FEVER = Symbol.for("FEVER");

const DB = new FirebasePlus({
	apiKey: "AIzaSyCOWO_FHZxCrf5pnM2WkQx4ySckpyPhsHE",
	authDomain: "seigpc-schoolfestival-2017.firebaseapp.com",
	databaseURL: "https://seigpc-schoolfestival-2017.firebaseio.com",
	projectId: "seigpc-schoolfestival-2017",
	storageBucket: "seigpc-schoolfestival-2017.appspot.com",
	messagingSenderId: "19065845746"
}, (user) => {
	DB.signInWithAnonymous();
});

const SOUNDS = (() => {
	let rnd = Math.floor(Math.random() * 2);

	return {
		DEATH: [
			new Audio(`assets/sounds/Death001_${rnd}.wav`),
			new Audio("assets/sounds/Death002.wav"),
			new Audio(`assets/sounds/Death001_${rnd}.wav`),
			new Audio("assets/sounds/Death003.wav")
		]
	}
})();

let W = 20,
	H = 20,
	S = 20;

let ctx;
let timer;
let keyCode = 0;
let moving = "";
let direction;

let snake = [],
	foods = [];

let difficulty = null;
let minSpeed = 0;
let perSpeed = 0;
let foodAmount = 0;
let useFruits = 0;
let gameoverMessage = "";

let point = 0;
let speed = 200;
let playing = false;



//Point Object
class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

class Food extends Point {
	constructor(x, y, rnd, point) {
		super(x, y);
		// this.x = x;
		// this.y = y;
		this.rnd = rnd;
		this.point = point;
	}
}

function init() {
	document.getElementById("Detail").classList.remove("hide");
	
	const canvas = document.getElementById('field');
	canvas.classList.remove("hide");
	canvas.classList.add(Symbol.keyFor(difficulty));

	if (canvas instanceof HTMLCanvasElement) {
		W = canvas.clientHeight / S;
		H = canvas.clientHeight / S;
		ctx = canvas.getContext('2d');
		ctx.font = "20px Arial";
	}
	// snake init
	snake.push(new Point(W / 2, H / 2)); // starts in middle
	// snake food
	for (let i = 0; i < foodAmount; i++) {
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

		let rnd = Math.floor(Math.random() * useFruits);
		f.push(new Food(x, y, rnd, SCORES[Symbol.keyFor(difficulty)][rnd]));
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
			return {
				hit: true,
				rnd: foods[i].rnd,
				point: foods[i].point
			};
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

		for (let i = 0; i < SOUNDS.DEATH.length; i++) {
			SOUNDS.DEATH[i].addEventListener("ended", () => {
				if (i + 1 < SOUNDS.DEATH.length) {
					SOUNDS.DEATH[i + 1].play();
				}
			});
		}

		SOUNDS.DEATH[0].play();

		document.querySelector("Dialog#NameInputer").showModal();
		document.querySelector("#NameInputer_Content").textContent = gameoverMessage;

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
		point += hitFood.point;

		moveFood(foods, x, y); // move the eaten food to random pos

		if (speed >= minSpeed) {
			speed -= perSpeed;
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

		ctx.fillStyle = "rgb(256, 256, 256)";
		ctx.font = 'bold 20px MV Boli';

		foods.forEach(function (p) {
			if (ctx instanceof CanvasRenderingContext2D) {

				// TODO: Choose a random fruit
				let fruit = FRUITS[p.rnd];
				ctx.fillText(fruit, p.x * S, (p.y + 1) * S);

			}
		});

		ctx.font = 'bold 40px Arial';
		ctx.fillStyle = COLORS[Symbol.keyFor(difficulty)].SNAKE;

		snake.forEach(function (p) {
			if (ctx instanceof CanvasRenderingContext2D) {
				ctx.fillText("●", (p.x * S), ((p.y + 1) * S));
			}
		});

		ctx.font = 'bold 25px MV Boli';
		ctx.fillStyle = COLORS[Symbol.keyFor(difficulty)].POINT; // font color for points
		ctx.fillText("POINT: " + point, S, (S * 2)); // write score

		ctx.fillStyle = COLORS[Symbol.keyFor(difficulty)].SPEED; // font color for score
		ctx.fillText("SPEED: " + speed, S, (S * 4));
	}
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

	if (!playing && !document.querySelector("Dialog#NameInputer").open) {
		if (keyCode == 32) {
			location.reload();
		}
	}
};



function showDialog () {
	document.querySelector("Dialog#ModeSelector").showModal();
}

function runGame() {
	let difficult = document.getElementById("ModeSelector_Mode").value;

	switch (difficult) {
		case "Easy":
			difficulty = EASY,
			minSpeed = 105,
			perSpeed = 5,
			foodAmount = 20,
			useFruits = 3,
			gameoverMessage = "スペースキーを押して再チャレンジ!\n次は、NORMALにチャレンジしないかい?";

			break;

		case "Normal":
			difficulty = NORMAL,
			minSpeed = 50,
			perSpeed = 10,
			foodAmount = 15,
			useFruits = 4,
			gameoverMessage = "スペースキーを押して再チャレンジ!\n次はHARDにチャレンジしないかい?";

			break;

		case "Hard":
			difficulty = HARD,
			minSpeed = 30,
			perSpeed = 15,
			foodAmount = 10,
			useFruits = 4,
			gameoverMessage = "スペースキーを押して再チャレンジ!\n次は、FEVERにチャレンジしないかい?";

			break;

		case "Fever":
			difficulty = FEVER,
			minSpeed = 35,
			perSpeed = 15,
			foodAmount = 100,
			useFruits = 6,
			gameoverMessage = "スペースキーを押して再チャレンジ!\n自己ベストを更新し続けよう!";

			break;
	}

	document.querySelector("Dialog#ModeSelector").close();
	init();
}

document.querySelector("#NameInputer_Btns_Submit").addEventListener("click", () => {
	if (!event.currentTarget.classList.contains("mdl-button--disabled")) {
		let data = DB.Database.push(`SnakeGame-DY/${Symbol.keyFor(difficulty)}/`, {
			name: document.querySelector("#NameInputer_Name-Input").value || "淫夢くん",
			score: point
		});

		DB.Database.setPriority(`SnakeGame-DY/${Symbol.keyFor(difficulty)}/${data.key}/`, -point);

		document.querySelector("#NameInputer").close();
		location.reload();
	}
});