import { cityInput } from "./config.js";
import { getUserLocation } from "./location.js";
import { getWeather } from "./weatherController.js";

export const findUser = () => {
	const findMe = document.querySelector("[data-findme]");

	findMe.addEventListener("click", async () => {
		// console.log("find me");
		const { latitude, longitude } = await getUserLocation();
		getWeather(latitude, longitude);
		cityInput.value = "";
	});
};
