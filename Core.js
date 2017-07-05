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

	let tagTemplate = (function () {
		let body = DOM("Body");
			body.innerHTML = 
			`<Template For = "SEIGPC-Loading">
				<Style>
					:Host {
						Transition: Opacity 0.25s Cubic-Bezier(0.4, 0, 0.2, 1) 0s;

						Position: Fixed;
						Left: 0;
						Top: 0;

						Display: Flex;
						Width: 100%;
						Height: 100%;

						Background: RGBA(0, 0, 0, 0.5);
						Opacity: 0;
						Z-Index: -1;
						Overflow: Hidden;
					}
					
					:Host(.is-active) {
						Opacity: 1;
						Z-Index: 1000;
					}
				</Style>

				<Content Select = "SEIGPC-Loading-Spinner"></Content>
			</Template>

			<Template For = "SEIGPC-Loading-Spinner">
				<Style>
					@keyframes SEIGPC-Loading-Spinner__Animation {
						0% {
							Transform: Rotate(0deg);
						}

						100% {
							Transform: Rotate(360deg);
						}
					}
					
					:Host {
						Display: Flex;
						Width: 100%;
						Height: 100%;
					}

					:Host(.is-active) {
						Animation: SEIGPC-Loading-Spinner__Animation 1s Ease-In-Out 0s Infinite Normal;
					}

					:Host::Before {
						Content: "";

						Display: Block;
						Width: 3pc;
						Height: 3pc;

						Margin: Auto;

						Background-Image: var(--Url, URL(""));
						Background-Position: Center;
						Background-Size: Cover;
					}
				</Style>
			</Template>
			
			<Template For = "SEIGPC-Profile-Card">
				<Link Rel = "StyleSheet" Href = "https://fonts.googleapis.com/icon?family=Material+Icons" />
				<Link Rel = "StyleSheet" Href = "https://code.getmdl.io/1.3.0/material.blue_grey-pink.min.css" />

				<Style>
					:Host > Div.mdl-card__title {
						Padding: 0;
					}

					:Host > Div.mdl-card__title ::Slotted(Img) {
						Width: 100%;
					}
				</Style>

				<Div Class = "mdl-card__title">
					<Slot Name = "Picture"></Slot>
				</Div>

				<Div Class = "mdl-card__supporting-text">
					<H2 Class = "mdl-card__title-text">
						<Slot Name = "Name"></Slot>
					</H2>
				</Div>

				<Div Class = "mdl-card__actions mdl-card--border">
					<Slot Name = "Detail"></Slot>
				</Div>
			</Template>`;
			
		return body;
	})();
	
	const SEIGPC = {}; Object.defineProperties(SEIGPC, {
		Loading: {
			value: (function () {
				const Loading = document.registerElement("SEIGPC-Loading", {
					prototype: Object.create(HTMLDivElement.prototype, {
						createdCallback: {
							value () {
								let root = this.createShadowRoot();
									root.appendChild(document.importNode(tagTemplate.querySelector('Template[For="SEIGPC-Loading"]').content, true));
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
				}); Object.defineProperties(Loading, {
					Spinner: {
						value: (function () {
							const Spinner = document.registerElement("SEIGPC-Loading-Spinner", {
								prototype: Object.create(HTMLDivElement.prototype, {
									createdCallback: {
										value () {
											let root = this.createShadowRoot();
												root.appendChild(document.importNode(tagTemplate.querySelector('Template[For="SEIGPC-Loading-Spinner"]').content, true));
										}
									},

									attachedCallback: {
										value () {
											if (this.parentElement.nodeName == "SEIGPC-LOADING") this.parentElement.spinner = this;
										}
									},

									detachedCallback: {
										value () {
											
										}
									},

									attributeChangedCallback: {
										value (attr, oldValue, newValue) {
											
										}
									}
								})
							});

							return Spinner;
						})(),

						enumerable: true
					}
				});

				return Loading;
			})(),

			enumerable: true
		},

		Profile: {
			value: (function () {
				const Profile = Object.create(Object.prototype, {
					Card: {
						value: (function () {
							const Card = document.registerElement("SEIGPC-Profile-Card", {
								prototype: Object.create(HTMLDivElement.prototype, {
									createdCallback: {
										value () {
											let root = this.attachShadow({ mode: "closed" });
												root.appendChild(document.importNode(tagTemplate.querySelector('Template[For="SEIGPC-Profile-Card"]').content, true));

											this.classList.add("mdl-card");
											this.classList.add("mdl-shadow--4dp");

											if (this.querySelector("A[Slot='Detail']")) {
												"mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--colored".split(" ").forEach((function (elem, index, parent) {
													this.querySelector("A[Slot='Detail']").classList.add(elem);
												}).bind(this));
											}
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
								})
							});

							return Card;
						})(),

						enumerable: true
					}
				});

				return Profile;
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



		let loadingScreen = DOM("SEIGPC-Loading", {
			children: [
				DOM("SEIGPC-Loading-Spinner", {
					styles: {
						"--Url": 'URL("favicon.png")'
					}
				})
			]
		});

		document.body.appendChild(loadingScreen);
	});



	return SEIGPC;
})();