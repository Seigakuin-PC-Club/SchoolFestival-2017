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
					texture: { value: null, configurable: true, writable: true, enumerable: true }
				}); Object.defineProperties(Substance, {
					Ball: {
						value: (() => {
							function Ball () {
								
							}; Ball.prototype = Object.create(Substance.prototype, {
								constructor: { value: Ball },

								radius: { value: 0, configurable: true, writable: true, enumerable: true },

								move: {
									value (dx = 0, dy = 0) {
										this.x += dx,
										this.y += dy;

										ctx.beginPath();
										ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);

										ctx.fillStyle = "RGB(128, 128, 128)";
										ctx.fill();
									}
								},

								draw: {
									value (x, y, radius) {
										ctx.beginPath();
										ctx.arc(x, y, radius, 0, Math.PI * 2, true);

										ctx.fillStyle = "RGB(128, 128, 128)";
										ctx.fill();
									}
								}
							});

							return Ball;
						})()
					},

					Block: {
						value: (() => {
							function Block () {
								
							}; Block.prototype = Object.create(Substance.prototype, {
								draw: {
									value () {
										ctx.fillStyle = "RGB(128, 128, 128)";
										ctx.fillRect(this.x, this.y, this.width, this.height);
									}
								}
							});

							return Block;
						})()
					},

					Frip: {
						value: (() => {
							function Frip () {
								
							}; Frip.prototype = Object.create(Substance.prototype, {
								draw: {
									value () {
										ctx.fillStyle = "RGB(128, 128, 128)";
										ctx.fillRect(this.x, this.y, this.width, this.height);
									}
								}
							});

							return Frip;
						})()
					}
				});

				return Substance;
			})()
		},

		Color: {
			value: (() => {
				function Color (red = 0, green = 0, blue = 0) {
					this.r = red,
					this.g = green,
					this.b = blue;
				}; Color.prototype = Object.create(null, {
					constructor: { value: Color },

					r: { value: 0, configurable: true, writable: true, enumerable: true },
					g: { value: 0, configurable: true, writable: true, enumerable: true },
					b: { value: 0, configurable: true, writable: true, enumerable: true },

					toString: {
						value () {
							return `RGB(${this.r}, ${this.g}, ${this.b})`;
						}
					}
				});

				return Color;
			})()
		},

		Texture: {
			value: (() => {
				function Texture (url = "") {
					this.src = url,
					this.image = new Image(url);
				}; Texture.prototype = Object.create(null, {
					constructor: { value: Texture },

					src: { value: "", configurable: true, writable: true, enumerable: true },
					image: { value: new Image(), configurable: true, writable: true, enumerable: true }
				});

				return Texture;
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
