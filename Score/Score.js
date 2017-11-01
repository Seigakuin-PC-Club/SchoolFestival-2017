/*window.addEventListener("DOMContentLoaded", () => {
	DOM('@*.mdl-select').forEach((select) => {
		select.classList.add("mdl-textfield"),
		select.classList.add("mdl-js-textfield"),
		select.classList.add("mdl-textfield--floating-label");

		let uuid = new DOM.Randomizer(DOM.Randomizer.TYPE.LEVEL3).generate(16),
			selectItems = select.querySelectorAll("Li");

			selectItems.forEach((selectItem) => {
				selectItem.classList.add("mdl-menu__item");

				selectItem.addEventListener("click", (event) => {
					select.classList.add("is-dirty");
					select.querySelector("Input.mdl-textfield__input").value = selectItem.textContent;

					selectItem.textContent || select.classList.remove("is-dirty");
				});
			});

		select.appendChild(
			DOM("Input", {
				id: uuid,
				classes: ["mdl-textfield__input"],

				attributes: {
					"Type": "Text",
					"Readonly": "Readonly"
				}
			})
		);

		select.appendChild(
			DOM("Label", {
				classes: ["mdl-textfield__label"],
				text: select.dataset.label || ""
			})
		);

		select.appendChild(
			DOM("UL", {
				classes: ["mdl-menu", "mdl-js-menu", "mdl-js-ripple-effect", "mdl-menu--bottom-left"],

				attributes: {
					"For": uuid
				},

				children: selectItems
			})
		);
	});
});*/