class Breakout {
	/**
	 * @memberof Breakout
	 * 
	 * @param {Number} [frameSize=Math.min(window.innerWidth, window.innerHeight)]
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

		this.score = 0,
		this.ballAmount = 2,
		this.key = { left: false, right: false };

		this.frameSize = frameSize,
		this.backColor = backColor,
		this.fontColor = fontColor;

		this.paddle = new Paddle(),
		this.ball = new Ball(0, this.frameSize + 10, 10, 10, 10, 10),
		this.blocks = new BlockCollection(8, 3);

		document.body.appendChild(this.cvs);

		window.addEventListener("keydown", event => {
			this.toggleKey(event.keyCode, true);
		});

		window.addEventListener("keyup", event => {
			this.toggleKey(event.keyCode, false);
		});

		this.start();

		this.timer = setInterval(() => {
			this.draw();
		});
	}

	draw () {
		let ctx = this.ctx;
			ctx.fillStyle = this.backColor.toString();
			ctx.fillRect(0, 0, this.frameSize, this.frameSize);

		this.blocks.forEach(block => {
			block.draw(ctx);
		});

		this.paddle.draw(ctx);
		this.ball.draw(ctx);

		this.drawInfo();
	}

	drawInfo () {
		let ctx = this.ctx;
			ctx.font = '3vmin PixelMPlus12';
			ctx.fillStyle = this.fontColor.toString();
			ctx.fillText(this.score, this.frameSize / 10 * 9, this.frameSize / 20);

		if (isNaN(this.timer)) {
			ctx.fillText("GAME OVER", this.frameSize / 2, this.frameSize / 2);
		}
	}

	start () {
		this.blocks.fill(new Util.Texture("assets/images/atsumori.png"));
	}

	get isPlaying () {
		return this.ball.y < this.frameSize + this.ball.radius;
	}

	toggleKey (keyCode, flag) {
		switch (keyCode) {
			case 37:
				this.key.left = flag;
				break;

			case 39:
				this.key.right = flag;
				break;

			case 32:
				if (!this.isPlaying) {
					this.ball.x = this.paddle.x + this.paddle.width / 2,
					this.ball.y = this.paddle.y - this.ball.radius;

					this.ball.changeDir(Math.PI / 4 + Math.random() * Math.PI / 2);
				}

				break;
		}
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
	constructor (x = 0, y = 0, dx = 0, dy = 0, radius = 0, speed = 10, texture = new Util.Color(0, 255)) {
		super(x, y, texture);

		this.dx = dx,
		this.dy = dy,
		this.radius = radius,
		this.speed = speed;
	}

	move () {
		this.x += this.dx,
		this.y += this.dy;
	}

	changeDir (dir = 0) {
		this.dir = dir;

		this.dx = this.speed * Math.cos(dir),
		this.dy = -this.speed * Math.sin(dir);
	}

	draw (ctx) {
		if (this.texture.constructor instanceof Util.Color.constructor) {
			ctx.fillStyle = this.texture.toString();
			
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
			ctx.closePath();

			ctx.fill();
		} else if (this.texture.constructor instanceof Util.Texture.constructor) {
			ctx.drawImage(this.texture.img, this.x, this.y, this.radius * 2, this.radius * 2);
		}
	}
}

class Paddle extends Substance {
	constructor (x = 0, y = 0, width = 0, height = 0, texture = new Util.Color(0, 0, 255)) {
		super(x, y, texture);

		this.width = width,
		this.height = height;
	}

	draw (ctx) {
		if (this.texture.constructor instanceof Util.Color.constructor) {
			ctx.fillStyle = this.texture.toString();
			ctx.fillRect(this.x, this.y, this.width, this.height);
		} else if (this.texture.constructor instanceof Util.Texture.constructor) {
			ctx.drawImage(this.texture.img, this.x, this.y, this.width, this.texture.height * (this.width / this.texture.width))
		}
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
				this.put(x, y, new Block(x, y, 0, 0, texture));
			}
		}
	}

	forEach (callback) {
		Array.prototype.forEach.call(this, column => {
			column.forEach(callback);
		});
	}
}

class Block extends Substance {
	constructor (x = 0, y = 0, width = 0, height = 0, texture = new Util.Color(255)) {
		super(x, y, texture);

		this.width = width,
		this.height = height;
	}

	draw (ctx) {
		if (this.texture.constructor instanceof Util.Color.constructor) {
			ctx.fillStyle = this.texture.toString();
			ctx.fillRect(this.x, this.y, this.width, this.height);
		} else if (this.texture.constructor instanceof Util.Texture.constructor) {
			ctx.drawImage(this.texture.img, this.x, this.y, this.width, this.texture.height * (this.width / this.texture.width))
		}
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

	static get Texture () {
		return class Texture {
			constructor (url = "") {
				this.url = url;

				this.img = new Image();
				this.img.src = url;
			}

			get width () { return this.img.naturalWidth }
			get height () { return this.img.naturalHeight }
		}
	}
}