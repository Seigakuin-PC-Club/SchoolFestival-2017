const SnakeGame = (() => {
	let ctx = null,
		looper = null;

	/**
	 * @param {Number} [frameSize=Math.min(DOM.width, DOM.height)]
	 * @param {Number} [split=20]
	 * @param {SnakeGame.Util.Color} [backColor=new SnakeGame.Util.Color()]
	 * @param {SnakeGame.Util.Color} [fontColor=new SnakeGame.Util.Color(255, 255, 255)]
	 */
	function SnakeGame (frameSize = Math.min(DOM.width, DOM.height), split = 20, backColor = new SnakeGame.Util.Color(), fontColor = new SnakeGame.Util.Color(255, 255, 255)) {
		this.snake = new SnakeGame.Snake(),
		this.foods = new SnakeGame.FoodCollection();

		this.width = this.height = frameSize,
		this.panelWidth = this.panelHeight = frameSize / split,
		this.split = split,

		this.option.backColor = backColor,
		this.option.fontColor = fontColor;

		let cvs = DOM("Canvas", {
			id: "SnakeGame",

			attributes: {
				width: frameSize,
				height: frameSize
			}
		}); ctx = cvs.getContext("2d");
			ctx.font = `${this.panelWidth}px Sans-Serif`;

		document.body.appendChild(cvs);



		this.snake.push(new SnakeGame.SnakeHead(split / 2, split / 2));
		this.fillFood();
		
		looper = setInterval((() => {
			let x = this.snake[0].x,
				y = this.snake[0].y;

			switch (this.option.currentKey) {
				default:
					this.draw();
					return;

				case 37:
					x--;
					break;

				case 39:
					x++;
					break;

				case 38:
					y--;
					break;

				case 40:
					y++;
					break;
			}

			if (this.snake.isHit(x, y) || (x < 0 || x >= this.split) || (y < 0 || y >= this.split)) {
				this.draw();
				clearInterval(looper);

				return;
			}

			this.snake.unshift(new SnakeGame.SnakeBody(x, y));

			if (this.foods.isHit(x, y)) {
				this.score += this.option.addedScore;
				this.moveFood(this.foods.isHit(x, y));
			} else {
				this.snake.pop();
			}

			this.draw();
		}).bind(this), 100);

		window.addEventListener("keydown", (res) => {
			switch (res.keyCode) {
				case 37:
					(this.option.currentKey == 39 && this.snake.length > 1) || (this.option.currentKey = res.keyCode);
					break;

				case 39:
					(this.option.currentKey == 37 && this.snake.length > 1) || (this.option.currentKey = res.keyCode);
					break;

				case 38:
					(this.option.currentKey == 40 && this.snake.length > 1) || (this.option.currentKey = res.keyCode);
					break;

				case 40:
					(this.option.currentKey == 38 && this.snake.length > 1) || (this.option.currentKey = res.keyCode);
					break;
			}
		});
	}; SnakeGame.prototype = Object.create(null, {
		constructor: { value: SnakeGame },

		snake: { value: [], configurable: true, writable: true, enumerable: true },
		foods: { value: [], configurable: true, writable: true, enumerable: true },
		score: { value: 0, configurable: true, writable: true, enumerable: true },

		width: { value: 0, configurable: true, writable: true, enumerable: true },
		height: { value: 0, configurable: true, writable: true, enumerable: true },
		panelWidth: { value: 0, configurable: true, writable: true, enumerable: true },
		panelHeight: { value: 0, configurable: true, writable: true, enumerable: true },
		split: { value: 0, configurable: true, writable: true, enumerable: true },

		option: {
			value: {
				addedScore: 0,
				currentKey: 0,

				backColor: null,
				fontColor: null,
			}
		},

		addFood: {
			value (xRange = 0, yRange = 0) {
				while (true) {
					let x = Math.random.randomInt(xRange),
						y = Math.random.randomInt(yRange);
						
					if (this.snake.isHit(x, y) || this.foods.isHit(x, y)) continue;

					this.foods.push(new SnakeGame.Food(x, y));
					break;
				}
			}
		},

		fillFood: {
			value () {
				let amount = this.foods.maxAmount - this.foods.length;

				for (let i = 0; i < amount; i++) {
					this.addFood(this.split, this.split);
				}
			}
		},

		moveFood: {
			value (food = new SnakeGame.Food()) {
				let foods = this.foods.filter(elem => {
					return (elem.x != food.x || elem.y != food.y);
				});

				this.foods = new SnakeGame.FoodCollection(this.foods.maxAmount);
				
				foods.forEach(elem => {
					this.foods.push(elem);
				});

				this.addFood(this.split, this.split);
			}
		},

		draw: {
			value () {
				ctx.fillStyle = this.option.backColor.toString();
				ctx.fillRect(0, 0, this.width, this.height);

				ctx.fillStyle = this.option.fontColor.toString();
				ctx.fillText(this.score, this.panelWidth, this.panelHeight * 2);

				this.foods.forEach(food => {
					ctx.fillText("◯", this.panelWidth * food.x, this.panelHeight * (food.y + 1));
				});

				this.snake.forEach(part => {
					if (part instanceof SnakeGame.SnakeHead) {
						ctx.fillText("@", this.panelWidth * part.x, this.panelHeight * (part.y + 1));
					} else if (part instanceof SnakeGame.SnakeBody) {
						ctx.fillText("◇", this.panelWidth * part.x, this.panelHeight * (part.y + 1));
					}
				});
			}
		},
	}); Object.defineProperties(SnakeGame, {
		Substance: {
			value: (() => {
				/**
				 * @param {Number} [x=0]
				 * @param {Number} [y=0]
				 */
				function Substance (x = 0, y = 0) {
					this.x = x,
					this.y = y;
				}; Substance.prototype = Object.create(null, {
					constructor: { value: Substance },

					x: { value: 0, configurable: true, writable: true, enumerable: true },
					y: { value: 0, configurable: true, writable: true, enumerable: true }
				});

				return Substance;
			})()
		}
	}); Object.defineProperties(SnakeGame, {
		Snake: {
			value: (() => {
				function Snake (maxLength = 15) {
					let self = Reflect.construct(Array, [], Snake);
						self.maxLength = maxLength;

					return self;
				}; Snake.prototype = Object.create(Array.prototype, {
					constructor: { value: Snake },

					maxLength: { value: 0, configurable: true, writable: true, enumerable: true },

					isHit: {
						value (x = 0, y = 0) {
							for (let i = 0; i < this.length; i++) {
								if (this[i].x == x && this[i].y == y) return this[i];
							}

							return false;
						}
					}
				});

				return Snake;
			})()
		},

		SnakeHead: {
			value: (() => {
				function SnakeHead () {
					SnakeGame.Substance.apply(this, arguments);
				}; SnakeHead.prototype = Object.create(SnakeGame.Substance.prototype, {
					constructor: { value: SnakeHead },

					direction: { value: null, configurable: true, writable: true, enumerable: true }
				});

				return SnakeHead;
			})()
		},

		SnakeBody: {
			value: (() => {
				function SnakeBody () {
					SnakeGame.Substance.apply(this, arguments);
				}; SnakeBody.prototype = Object.create(SnakeGame.Substance.prototype, {
					constructor: { value: SnakeBody }
				});

				return SnakeBody;
			})()
		},

		FoodCollection: {
			value: (() => {
				function FoodCollection (maxAmount = 10) {
					let self = Reflect.construct(Array, [], FoodCollection);
						self.maxAmount = maxAmount;

					return self;
				}; FoodCollection.prototype = Object.create(Array.prototype, {
					constructor: { value: FoodCollection },
					
					maxAmount: { value: 0, configurable: true, writable: true, enumerable: true },
					
					isHit: {
						value (x = 0, y = 0) {
							for (let i = 0; i < this.length; i++) {
								if (this[i].x == x && this[i].y == y) return this[i];
							}

							return false;
						}
					}
				});

				return FoodCollection;
			})()
		},

		Food: {
			value: (() => {
				function Food (x, y) {
					SnakeGame.Substance.apply(this, arguments);
				}; Food.prototype = Object.create(SnakeGame.Substance.prototype, {
					constructor: { value: Food }
				});

				return Food;
			})()
		},

		Util: {
			get () {
				return {
					Color: (() => {
						function Color (r = 0, g = 0, b = 0) {
							this.red = r,
							this.green = g,
							this.blue = b;
						}; Color.prototype = Object.create(null, {
							constructor: { value: Color },
		
							red: { value: 0, configurable: true, writable: true, enumerable: true },
							green: { value: 0, configurable: true, writable: true, enumerable: true },
							blue: { value: 0, configurable: true, writable: true, enumerable: true },

							toString: {
								value () {
									return `RGB(${this.red}, ${this.green}, ${this.blue})`;
								}
							}
						});
		
						return Color;
					})()
				}
			}
		}
	});

	return SnakeGame;
})();