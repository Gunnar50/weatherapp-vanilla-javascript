import { API } from "./utils.js";
import { getWeather } from "./weatherController.js";

const locationURL = "http://api.openweathermap.org/geo/1.0/direct?";
const cityInput = document.querySelector("[data-location]");
const suggestionContainer = document.querySelector("[data-suggestion]");

export const getUserLocation = () => {
	let userLocation = "";

	cityInput.addEventListener("input", async (event) => {
		userLocation = event.target.value;
		if (userLocation.length === 0) {
			suggestionContainer.innerHTML = "";
			suggestionContainer.style.display = "none";
			return;
		}
		// console.log(userLocation);

		try {
			const { data } = await axios.get(
				`${locationURL}q=${userLocation}&limit=0&appid=${API}`
			);

			// console.log(data);
			if (data.length === 0)
				return (suggestionContainer.style.display = "none");

			handleCityList(data);
		} catch (error) {
			console.log("API Error:", error.message);
		}
	});
};

const handleCityList = (data) => {
	suggestionContainer.style.display = "block";
	suggestionContainer.innerHTML = data
		.map((loc) => {
			const { lat, lon, name = "", state = "", country = "" } = loc;
			return `<li data-lat="${lat}" data-lon="${lon}">${name}, ${state} (${country})</li>`;
		})
		.join("");

	suggestionContainer.addEventListener("click", function (event) {
		if (event.target.tagName.toLowerCase() === "li") {
			const lat = event.target.getAttribute("data-lat");
			const lon = event.target.getAttribute("data-lon");
			cityInput.value = event.target.innerHTML;
			suggestionContainer.innerHTML = "";
			suggestionContainer.style.display = "none";
			getWeather(lat, lon);
		}
	});
};

// if user clock outside the container, then close the suggestion container
document.addEventListener("click", (event) => {
	if (!suggestionContainer.contains(event.target)) {
		suggestionContainer.style.display = "none";
	}
});
