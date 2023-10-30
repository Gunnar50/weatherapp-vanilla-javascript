import { cityInput } from "../config.js";
import { createErrorMessage } from "../utils.js";
import { getUserLocation } from "./getLocationController.js";
import { getWeather } from "./weatherController.js";

export const findUser = () => {
	const findMe = document.querySelector("[data-findme]");

	findMe.addEventListener("click", async () => {
		// console.log("find me");
		try {
			const { latitude, longitude } = await getUserLocation();
			getWeather(latitude, longitude);
			cityInput.value = "";
		} catch (e) {
			createErrorMessage(
				"To use the find me button, please allow your location.",
				5000
			);
		}
	});
};
