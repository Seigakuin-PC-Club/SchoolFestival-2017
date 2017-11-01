document.querySelectorAll('Dialog').forEach((dialog) => {
	if (dialog.querySelector('Button[Data-Action="Dialog_Submit"]')) {
		dialog.addEventListener("keydown", (event) => {
			if (event.ctrlKey && event.keyCode == 13) dialog.querySelector('Button[Data-Action="Dialog_Submit"]').click();
		});
	}

	dialog.querySelectorAll('Dialog Button[Data-Action="Dialog_Close"]').forEach((btn) => {
		btn.addEventListener("click", () => {
			btn.offsetParent.close();
		});
	});

	dialog.querySelectorAll('Dialog *[Required]').forEach((input) => {
		input.addEventListener("input", () => {
			let result = true;

			dialog.querySelectorAll('Dialog *[Required]').forEach(requiredField => {
				if (requiredField.value.replace(/\s/g, "").length == 0) {
					result = false;
					return;
				}
			});

			if (result) {
				dialog.querySelector('Button[Data-Action="Dialog_Submit"]').classList.remove("mdl-button--disabled");
			} else {
				dialog.querySelector('Button[Data-Action="Dialog_Submit"]').classList.add("mdl-button--disabled");
			}
		});
	});
});