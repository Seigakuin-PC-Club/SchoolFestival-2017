window.addEventListener("DOMContentLoaded", () => {
	DOM("#Gamelist").appendChild(new Component.Gamelist.Game("SnakeGame by Genbu Hase", "GenbuHase/SnakeGame/"));
	DOM("#Gamelist").appendChild(new Component.Gamelist.Game("SnakeGame by D.Y.", "DaikiYamazaki/SnakeGame/Merged/"));
	DOM("#Gamelist").appendChild(new Component.Gamelist.Game("Reverse by D.Y.", "DaikiYamazaki/Reverse/"));
});