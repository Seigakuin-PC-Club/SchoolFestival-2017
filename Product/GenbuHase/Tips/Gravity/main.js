class ObjectManager extends Array {
	constructor () {
		super();
	}

	draw () {
		this.forEach(obj => {
			if (obj && obj.draw) obj.draw();
		});
	}
}

class Util {
	static get Gravity () {
		return [
			(t) => { return G * t },
			(t) => { return (1 / 2) * G * Math.pow(t, 2) },
			(y) => { return 2 * G * y }
		]
	}
}

class ObjectBase {
	constructor (x = 0, y = 0, color = "") {
		this.x = x,
		this.y = y,
		this.color = color;

		this.tick = 0;
	}

	draw () {
		this.tick++;

		ctx.fillStyle = this.color;
	}
}

class Ball extends ObjectBase {
	constructor (x = 0, y = 0, radius = 10, color = "RED") {
		super(x, y, color);

		this.radius = radius;
	}

	draw (v0x = 1, v0y = 1) {
		ObjectBase.prototype.draw.call(this);

		let t = this.tick / (1000 / TICK);

		this.x += v0x;
		this.y += -(v0y * t - Util.Gravity[1](t));

		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
		ctx.closePath();

		ctx.fill();
	}

	throw (v0 = 10, deg = 45) {
		let v0x = v0 * Math.cos(DOM.util.degToRad(deg)),
			v0y = v0 * Math.sin(DOM.util.degToRad(deg));

		let looper = setInterval(() => {
			this.draw(v0x, v0y);

			//if (this.y)
		}, TICK);
	}
}



const TICK = 50;
const BACKCOLOR = "BLACK";
const FONTCOLOR = "WHITE";
const G = 9.8;

let cvs = null,
	ctx = null;

let objects = new ObjectManager();



//y = (1 / 2) * g * Math.pow(t, 2)
window.addEventListener("DOMContentLoaded", () => {
	let frameSize = Math.min(DOM.width, DOM.height);

	cvs = DOM("#MainScreen");
	ctx = cvs.getContext("2d");

	cvs.applyProperties({
		attributes: {
			width: frameSize - 2,
			height: frameSize
		}
	});
});

setInterval(function Looper () {
	ctx.fillStyle = BACKCOLOR;
	ctx.fillRect(0, 0, cvs.getAttribute("width"), cvs.getAttribute("height"));

	//objects.draw();
}, TICK);