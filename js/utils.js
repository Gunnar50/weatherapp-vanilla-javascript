export const API = "085590031a30567d9813303060a2063c";
export const weatherURL = "https://api.openweathermap.org/data/2.5/forecast?";
export const [autoLat, autoLong] = [51.50722, -0.1275];

export const formatTime = (timeString) => {
	let date;
	if (typeof timeString === "string") {
		date = new Date(timeString);
	} else {
		date = new Date(timeString * 1000);
	}
	let hours = date.getHours();
	const minutes = date.getMinutes();
	let ampm = hours >= 12 ? "pm" : "am";

	if (hours > 12) {
		hours -= 12;
	}

	return `${hours}:${String(minutes).padStart(2, "0")}${ampm}`;
};

export const getFormattedDate = (dateString) => {
	const days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const date = new Date(dateString);
	const dayName = days[date.getDay()];
	const day = date.getDate();
	const month = months[date.getMonth()];

	return `${dayName}, ${day} ${month}`;
};

export const updateCurrentTime = () => {
	const now = new Date();
	return formatTime(now.toLocaleString());
};

export const getWindDirection = (degrees) => {
	let direction = "";

	// Determine the cardinal direction
	if (degrees >= 330 || degrees <= 30) {
		direction = "N";
	} else if (degrees > 30 && degrees <= 60) {
		direction = "NE";
	} else if (degrees > 60 && degrees <= 120) {
		direction = "E";
	} else if (degrees > 120 && degrees <= 150) {
		direction = "SE";
	} else if (degrees > 150 && degrees <= 210) {
		direction = "S";
	} else if (degrees > 210 && degrees <= 240) {
		direction = "SW";
	} else if (degrees > 240 && degrees <= 300) {
		direction = "W";
	} else if (degrees > 300 && degrees < 330) {
		direction = "NW";
	} else {
		direction = "UNK";
	}

	return direction;
};
