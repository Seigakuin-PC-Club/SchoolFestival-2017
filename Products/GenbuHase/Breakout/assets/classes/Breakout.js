const Breakout = (() => {
	let ctx = null;
	
	/**
	 * @param {Number} width
	 * @param {Number} height
	 */
	function Breakout (ball, flip, width = DOM.width, height = DOM.height) {
		this.ball = ball,
		this.flip = flip,
		this.width = width,
		this.height = height;

		this.blockManager = new Breakout.BlockManager();

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

		ball: { value: null, configurable: true, writable: true, enumerable: true },
		flip: { value: null, configurable: true, writable: true, enumerable: true },
		blockManager: { value: null, configurable: true, writable: true, enumerable: true },

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
				function Ball (radius = 5, option = { speed: 0, texture: null }) {
					this.radius = radius,
					this.speed = option.speed,
					this.texture = option.texture;
				}; Ball.prototype = Object.create(Breakout.Substance.prototype, {
					constructor: { value: Ball },

					radius: { value: 0, configurable: true, writable: true, enumerable: true },
					speed: { value: 0, configurable: true, writable: true, enumerable: true },
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
						}
					},

					update: {
						value (gameScreen) {
							if (this.x <= 0) {
								switch (this.state) {
									case Breakout.Ball.STATE.TO_LEFT_TOP:
										this.state = Breakout.Ball.STATE.TO_RIGHT_TOP;
										break;
					
									case Breakout.Ball.STATE.TO_LEFT_BOTTOM:
										this.state = Breakout.Ball.STATE.TO_RIGHT_BOTTOM;
										break;
								}
							} else if (this.x + this.radius >= gameScreen.width) {
								switch (this.state) {
									case Breakout.Ball.STATE.TO_RIGHT_TOP:
										this.state = Breakout.Ball.STATE.TO_LEFT_TOP;
										break;
					
									case Breakout.Ball.STATE.TO_RIGHT_BOTTOM:
										this.state = Breakout.Ball.STATE.TO_LEFT_BOTTOM;
										break;
								}
							} else if (this.y <= 0) {
								switch (this.state) {
									case Breakout.Ball.STATE.TO_LEFT_TOP:
										this.state = Breakout.Ball.STATE.TO_LEFT_BOTTOM;
										break;
					
									case Breakout.Ball.STATE.TO_RIGHT_TOP:
										this.state = Breakout.Ball.STATE.TO_RIGHT_BOTTOM;
										break;
								}
							} else if (this.y + this.radius >= gameScreen.height) {
								switch (this.state) {
									case Breakout.Ball.STATE.TO_LEFT_BOTTOM:
										this.state = Breakout.Ball.STATE.TO_LEFT_TOP;
										break;
					
									case Breakout.Ball.STATE.TO_RIGHT_BOTTOM:
										this.state = Breakout.Ball.STATE.TO_RIGHT_TOP;
										break;
								}
							}
					
					
					
							switch (this.state) {
								default:
									this.state = Breakout.Ball.STATE.TO_RIGHT_BOTTOM;
									this.move(this.speed, this.speed);
					
									break;
					
								case Breakout.Ball.STATE.TO_LEFT_TOP:
									this.move(-this.speed, -this.speed);
									break;
					
								case Breakout.Ball.STATE.TO_LEFT_BOTTOM:
									this.move(-this.speed, this.speed);
									break;
					
								case Breakout.Ball.STATE.TO_RIGHT_TOP:
									this.move(this.speed, -this.speed);
									break;
					
								case Breakout.Ball.STATE.TO_RIGHT_BOTTOM:
									this.move(this.speed, this.speed);
									break;
							}
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

		BlockManager: {
			value: (() => {
				function BlockManager () {

				}; BlockManager.prototype = Object.create(null, {
					constructor: { value: BlockManager },

					blocks: { value: [], configurable: true, writable: true, enumerable: true },

					put: {
						value (block) {
							this.blocks.push(block);
						}
					}
				});

				return BlockManager;
			})(),

			enumerable: true
		},

		Block: {
			value: (() => {
				function Block () {
					
				}; Block.prototype = Object.create(Breakout.Substance.prototype, {
					draw: {
						value (x = 0, y = 0, width = 0, height = 0) {
							this.x = x,
							this.y = y,
							this.width = width,
							this.height = height;

							if (this.texture instanceof Breakout.Color) {
								ctx.fillStyle = this.texture.toString();
								ctx.fillRect(this.x, this.y, this.width, this.height);
							} else if (this.texture instanceof Breakout.Texture) {
								ctx.drawImage(this.texture.image, this.x, this.y, this.width, this.texture.image.height * (this.width / this.texture.image.width));
							}
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
