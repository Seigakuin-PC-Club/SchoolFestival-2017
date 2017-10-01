let base = new Breakout();
	base.background = new Breakout.Color();

let ball = new base.Substance.Ball(25);
	ball.speed = 10;
	ball.texture = new Breakout.Texture("assets/images/ball.png");

window.requestAnimationFrame(function Looper () {
	base.draw();

	(() => {
		if (ball.x <= 0) {
			switch (ball.state) {
				case base.Substance.Ball.STATE.TO_LEFT_TOP:
					ball.state = base.Substance.Ball.STATE.TO_RIGHT_TOP;
					break;

				case base.Substance.Ball.STATE.TO_LEFT_BOTTOM:
					ball.state = base.Substance.Ball.STATE.TO_RIGHT_BOTTOM;
					break;
			}
		} else if (ball.x + ball.radius >= base.width) {
			switch (ball.state) {
				case base.Substance.Ball.STATE.TO_RIGHT_TOP:
					ball.state = base.Substance.Ball.STATE.TO_LEFT_TOP;
					break;

				case base.Substance.Ball.STATE.TO_RIGHT_BOTTOM:
					ball.state = base.Substance.Ball.STATE.TO_LEFT_BOTTOM;
					break;
			}
		} else if (ball.y <= 0) {
			switch (ball.state) {
				case base.Substance.Ball.STATE.TO_LEFT_TOP:
					ball.state = base.Substance.Ball.STATE.TO_LEFT_BOTTOM;
					break;

				case base.Substance.Ball.STATE.TO_RIGHT_TOP:
					ball.state = base.Substance.Ball.STATE.TO_RIGHT_BOTTOM;
					break;
			}
		} else if (ball.y + ball.radius >= base.height) {
			switch (ball.state) {
				case base.Substance.Ball.STATE.TO_LEFT_BOTTOM:
					ball.state = base.Substance.Ball.STATE.TO_LEFT_TOP;
					break;

				case base.Substance.Ball.STATE.TO_RIGHT_BOTTOM:
					ball.state = base.Substance.Ball.STATE.TO_RIGHT_TOP;
					break;
			}
		}



		switch (ball.state) {
			default:
				ball.state = base.Substance.Ball.STATE.TO_RIGHT_BOTTOM;
				ball.move(ball.speed, ball.speed);

				break;

			case base.Substance.Ball.STATE.TO_LEFT_TOP:
				ball.move(-ball.speed, -ball.speed);
				break;

			case base.Substance.Ball.STATE.TO_LEFT_BOTTOM:
				ball.move(-ball.speed, ball.speed);
				break;

			case base.Substance.Ball.STATE.TO_RIGHT_TOP:
				ball.move(ball.speed, -ball.speed);
				break;

			case base.Substance.Ball.STATE.TO_RIGHT_BOTTOM:
				ball.move(ball.speed, ball.speed);
				break;
		}
	})();

	window.requestAnimationFrame(Looper);
});