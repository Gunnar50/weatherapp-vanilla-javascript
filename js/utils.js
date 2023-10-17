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
