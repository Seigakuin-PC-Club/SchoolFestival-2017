/*/
 *##################################################
 *	Core.js
 *	記念祭プロジェクト in 2017の中枢コード
 *
 *	(前提API：DOM Extender v3.0)
 *##################################################
 *	Copyright (C) 2017 Seigakuin-PC-Club
 *##################################################
/*/
const SEIGPC = (function () {
	const SEIGPC = {}; Object.defineProperties(SEIGPC, {
		Loading: {
			value: document.registerElement("SEIGPC-Loading", {
				prototype: (function () {
					const proto = Object.create(HTMLDivElement.prototype, {
						createdCallback: {
							value () {
								let loadingIcon = DOM("Div", {
									attributes: {
										"class": "mdl-spinner mdl-js-spinner"
									}
								});

								this.appendChild(loadingIcon);
							}
						},

						attachedCallback: {
							value () {
								
							}
						},

						detachedCallback: {
							value () {
								
							}
						},

						attributeChangedCallback: {
							value (attr, oldValue, newValue) {
								
							}
						},



						start: {
							value () {
								this.classList.add("is-active");
								this.querySelector("Div.mdl-spinner.mdl-js-spinner").classList.add("is-active");
							}
						},

						stop: {
							value () {
								this.classList.remove("is-active");
								this.querySelector("Div.mdl-spinner.mdl-js-spinner").classList.remove("is-active");
							}
						}
					}); document.head.appendChild(new Style({
						"SEIGPC-Loading": {
							"Position": "Absolute",
							"Left": 0,
							"Top": 0,
							"Width": "100%",
							"Height": "100%",

							"Z-Index": -1
						},
						
						"SEIGPC-Loading.is-active": {
							"Background": "RGBA(255, 255, 255, 0.5)",
							
							"Z-Index": 100
						}
					}));

					return proto;
				})()
			}),

			enumerable: true
		}
	}); SEIGPC[Symbol.toStringTag] = "Seigakuin-PC-Club";



	if (location.pathname == "/") {
		window.addEventListener("DOMContentLoaded", function () {
			let frame = parent.document.querySelector("IFrame.mdl-layout__content");
				window.addEventListener("beforeunload", function () {
					parent.document.querySelector("SEIGPC-Loading").start();
				});

				frame.addEventListener("load", function () {
					parent.document.querySelector("SEIGPC-Loading").stop();
				});

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
		});
	}


	
	return SEIGPC;
})();