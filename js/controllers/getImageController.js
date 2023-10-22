import {
	API_KEY,
	API_URL,
	PEXEL_API_KEY,
	autoLat,
	autoLong,
	bodyRef,
	todayContainerRef,
} from "../config.js";

export const getImage = async (query) => {
	try {
		console.log(query);
		const perPage = 50;
		const { data } = await axios.get(
			`https://api.pexels.com/v1/search?query=${query}&per_page=${perPage}`,
			{ headers: { Authorization: PEXEL_API_KEY } }
		);

		const imgURL = data.photos[Math.floor(Math.random() * perPage)].src.medium;

		console.log(imgURL);
		bodyRef.style.backgroundImage = `url("${imgURL}")`;
		bodyRef.style.backgroundSize = "cover";
	} catch (error) {
		console.log("PEXELS API error: " + error.message);
		// API is down, send message to user
	}
};
