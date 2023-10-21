import { API_KEY, API_URL, autoLat, autoLong } from "./config.js";
import { setInterface } from "./interface.js";
import { getUserLocation } from "./location.js";

export const getWeather = async (latitude, longitude) => {
	try {
		const units = "metric";
		const weekForeast = await axios.get(
			`${API_URL}/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=${units}&appid=${API_KEY}`
		);
		const currentDay = await axios.get(
			`${API_URL}/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${API_KEY}`
		);
		setInterface(weekForeast.data, currentDay.data);
	} catch (error) {
		console.log("Ops! Something went wrong: " + error.message);
	}
};

export const getAutoGeoLocation = async () => {
	// try to get automatic location using the browser location.
	try {
		const { latitude, longitude } = await getUserLocation();
		getWeather(latitude, longitude);
	} catch (error) {
		// if is denied, then return the default location (London)
		getWeather(autoLat, autoLong);
	}
};
