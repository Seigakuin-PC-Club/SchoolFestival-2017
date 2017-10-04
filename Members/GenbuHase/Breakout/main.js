let base = new Breakout();
	base.background = new Breakout.Color();

let ball = new Breakout.Ball(25);
	ball.speed = 10;
	ball.texture = new Breakout.Texture("assets/images/ball.png");

	ball.update = () => {
		if (ball.x <= 0) {
			switch (ball.state) {
				case Breakout.Ball.STATE.TO_LEFT_TOP:
				ball.state = Breakout.Ball.STATE.TO_RIGHT_TOP;
					break;

				case Breakout.Ball.STATE.TO_LEFT_BOTTOM:
				ball.state = Breakout.Ball.STATE.TO_RIGHT_BOTTOM;
					break;
			}
		} else if (ball.x + ball.radius >= base.width) {
			switch (ball.state) {
				case Breakout.Ball.STATE.TO_RIGHT_TOP:
					ball.state = Breakout.Ball.STATE.TO_LEFT_TOP;
					break;

				case Breakout.Ball.STATE.TO_RIGHT_BOTTOM:
					ball.state = Breakout.Ball.STATE.TO_LEFT_BOTTOM;
					break;
			}
		} else if (ball.y <= 0) {
			switch (ball.state) {
				case Breakout.Ball.STATE.TO_LEFT_TOP:
					ball.state = Breakout.Ball.STATE.TO_LEFT_BOTTOM;
					break;

				case Breakout.Ball.STATE.TO_RIGHT_TOP:
					ball.state = Breakout.Ball.STATE.TO_RIGHT_BOTTOM;
					break;
			}
		} else if (ball.y + ball.radius >= base.height) {
			switch (ball.state) {
				case Breakout.Ball.STATE.TO_LEFT_BOTTOM:
					ball.state = Breakout.Ball.STATE.TO_LEFT_TOP;
					break;

				case Breakout.Ball.STATE.TO_RIGHT_BOTTOM:
					ball.state = Breakout.Ball.STATE.TO_RIGHT_TOP;
					break;
			}
		}



		switch (ball.state) {
			default:
				ball.state = Breakout.Ball.STATE.TO_RIGHT_BOTTOM;
				ball.move(ball.speed, ball.speed);

				break;

			case Breakout.Ball.STATE.TO_LEFT_TOP:
				ball.move(-ball.speed, -ball.speed);
				break;

			case Breakout.Ball.STATE.TO_LEFT_BOTTOM:
				ball.move(-ball.speed, ball.speed);
				break;

			case Breakout.Ball.STATE.TO_RIGHT_TOP:
				ball.move(ball.speed, -ball.speed);
				break;

			case Breakout.Ball.STATE.TO_RIGHT_BOTTOM:
				ball.move(ball.speed, ball.speed);
				break;
		}
	};

window.requestAnimationFrame(function Looper () {
	base.draw();
	ball.update();

	window.requestAnimationFrame(Looper);
});