const SnakeGame = (() => {
	let ctx = null,
		looper = null;

	/**
	 * @param {Number} [width=DOM.width]
	 * @param {Number} [height=DOM.height]
	 * @param {Number} [split=20]
	 */
	function SnakeGame (width = DOM.width, height = DOM.height, split = 20) {
		this.snake = new SnakeGame.Snake(),
		this.foods = Reflect.construct(SnakeGame.FoodCollection, [], SnakeGame.FoodCollection);

		this.width = width,
		this.height = height,
		this.split = split,
		this.xSize = width / split,
		this.ySize = height / split;

		let cvs = DOM("Canvas", {
			id: "SnakeGame",

			attributes: {
				width: width,
				height: height
			}
		}); ctx = cvs.getContext("2d");

		document.body.appendChild(cvs);



		this.snake.push(new SnakeGame.SnakeHead(this.split / 2, this.split / 2));
		this.fillFood();
		
		looper = setInterval(this.draw.bind(this), 200);
	}; SnakeGame.prototype = Object.create(null, {
		constructor: { value: SnakeGame },

		snake: { value: null, configurable: true, writable: true, enumerable: true },
		foods: { value: [], configurable: true, writable: true, enumerable: true },

		width: { value: 0, configurable: true, writable: true, enumerable: true },
		height: { value: 0, configurable: true, writable: true, enumerable: true },
		split: { value: 0, configurable: true, writable: true, enumerable: true },
		xSize: { value: 0, configurable: true, writable: true, enumerable: true },
		ySize: { value: 0, configurable: true, writable: true, enumerable: true },

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
				let memory = [];

				this.foods.forEach((elem, index) => {
					if (elem.x == food.x && elem.y == food.y) {
						memory.push(index);
					}
				});

				memory.forEach(index => {
					this.foods.splice()
				});

				this.addFood(this.split, this.split);
			}
		},

		draw: {
			value () {
				ctx.fillRect(0, 0, this.width, this.height);
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
					this.maxLength = maxLength;
				}; Snake.prototype = Object.create(null, {
					constructor: { value: Snake },

					head: { value: null, configurable: true, writable: true, enumerable: true },
					body: { value: [], enumerable: true },
					maxLength: { value: 0, configurable: true, writable: true, enumerable: true },

					push: {
						value (child) {
							if (!this.head) {
								this.head = child;
								return;
							}

							this.body.push(child);
						}
					},

					isHit: {
						value (x = 0, y = 0) {
							if (this.head.x == x && this.head.y == y) return true;

							for (let i = 0; i < this.body.length; i++) {
								if (this.body[i].x == x && this.body[i].y == y) return true;
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

		FoodCollection: {
			value: (() => {
				function FoodCollection (maxAmount = 10) {
					this.maxAmount = maxAmount;
				}; FoodCollection.prototype = Object.create(Array.prototype, {
					constructor: { value: FoodCollection },
					
					maxAmount: { value: 0, configurable: true, writable: true, enumerable: true },
					
					isHit: {
						value (x = 0, y = 0) {
							for (let i = 0; i < this.length; i++) {
								if (this[i].x == x && this[i].y == y) return true;
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
		}
	});

	return SnakeGame;
})();