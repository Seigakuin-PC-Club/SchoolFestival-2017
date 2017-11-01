class Component {
	constructor (componentName = "") {
		try {
			if (!this.constructor) throw new TypeError("Please use the 'new' operator, the component can't be called as a function.");
			
			let component = document.importNode(Component.doc.querySelector(`*[Data-Component="${componentName}"]`), true);
			
			let componentWrapper = DOM("ComponentWrapper");
				componentWrapper.appendChild(component);

				componentWrapper.firstElementChild.outerHTML = (() => {
					let content = componentWrapper.firstElementChild.outerHTML;
					
					for (let i = 0; i < arguments.length + 1; i++) {
						content = content.replace(new RegExp("\\$\\{" + i + "\\}", "g"), arguments[i + 1]);
					}

					return content
				})();
				
			return componentWrapper.firstElementChild;
		} catch (error) {
			console.error(error);
		}
	}

	/**
	 * コンポーネントへの参照
	 * @returns {HTMLBodyElement}
	 */
	static get doc () {
		let doc = DOM("body");
		
		try {
			doc.innerHTML = DOM.xhr({
				type: "GET",
				url: "/SchoolFestival-2017/assets/includes/Component/Component.html",
				doesSync: false
			}).response;
		} catch (error) {}

		return doc;
	}

	static get Gamelist () {
		return {
			Game: (() => {
				function Game (title = "Untitled", url = "/") {
					return new Component("Gamelist_Game", title, url);
				};	Game.prototype = Object.create(null, {
					constructor: { value: Game }
				});

				return Game;
			})()
		}
	}

	static get MDLSelect () {
		return (() => {
			function MDLSelect (name = "", children = []) {
				let uuid = new DOM.Randomizer().generate(16);

				let self = new Component("MDLSelect", name, uuid);
				let selectBox = self.querySelector(`UL#MDLSelect-${uuid}-SelectBox`);

				for (let i = 0; i < children.length; i++) {
					selectBox.appendChild(
						DOM("Li", {
							classes: ["mdl-menu__item"],
							text: children[i],

							events: {
								click: (event) => {
									self.classList.add("is-dirty");
									self.querySelector("Input.mdl-textfield__input").value = event.target.textContent;
									
									event.target.textContent || selectBox.classList.remove("is-dirty");
								}
							}
						})
					);
				}

				return self;
			};

			return MDLSelect;
		})();
	}
}

(() => {
	window.addEventListener("DOMContentLoaded", () => {
		DOM("@.mdl-select").forEach(selectBox => {
			selectBox.outerHTML = new Component.MDLSelect().outerHTML;
		});
	});
})();