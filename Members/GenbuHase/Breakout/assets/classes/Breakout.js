const Breakout = (() => {
	let ctx = null;

	/**
	 * @param {Number} width
	 * @param {Number} height
	 */
	function Breakout (width, height) {
		this.width = width || DOM.width,
		this.height = height || DOM.height;

		ctx = DOM("#Breakout").getContext("2d");

		DOM("#Breakout").applyProperties({
			attributes: {
				width: this.width,
				height: this.height
			}
		});
	}; Breakout.prototype = Object.create(null, {
		constructor: { value: Breakout },

		Substance: {
			value: (() => {
				function Substance () {
					
				}; Substance.prototype = Object.create(null, {
					constructor: { value: Substance },

					x: { value: 0, configurable: true, writable: true, enumerable: true },
					y: { value: 0, configurable: true, writable: true, enumerable: true },
					width: { value: 0, configurable: true, writable: true, enumerable: true },
					height: { value: 0, configurable: true, writable: true, enumerable: true }
				}); Object.defineProperties(Substance, {
					Ball: {
						value: (() => {
							function Block () {
								
							};

							return Block;
						})()
					}
				});

				return Substance;
			})()
		},
		
		width: { value: 0, configurable: true, writable: true, enumerable: true },
		height: { value: 0, configurable: true, writable: true, enumerable: true },

		init: {
			value () {
				ctx.fillStyle = "RGB(0, 0, 0)";
				ctx.fillRect(0, 0, this.width, this.height);
			}
		}
	});

	return Breakout;
})();
