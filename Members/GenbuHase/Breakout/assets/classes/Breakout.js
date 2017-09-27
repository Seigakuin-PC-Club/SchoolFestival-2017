const Breakout = (() => {
	function Breakout (view, width, height) {
		this.width = width || DOM.width,
		this.height = height || DOM.height;

		this.cvs = DOM("Canvas", {
			id: "Breakout",

			attributes: {
				"width": this.width,
				"height": this.height
			}
		}); this.ctx = this.cvs.getContext("2d");

		(view || document.body).appendChild(this.cvs);
	}; Breakout.prototype = Object.create(Function.prototype, {
		constructor: { value: Breakout },

		cvs: { value: null, configurable: true, writable: true },
		ctx: { value: null, configurable: true, writable: true },

		width: { value: null, configurable: true, writable: true, enumerable: true },
		height: { value: null, configurable: true, writable: true, enumerable: true },

		init: {
			value () {
				this.ctx.fillStyle = "RGB(0, 0, 0)";
				this.ctx.fillRect(0, 0, this.width, this.height);
			}
		}
	});

	return Breakout;
})();