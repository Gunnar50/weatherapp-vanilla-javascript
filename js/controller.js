import { setInterface } from "./interface.js";
import { getUserLocation } from "./location.js";

const URL = "https://api.openweathermap.org/data/2.5/forecast?";
const API = "085590031a30567d9813303060a2063c";

export const getWeather = async () => {
	try {
		const units = "metric";
		const { latitude, longitude } = await getUserLocation();
		const { data } = await axios.get(
			`${URL}lat=${latitude}&lon=${longitude}&units=${units}&appid=${API}`
		);
		setInterface(data);
	} catch (error) {
		console.log("Ops! Something went wrong: " + error.message);
	}
};
