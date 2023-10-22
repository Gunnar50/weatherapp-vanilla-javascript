import { API_KEY, API_URL, cityInput } from "../config.js";
import { getWeather } from "./weatherController.js";

// const locationURL = "https://api.openweathermap.org/geo/1.0/direct?";

const suggestionContainer = document.querySelector("[data-suggestion]");

export const getUserLocation = () => {
	let userLocation = "";

	cityInput.addEventListener("input", async (event) => {
		userLocation = event.target.value;
		if (userLocation.length === 0) {
			// clear the suggestions
			// suggestionContainer.innerHTML = "";
			suggestionContainer.style.display = "none";
			return;
		}
		// console.log(userLocation);

		try {
			const { data } = await axios.get(
				`${API_URL}/geo/1.0/direct?q=${userLocation}&limit=0&appid=${API_KEY}`
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

// handle the list of suggestions
const handleCityList = (data) => {
	suggestionContainer.style.display = "block";
	suggestionContainer.innerHTML = data
		.map((loc) => {
			const { lat, lon, name = "", state = "", country = "" } = loc;
			// return li tag containg the lat and long data
			return `<li data-lat="${lat}" data-lon="${lon}">${name}, ${state} (${country})</li>`;
		})
		.join("");

	// listen for user clicking in any of the suggestions (li)
	suggestionContainer.addEventListener("click", function (event) {
		if (event.target.tagName.toLowerCase() === "li") {
			// extract the lat and long data
			const lat = event.target.getAttribute("data-lat");
			const lon = event.target.getAttribute("data-lon");

			// add the clicked suggestion to the input field
			cityInput.value = event.target.innerHTML;

			// clear the suggestions
			// suggestionContainer.innerHTML = "";
			suggestionContainer.style.display = "none";

			// call getWeather function
			getWeather(lat, lon);
		}
	});
};

// if user click outside the container, then close the suggestion container
document.addEventListener("click", (event) => {
	if (!suggestionContainer.contains(event.target)) {
		suggestionContainer.style.display = "none";
	}
});
