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
				function Game (title = "Untitled") {
					return new Component("Gamelist_Game", title);
				};	Game.prototype = Object.create(null, {
					constructor: { value: Game }
				});

				return Game;
			})()
		}
	}
}