let base = new Breakout();
	base.background = new Breakout.Color();

let ball = new Breakout.Ball(25);
	ball.speed = 10;
	ball.texture = new Breakout.Texture("assets/images/ball.png");

let blocks = [];

window.requestAnimationFrame(function Looper () {
	base.draw();
	ball.update(base);

	window.requestAnimationFrame(Looper);
});