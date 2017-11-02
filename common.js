window.addEventListener("DOMContentLoaded", () => {
	document.querySelectorAll("Main").forEach(elem => {
		["mdl-cell", "mdl-cell--2-offset", "mdl-cell--8-col", "mdl-shadow--4dp", "mdl-color--white", "mdl-color-text--grey-800"].forEach(className => {
			elem.classList.add(className);
		});
	});
	
	window.addEventListener("keydown", (res) => {
		console.log(res);
		
		if (res.keyCode == 122) {
			if (event.shiftKey && event.ctrlKey && event.altKey) {
				document.documentElement.requestFullscreen ? document.documentElement.requestFullscreen() :
				document.documentElement.webkitRequestFullScreen ? document.documentElement.webkitRequestFullScreen() :
				document.documentElement.mozRequestFullScreen ? document.documentElement.mozRequestFullScreen() :
				document.documentElement.msRequestFullscreen ? document.documentElement.msRequestFullscreen() : null;
			} else {
				event.preventDefault();
			}
		}
	});
});
