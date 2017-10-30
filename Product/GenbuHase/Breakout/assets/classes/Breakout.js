class Breakout {
	/**
	 * @memberof Breakout
	 * 
	 * @param {Number} [frameSize=Math.min(window.innerWidth, window.innerHeight)]
	 * @param {Util.Color} [backColor=new Util.Color()]
	 * @param {Util.Color} [fontColor=new Util.Color(255, 255, 255)]
	 */
	constructor (frameSize = Math.min(window.innerWidth, window.innerHeight), backColor = new Util.Color(), fontColor = new Util.Color(255, 255, 255)) {
		this.cvs = DOM("Canvas");
		this.cvs.applyProperties({
			id: "Breakout",

			attributes: {
				width: frameSize,
				height: frameSize
			}
		});

		this.ctx = this.cvs.getContext("2d");

		this.frameSize = frameSize,
		this.backColor = backColor,
		this.fontColor = fontColor;

		this.paddle = new Paddle(),
		this.ball = new Ball(),
		this.blocks = new BlockCollection(8, 3);

		document.body.appendChild(this.cvs);

		this.timer = setInterval(() => {
			this.draw();
		});
	}

	draw () {
		let ctx = this.ctx;
			ctx.fillStyle = this.backColor.toString();
			ctx.fillRect(0, 0, this.frameSize, this.frameSize);

		this.blocks.forEach(block => {
			//block.draw();
		});
	}
}



class Substance {
	constructor (x = 0, y = 0, texture = new Util.Color()) {
		this.x = x,
		this.y = y,
		this.texture = texture;
	}
}

class Ball extends Substance {
	constructor (x = 0, y = 0, radius = 0, texture = new Util.Color(255)) {
		super(x, y, texture);

		this.radius = radius;
	}

	move () {
		this.x += this.dx,
		this.y += this.dy;
	}
}

class Paddle extends Substance {
	constructor () {
		super();
	}
}

class Block extends Substance {
	constructor (x = 0, y = 0, texture = new Util.Color(255)) {
		super(x, y, texture);
	}
}

class BlockCollection extends Array {
	constructor (xSize = 0, ySize = 0) {
		super(ySize);

		this.xSize = xSize,
		this.ySize = ySize;

		for (let y = 0; y < ySize; y++) {
			this[y] = new Array(xSize);
		}
	}

	get () {
		return this.blocks[y][x];
	}

	put (x = 0, y = 0, block = new Block(x, y)) {
		if (x >= this.xSize || y >= this.ySize) throw new Error("The size is invalid.");

		this[y] || (this[y] = []);
		this[y][x] = block;
	}

	fill (texture = new Util.Color(255, 128)) {
		for (let y = 0; y < this.ySize; y++) {
			for (let x = 0; x < this.xSize; x++) {
				this.put(x, y, new Block(x, y, texture));
			}
		}
	}

	forEach (callback) {
		Array.prototype.forEach.call(this, column => {
			column.forEach(callback);
		});
	}
}



class Util {
	static get Color () {
		return class Color {
			constructor (red = 0, green = 0, blue = 0) {
				this.r = red,
				this.g = green,
				this.b = blue;
			}

			toString () {
				return `RGB(${this.r}, ${this.g}, ${this.b})`;
			}
		}
	}
}