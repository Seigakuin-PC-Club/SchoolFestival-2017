class Invader {
	constructor (cvs = DOM("Canvas"), frameSize = Math.min(window.innerWidth, window.innerHeight)) {
		this.score = 0,
		this.stage = 1,
		this.clock = 0,
		this.player = new Player();

		if (!cvs.parentNode) document.body.appendChild(cvs);

		cvs.applyProperties({
			attributes: {
				width: frameSize,
				height: frameSize
			}
		});

		this.ctx = cvs.getContext("2d");
	}

	draw () {
		this.clock++;

		if (this.aliens.length == 0) {
			if (this.clock > 100) {
				this.stage++;
				this.start();
			}

			return;
		}

		let hit = -1;
		
	}
}

class Chip {
	constructor (ctx, url = "null.png") {
		this.ctx = ctx,
		this.chipUrl = url;

		this.chipImage = new Image();
		this.chipImage.src = url;
	}

	draw () {
		let ctx = this.ctx;
			ctx.drawImage(this.chipImage, this.x || 0, this.y || 0);
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