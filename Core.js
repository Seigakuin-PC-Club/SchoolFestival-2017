/*/
 *##################################################
 *	Core.js
 *	記念祭プロジェクト in 2017の中枢処理群
 *
 *	(前提API：DOM Extender v3.0)
 *##################################################
 *	Copyright (C) 2017 Seigakuin-PC-Club
 *##################################################
/*/
const SEIGPC = (function () {
	let baseUrl = "/SchoolFestival-2017/";
	
	const SEIGPC = {}; Object.defineProperties(SEIGPC, {
		Loading: {
			value: (function () {
				const Loading = document.registerElement("SEIGPC-Loading", {
					prototype: Object.create(HTMLDivElement.prototype, {
						createdCallback: {
							value () {
								/*this.spinner = DOM("Div", {
									attributes: {
										"class": "mdl-spinner mdl-js-spinner mdl-spinner--single-color"
									}
								});*/

								this.spinner = (function () {
									let spinner = new SEIGPC.Loading.Spinner();
										spinner.src = "favicon.png";

									return spinner;
								})()

								this.appendChild(this.spinner);
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



						spinner: { value: null, configurable: true, writable: true, enumerable: true },

						start: {
							value () {
								this.classList.add("is-active");
								this.spinner.classList.add("is-active");
							}
						},

						stop: {
							value () {
								this.classList.remove("is-active");
								this.spinner.classList.remove("is-active");
							}
						}
					})
				}); document.head.appendChild(new Style({
					"SEIGPC-Loading": {
						"Transition": "Opacity 0.25s Cubic-Bezier(0.4, 0, 0.2, 1) 0s",

						"Position": "Absolute",
						"Left": 0,
						"Top": 0,

						"Display": "Flex",
						"Width": "100%",
						"Height": "100%",

						"Background": "RGBA(0, 0, 0, 0.5)",
						"Opacity": 0,
						"Z-Index": -1,
					},
					
					"SEIGPC-Loading.is-active": {
						"Opacity": 1,
						"Z-Index": 101
					},

					"SEIGPC-Loading > Div.mdl-spinner.mdl-js-spinner": {
						"Margin": "Auto"
					}
				})); Object.defineProperties(Loading, {
					Spinner: {
						value: (function () {
							const Spinner = document.registerElement("SEIGPC-Loading-Spinner", {
								prototype: Object.create(HTMLDivElement.prototype, {
									createdCallback: {
										value () {
											this.style.backgroundImage = 'URL("favicon.png")';
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
											switch (attr) {
												case "src":
													this.style.backgroundImage = "URL(" + newValue + ")";
													break;
											}
										}
									},



									src: {
										value: "",

										set src (val) {
											this.setAttribute("src", val);
										},
										
										configurable: true,
										writable: true,
										enumerable: true
									}
								})
							}); document.head.appendChild(new Style({
								"@Keyframes SEIGPC-Loading-Spinner__Anime": {
									"0%": {
										"Transform": "Rotate(0deg)"
									},

									"100%": {
										"Transform": "Rotate(360deg)"
									}
								},

								"SEIGPC-Loading > SEIGPC-Loading-Spinner": {
									"Display": "Block",
									"Width": "50px",
									"Height": "50px",

									"Margin": "Auto",
									"Background-Position": "Center",
									"Background-Size": "Cover",

									"Z-Index": 102
								},

								"SEIGPC-Loading > SEIGPC-Loading-Spinner.is-active": {
									"Animation": "SEIGPC-Loading-Spinner__Anime 1s Ease-In-Out 0s Infinite Normal"
								}
							}));

							return Spinner;
						})(),

						enumerable: true
					}
				});

				return Loading;
			})(),

			enumerable: true
		}
	}); SEIGPC[Symbol.toStringTag] = "Seigakuin-PC-Club";



	window.addEventListener("DOMContentLoaded", function () {
		/** @type {HTMLIFrameElement} */
		let frame = parent.document.querySelector("IFrame.mdl-layout__content");
			frame.contentWindow.addEventListener("beforeunload", function () {
				parent.document.querySelector("SEIGPC-Loading").start();
			});

		if (location.pathname == "/" || location.pathname == baseUrl) {
			frame.addEventListener("load", function () {
				parent.document.querySelector("SEIGPC-Loading").stop();
			});
		}

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


	
	return SEIGPC;
})();