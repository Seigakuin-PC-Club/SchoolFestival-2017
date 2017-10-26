class Invader {
	constructor (frameSize = Math.min(window.innerWidth, window.innerHeight)) {
		this.cvs.applyProperties({
			attributes: {
				width: frameSize,
				height: frameSize
			}
		});

		this.ctx = this.cvs.getContext("2d");
	}
	
	/**
	 * @memberof Invader
	 * @readonly
	 * 
	 * @type {HTMLCanvasElement}
	 */
	get cvs () { return DOM("#Invader") }
}

class Chip {
	constructor (ctx, url = "null.png") {
		this.ctx = ctx,
		this.url = url;

		this.image = new Image();
		this.image.src = url;
	}

	draw () {
		let ctx = this.ctx;
			ctx.drawImage(this.image, this.x || 0, this.y || 0);
	}
}

class Player extends Chip {
	constructor (ctx, option = {}) {
		super(ctx, Player.chipUrl);
	}

	static get chipUrl () { return "assets/images/player.png" }
}

class Enemy extends Chip {
	constructor (ctx, option = {}) {
		super(ctx, Enemy.chipUrl);
	}

	static get chipUrl () { return "assets/images/enemy.png" }
}

class Bullet extends Chip {
	constructor (ctx, option = {}) {
		super(ctx, Bullet.chipUrl);
	}

	static get chipUrl () { return "assets/images/bullet.png" }
}