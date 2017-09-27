let base = null;

window.addEventListener("DOMContentLoaded", () => {
	base = new Breakout(DOM("$Body"), DOM.width, DOM.height);
	base.init();
});