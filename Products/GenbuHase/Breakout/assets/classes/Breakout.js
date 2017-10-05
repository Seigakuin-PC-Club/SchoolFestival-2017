const Breakout = (() => {
	let ctx = null;

	/**
	 * @param {Number} width
	 * @param {Number} height
	 */
	function Breakout (width = DOM.width, height = DOM.height) {
		this.width = width,
		this.height = height;

		ctx = DOM("#Breakout").getContext("2d");

		DOM("#Breakout").applyProperties({
			attributes: {
				width: this.width,
				height: this.height
			}
		});
	}; Breakout.prototype = Object.create(null, {
		constructor: { value: Breakout },

		
		
		width: { value: 0, configurable: true, writable: true, enumerable: true },
		height: { value: 0, configurable: true, writable: true, enumerable: true },
		background: { value: null, configurable: true, writable: true, enumerable: true },

		draw: {
			value () {
				ctx.fillStyle = this.background ? this.background.toString() : new Breakout.Color().toString();
				ctx.fillRect(0, 0, this.width, this.height);
			}
		}
	}); Object.defineProperties(Breakout, {
		Substance: {
			value: (() => {
				function Substance () {
					
				}; Substance.prototype = Object.create(null, {
					constructor: { value: Substance },

					x: { value: 0, configurable: true, writable: true, enumerable: true },
					y: { value: 0, configurable: true, writable: true, enumerable: true },
					texture: { value: null, configurable: true, writable: true, enumerable: true }
				});

				return Substance;
			})()
		}
	}); Object.defineProperties(Breakout, {
		Ball: {
			value: (() => {
				function Ball (radius = 5) {
					this.radius = radius
				}; Ball.prototype = Object.create(Breakout.Substance.prototype, {
					constructor: { value: Ball },

					radius: { value: 0, configurable: true, writable: true, enumerable: true },
					state: { value: 0, configurable: true, writable: true, enumerable: true },

					move: {
						value (dx = 0, dy = 0) {
							this.x += dx,
							this.y += dy;

							ctx.beginPath();
							ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
							ctx.closePath();

							if (this.texture instanceof Breakout.Color) {
								ctx.fillStyle = this.texture.toString();
								ctx.fill();
							} else if (this.texture instanceof Breakout.Texture) {
								ctx.drawImage(this.texture.image, this.x, this.y, this.radius, this.radius);
							}

							ctx.fillStyle = new Breakout.Color().toString();
						}
					}
				}); Object.defineProperties(Ball, {
					STATE: {
						get () {
							return {
								TO_LEFT_TOP: 1,
								TO_LEFT_BOTTOM: 2,
								TO_RIGHT_TOP: 3,
								TO_RIGHT_BOTTOM: 4
							}
						},
			
						enumerable: true
					}
				});

				return Ball;
			})()
		},

		Block: {
			value: (() => {
				function Block () {
					
				}; Block.prototype = Object.create(Breakout.Substance.prototype, {
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
					
				}; Frip.prototype = Object.create(Breakout.Substance.prototype, {
					draw: {
						value () {
							ctx.fillStyle = "RGB(128, 128, 128)";
							ctx.fillRect(this.x, this.y, this.width, this.height);
						}
					}
				});

				return Frip;
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
					this.src = url;

					this.image = new Image();
					this.image.src = url;
				}; Texture.prototype = Object.create(null, {
					constructor: { value: Texture },

					src: { value: "", configurable: true, writable: true, enumerable: true },
					image: { value: new Image(), configurable: true, writable: true, enumerable: true }
				});

				return Texture;
			})()
		}
	});

	return Breakout;
})();
