const SnakeGame = (() => {
	let ctx = null,
		looper = null;

	let snake = [],
		foods = [];

	/**
	 * @param {Number} [width=DOM.width]
	 * @param {Number} [height=DOM.height]
	 * @param {Number} [xSplit=20]
	 * @param {Number} [ySplit=20]
	 */
	function SnakeGame (width = DOM.width, height = DOM.height, xSplit = 20, ySplit = 20) {
		this.width = width,
		this.height = height,
		this.xSplit = xSplit,
		this.ySplit = ySplit,
		this.xSize = width / xSplit,
		this.ySize = height / ySplit;

		let cvs = DOM("Canvas", {
			id: "SnakeGame",

			attributes: {
				width: width,
				height: height
			}
		}); ctx = cvs.getContext("2d");

		document.body.appendChild(cvs);



		snake.push(new DOMPoint(this.xSize / 2, this.ySize / 2));
	}; SnakeGame.prototype = Object.create(null, {
		constructor: { value: SnakeGame },

		width: { value: 0, configurable: true, writable: true, enumerable: true },
		height: { value: 0, configurable: true, writable: true, enumerable: true },
		xSplit: { value: 0, configurable: true, writable: true, enumerable: true },
		ySplit: { value: 0, configurable: true, writable: true, enumerable: true },
		xSize: { value: 0, configurable: true, writable: true, enumerable: true },
		ySize: { value: 0, configurable: true, writable: true, enumerable: true },

		addFood: {
			value () {

			}
		}
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
				function Snake () {

				}; Snake.prototype = Object.create(null, {
					constructor: { value: Snake },

					head: { value: null, configurable: true, writable: true, enumerable: true },
					body: { value: [], configurable: true, writable: true, enumerable: true }
				});

				return Snake;
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