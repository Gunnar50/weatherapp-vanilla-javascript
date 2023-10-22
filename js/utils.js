import {
	errorMessages,
	mediumScreen,
	rootContainerRef,
	searchBarRef,
	todayContainerRef,
} from "./config.js";

// format time into hh:mm am/pm
export const formatTime = (time) => {
	let date;
	if (typeof time === "string") {
		date = new Date(time);
	} else {
		date = new Date(time * 1000);
	}
	let hours = date.getHours();
	const minutes = date.getMinutes();
	let ampm = hours >= 12 ? "pm" : "am";

	if (hours > 12) {
		hours -= 12;
	}

	return `${hours}:${String(minutes).padStart(2, "0")}${ampm}`;
};

// formate a date into weekDay, day month.
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

// returns the current time formatted
export const updateCurrentTime = () => {
	return formatTime(Date.now() / 1000);
};

// takes the wind in degrees and returns the cardinal direction
export const getWindDirection = (degrees) => {
	let direction = "";

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

// check the screen size and change the order of some elements in the DOM
export const checkScreenSize = () => {
	if (window.innerWidth >= mediumScreen) {
		todayContainerRef.insertBefore(
			searchBarRef,
			todayContainerRef.firstChild.nextSibling.nextSibling
		);
	} else {
		rootContainerRef.insertBefore(searchBarRef, todayContainerRef);
	}
};

// returns true if the current time is day time
// false if is night time
export const checkDayTime = (sunset, sunrise) => {
	if (Date.now() > sunset * 1000 || Date.now() < sunrise * 1000) {
		return false;
	}
	return true;
};

// it takes the weather data and returns a number of classes depending on the icon of the data.
// it is used for the custom cloud icons
export const getIconsClass = (dataWeather) => {
	const icon = dataWeather.icon;
	const main = dataWeather.main;

	const dayNight = icon.indexOf("d") !== -1 ? "day" : "night";

	let upperclass = `card-${dayNight} card-`;
	let lowerclass;

	switch (icon.substring(0, 2)) {
		case "02":
			upperclass += "clouds";
			lowerclass = "few-clouds-" + dayNight;
			break;
		case "03":
			upperclass += "clouds";
			lowerclass = "clouds";
			break;
		case "04":
			upperclass += "more-clouds";
			lowerclass = "more-clouds";
			break;
		case "01":
			upperclass += "clear";
			lowerclass = "clear-" + dayNight;
			break;
		case "13":
			upperclass += "snow";
			lowerclass = "snow";
			break;
		case "09":
			if (main === "Drizzle") {
				upperclass += "drizzle";
				lowerclass = "drizzle";
			} else {
				upperclass += "rain";
				lowerclass = "rain";
			}
			break;
		case "10":
			upperclass += "light-rain";
			lowerclass = "light-rain-" + dayNight;
			break;
		case "11":
			upperclass += "storm";
			lowerclass = "storm";
			break;

		default:
			console.log("Unknown icon type.");
			break;
	}

	// these lines are for testing purposes
	// console.log(upperclass, lowerclass);
	// let card = "storm";
	// return ["card-day card-" + card, card];

	return [upperclass, lowerclass];
};

export const createErrorMessage = (message, timeout) => {
	errorMessages.innerHTML = message;
	errorMessages.classList.add("show");

	setTimeout(() => {
		errorMessages.classList.remove("show");
	}, timeout);
};
