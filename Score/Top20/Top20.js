const DB = new FirebasePlus({
	apiKey: "AIzaSyCOWO_FHZxCrf5pnM2WkQx4ySckpyPhsHE",
	authDomain: "seigpc-schoolfestival-2017.firebaseapp.com",
	databaseURL: "https://seigpc-schoolfestival-2017.firebaseio.com",
	projectId: "seigpc-schoolfestival-2017",
	storageBucket: "seigpc-schoolfestival-2017.appspot.com",
	messagingSenderId: "19065845746"
}, (user) => {
	DB.signInWithAnonymous();
});

window.addEventListener("DOMContentLoaded", () => {
	document.querySelector("#SnakeGame-DY_Difficulty > Input").addEventListener("blur", event => {
		let difficult = event.relatedTarget ? event.relatedTarget.textContent : "EASY";
		
		setInterval(() => {
			let list = document.querySelector('#SnakeGame-DY > Table[ID$="Scorelist"]');

			while (list.children.length > 1) list.children[1].remove();

			DB.Database.sortByPriority(`SnakeGame-DY/${difficult}/`, res => {
				let data = res.val();
				if (res.key != "!SYSTEM") list.appendChild(new Component.Scorelist.Score(data.name, data.score));
			}, {
				amount: [20]
			});
		}, 5000);
	});

	(() => {
		setInterval(() => {
			let list = document.querySelector('#Reverse-DY > Table[ID$="Scorelist"]');

			while (list.children.length > 1) list.children[1].remove();

			DB.Database.sortByPriority(`Reverse-DY/`, res => {
				let data = res.val();
				if (res.key != "!SYSTEM") list.appendChild(new Component.Scorelist.Score(data.name, data.score));
			}, {
				amount: [20]
			});
		}, 5000);
	})();
});
