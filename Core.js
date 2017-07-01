/*/
 *##################################################
 *	Core.js
 *	記念祭プロジェクト in 2017の中枢コード
 *##################################################
 *	Copyright (C) 2017 Seigakuin-PC-Club
 *##################################################
/*/
const SEIGPC = (function () {
	const SEIGPC = {}; Object.defineProperties(SEIGPC, {

	}); SEIGPC[Symbol.toStringTag] = "Seigakuin-PC-Club";



	window.addEventListener("DOMContentLoaded", function () {
		DOM('@A:not([Href="#"])').forEach(function (elem, index, parent) {
			elem.addEventListener("click", function (event) {
				event.preventDefault();
				DOM("$IFrame.mdl-layout__content").src = elem.href;
			});
		});

		DOM('@A[Disabled]').forEach(function (elem, index, parent) {
			elem.addEventListener("click", function (event) {
				event.preventDefault();
			});
		});
	});

	
	
	return SEIGPC;
})();