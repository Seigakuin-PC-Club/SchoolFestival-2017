window.addEventListener("DOMContentLoaded", () => {
	document.querySelectorAll("Main").forEach(elem => {
		["mdl-cell", "mdl-cell--2-offset", "mdl-cell--8-col", "mdl-shadow--4dp", "mdl-color--white", "mdl-color-text--grey-800"].forEach(className => {
			elem.classList.add(className);
		});
	});
});