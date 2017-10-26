let base = new Breakout(DOM.width, DOM.height, new Breakout.Texture("assets/images/back.png"), {
	ball: new Breakout.Ball(15, 10, new Breakout.Texture("assets/images/ball.png"))
}); base.blockManager.fill(new Breakout.Texture("assets/images/atsumori.png"));

window.requestAnimationFrame(function Looper () {
	base.draw();

	window.requestAnimationFrame(Looper);
});