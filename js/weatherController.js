import { setInterface } from "./interface.js";
import { getUserLocation } from "./location.js";
import { API, autoLat, autoLong, weatherURL } from "./utils.js";

export const getWeather = async (latitude, longitude) => {
	try {
		const units = "metric";
		const { data } = await axios.get(
			`${weatherURL}lat=${latitude}&lon=${longitude}&units=${units}&appid=${API}`
		);
		setInterface(data);
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
