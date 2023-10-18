import { API } from "./utils.js";

const locationURL = "http://api.openweathermap.org/geo/1.0/direct?";

export const getUserLocation = () => {
	const cityInput = document.querySelector("[data-location]");
	let userLocation = "";

	cityInput.addEventListener("input", async (event) => {
		userLocation = event.target.value;
		console.log(userLocation);

		try {
			const { data } = await axios.get(
				`${locationURL}q=${userLocation}&limit=5&appid=${API}`
			);

			console.log("API Response:", data);
		} catch (error) {
			console.log("API Error:", error.message);
		}
	});
};
