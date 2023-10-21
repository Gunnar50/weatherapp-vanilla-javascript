import {
	checkDayTime,
	checkScreenSize,
	formatTime,
	getFormattedDate,
	getIconsClass,
	getWindDirection,
	updateCurrentTime,
} from "./utils.js";

import { todayContainerRef, weekContainerRef } from "./config.js";

export const setInterface = ({ city, list }, currentDayData) => {
	console.log(currentDayData);
	const { name: cityName, country, sunrise, sunset } = city;
	const isDayTime = checkDayTime(sunset, sunrise);

	// slice the next four objects which is 3 hours apart
	// eg. if now is 10am, the variable todayWeather will hold the weather for 12pm, 3pm, 6pm and 9pm.
	const todayWeather = list.splice(0, 4);

	// gets current hour weather
	const currentWeather = currentDayData;
	const currentWeatherType = currentWeather.weather[0].main.toLowerCase();

	// filters only the objects that is at 12pm or midday.
	const nextDays = list.filter((daySection) =>
		daySection.dt_txt.endsWith("12:00:00")
	);

	console.log(nextDays);
	// console.log(city);

	const [cardDayNight, cardWeather] = getIconsClass(
		currentWeather.weather[0]
	)[0].split(" ");
	console.log(cardDayNight, cardWeather);

	todayContainerRef.classList.add(
		isDayTime ? "card-day" : "card-night",
		cardWeather
	);

	const todayContainer = ` 
		
		<div class="location">
			<h3 class="city">${cityName}, ${country}</h3>
			<div class="today-date">
				<span class="current-date">${getFormattedDate(Date.now())}</span>
				<span id="current-time" class="current-time"></span>
			</div>
		</div>
		<div class="current-information">
			
			<div class="today-temp">
				<span class="weather-temp">${Math.round(currentWeather.main.temp)}</span>
				<span class="weather-description">${
					currentWeather.weather[0].description
				}</span>
			</div>
			<div class="more-info">
				<span class="feels">feels like: ${Math.round(
					currentWeather.main.feels_like
				)}&deg;</span>
				<span class="wind">wind: ${getWindDirection(currentWeather.wind.deg)} ${
		currentWeather.wind.speed
	}m/s</span>
				<span class="sunrise">sunrise: ${formatTime(sunrise)}</span>
				<span class="sunset">sunset: ${formatTime(sunset)}</span>
			</div>
		</div>
		<div class="hour-container">
			${todayWeather
				.map((data) => {
					const [upperclass, lowerclass] = getIconsClass(data.weather[0]);
					return `
						<div class="hour-card ${upperclass}">
							<div class="card">
								<div class="${lowerclass}"></div>
							</div>

							<span class="hour-temp"> ${Math.round(data.main.temp)}&deg; </span>
							<span class="hour-desc"> ${data.weather[0].description}</span>
							<span class="h-text hour-time">${formatTime(data.dt_txt)}</span>
							<span class="h-text hour-feels">W ${data.wind.speed}m/s</span>
						</div>
					`;
				})
				.join("")}
		</div>
	
	`;

	const createDayCard = (array) => {
		const html = array.map((data) => {
			const [upperclass, lowerclass] = getIconsClass(data.weather[0]);
			return `
					<div class="day-card ${isDayTime ? "card-day" : "card-night"} ${
				upperclass.split(" ")[1]
			}">
						<div class="day">
							<div class="weekday">${getFormattedDate(data.dt_txt).split(",")[0]}</div>
							<div class="weekday-description">${data.weather[0].description}</div>
						</div>
						<div class="card">
							<div class="${lowerclass}"></div>
						</div>
						<div class="day-temp">
							${Math.round(data.main.temp)}&deg;
						</div>
						<div class="day-card-more-info">
							<p class="h-text hour-feels">wind: ${getWindDirection(data.wind.deg)} ${
				data.wind.speed
			}m/s</p>
							<p class="h-hour hour-humidity">H: ${data.main.humidity}%</p>
						</div>
					</div>
				`;
		});

		// make sure there is only 4 days ahead
		if (html.length > 4) html.splice(4, html.length);
		return html.join("");
	};

	const weekContainer = createDayCard(nextDays);

	todayContainerRef.innerHTML = todayContainer;
	weekContainerRef.innerHTML = weekContainer;

	const currentTime = document.getElementById("current-time");
	currentTime.innerHTML = updateCurrentTime();
	setInterval(() => (currentTime.innerHTML = updateCurrentTime()), 30000);

	if (!isDayTime) {
		document.documentElement.setAttribute("data-theme", "night");
	} else {
		document.documentElement.setAttribute("data-theme", "day");
	}

	// document.documentElement.setAttribute("data-weather", currentWeatherType);
	document.documentElement.setAttribute("data-weather", currentWeatherType);

	// the input box change place in the dom depending on the size of the window
	checkScreenSize();
	window.addEventListener("resize", checkScreenSize);
};
