const Breakout = (() => {
	let ctx = null;
	
	/**
	 * @param {Number} width
	 * @param {Number} height
	 * @param {Breakout.Color} background
	 * @param {Object} option
	 * @param {Breakout.Ball} option.ball
	 * @param {Breakout.Flip} option.flip
	 */
	function Breakout (width = DOM.width, height = DOM.height, background = new Breakout.Color(), option = {}) {
		ctx = DOM("#Breakout").getContext("2d");



		this.width = width,
		this.height = height,
		this.background = background;

		this.ball = option.ball,
		this.flip = option.flip,
		this.blockManager = new Breakout.BlockManager();

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
				ctx.fillRect(0, 0, this.width, this.height);



				if (this.background instanceof Breakout.Color) {
					ctx.fillStyle = this.background.toString();
					ctx.fillRect(0, 0, this.width, this.height);
				} else if (this.background instanceof Breakout.Texture) {
					let w = 0,
						h = 0,
						l = 0,
						t = 0;

					if (this.width > this.height) {
						w = this.width;
						h = this.background.image.height * (w / this.background.image.width);

						t = -(h - this.height) / 2;
					} else if (this.width < this.height) {
						h = this.height;
						w = this.background.image.width * (h / this.background.image.height);

						l = -(w - this.width) / 2;
					} else {
						w = h = this.width;
					}

					ctx.drawImage(this.background.image, l, t, w, h);
				}

				!this.blockManager || this.blockManager.update(this);
				!this.ball || this.ball.update(this);
				!this.flip || this.flip.update(this);
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
		BlockManager: {
			value: (() => {
				/**
				 * @param {Number} [xSize=8]
				 * @param {Number} [ySize=1]
				 */
				function BlockManager (xSize = 8, ySize = 1) {
					this.xSize = xSize,
					this.ySize = ySize;
				}; BlockManager.prototype = Object.create(null, {
					constructor: { value: BlockManager },
					
					blocks: { value: [], configurable: true, writable: true, enumerable: true },
					xSize: { value: 0, configurable: true, writable: true, enumerable: true },
					ySize: { value: 0, configurable: true, writable: true, enumerable: true },

					get: {
						value (x = 0, y = 0) {
							return this.blocks[y][x];
						}
					},

					put: {
						value (x = 0, y = 0, block) {
							if (x >= this.xSize || y >= this.ySize) throw new Error("The size is invalid.");

							this.blocks[y] || (this.blocks[y] = []);
							this.blocks[y][x] = block;
						}
					},

					fill: {
						value (texture) {
							for (let y = 0; y < this.ySize; y++) {
								for (let x = 0; x < this.xSize; x++) {
									this.put(x, y, new Breakout.Block(texture));
								}
							}
						}
					},

					update: {
						value (gameScreen) {
							for (let y = 0; y < this.ySize; y++) {
								for (let x = 0; x < this.xSize; x++) {
									let block = this.get(x, y);

									if (block) {
										let w = gameScreen.width / this.xSize;
										let h = (block.texture instanceof Breakout.Color) ? w / 4 : (block.texture instanceof Breakout.Texture) ? block.texture.image.height * (w / block.texture.image.width) : 0;

										block.draw(w * x, h * y, w, h);
									}
								}
							}
						}
					}
				});

				return BlockManager;
			})(),

			enumerable: true
		},

		Block: {
			value: (() => {
				function Block (texture = new Breakout.Color(255, 0, 0)) {
					this.texture = texture;
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
								ctx.drawImage(this.texture.image, this.x, this.y, this.width, this.height);
							}
						}
					}
				});

				return Block;
			})()
		},

		Ball: {
			value: (() => {
				/**
				 * @param {Number} [radius=5]
				 * @param {Number} [speed=5]
				 * @param {Breakout.Color} [texture=new Breakout.Color(255, 255, 255)]
				 */
				function Ball (radius = 5, speed = 5, texture = new Breakout.Color(255, 255, 255)) {
					this.radius = radius,
					this.speed = speed,
					this.texture = texture;
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
								ctx.drawImage(this.texture.image, this.x, this.y, this.radius * 2, this.radius * 2);
							}
						}
					},

					update: {
						value (gameScreen) {
							if (this.x - this.radius <= 0) {
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
							} else if (this.y - this.radius <= 0) {
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

		Flip: {
			value: (() => {
				function Flip () {
					
				}; Flip.prototype = Object.create(Breakout.Substance.prototype, {
					constructor: { value: Flip },

					draw: {
						value () {
							ctx.fillStyle = "RGB(128, 128, 128)";
							ctx.fillRect(this.x, this.y, this.width, this.height);
						}
					}
				});

				return Flip;
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
