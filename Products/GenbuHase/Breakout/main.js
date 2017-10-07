let base = new Breakout(
	new Breakout.Ball(25, {
		speed: 10,
		texture: new Breakout.Texture("assets/images/ball.png")
	})
);	base.background = new Breakout.Color();

let blocks = [];

for (let i = 0; i < 8; i++) {
	blocks[i] = new Breakout.Block();
	blocks[i].texture = new Breakout.Texture("assets/images/atsumori.png");
}

window.requestAnimationFrame(function Looper () {
	base.draw();
	for (let i = 0; i < blocks.length; i++) blocks[i].draw(base.width / blocks.length * i, 0, base.width / blocks.length);

	base.ball.update(base);

	window.requestAnimationFrame(Looper);
});