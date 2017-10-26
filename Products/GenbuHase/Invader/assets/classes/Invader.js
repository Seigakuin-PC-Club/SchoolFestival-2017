class Invader {
	constructor (cvs = DOM("Canvas"), frameSize = Math.min(window.innerWidth, window.innerHeight)) {
		if (!cvs.parentNode) document.body.appendChild(cvs);

		cvs.applyProperties({
			attributes: {
				width: frameSize,
				height: frameSize
			}
		});

		this.ctx = cvs.getContext("2d");
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