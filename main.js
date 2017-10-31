window.addEventListener("DOMContentLoaded", function () {
	/** @type {HTMLIFrameElement} */
	let frame = parent.document.querySelector("IFrame.mdl-layout__content");

	DOM('@A:Not([Href="#"]):Not([Disabled])').forEach(function (elem, index, p) {
		elem.addEventListener("click", function (event) {
			event.preventDefault();

			frame.src = elem.href;
		});
	});

	DOM('@A[Disabled]').forEach(function (elem, index, p) {
		elem.addEventListener("click", function (event) {
			event.preventDefault();
		});
	});

	DOM("$IFrame.mdl-layout__content").addEventListener("load", () => {
		!DOM("$Div.mdl-layout__drawer") || DOM("$Div.mdl-layout__drawer").classList.remove("is-visible"),
		!DOM("$Div.mdl-layout__obfuscator") || DOM("$Div.mdl-layout__obfuscator").classList.remove("is-visible");
	});
});