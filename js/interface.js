import { getUserLocation } from "./inputController.js";
import {
	checkScreenSize,
	formatTime,
	getFormattedDate,
	getWindDirection,
	updateCurrentTime,
} from "./utils.js";

export const setInterface = ({ city, list }) => {
	const { name: cityName, country, sunrise, sunset } = city;

	// slice the next four objects which is 3 hours apart
	// eg. if now is 10am, the variable todayWeather will hold the weather for 12pm, 3pm, 6pm and 9pm.
	const todayWeather = list.splice(0, 4);

	// gets current hour weather
	const currentWeather = todayWeather[0];

	// filters only the objects that is at 12pm or midday.
	const nextDays = list.filter((daySection) =>
		daySection.dt_txt.endsWith("12:00:00")
	);

	console.log(todayWeather);
	// console.log(city);

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
					return `
						<div class="hour-card">
							<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" />
							<span class="hour-temp"> ${Math.round(data.main.temp)}&deg; </span>
							<span class="h-text hour-time">${formatTime(data.dt_txt)}</span>
							<span class="h-text hour-feels">W ${data.wind.speed}m/s</span>
							<span class="h-hour hour-humidity">H ${data.main.humidity}%</span>
						</div>
					`;
				})
				.join("")}
		</div>
	`;

	const createDayCard = (array) => {
		const html = array.map((data) => {
			return `
					<div class="day-card">
						<div class="day">
							<div class="weekday">${getFormattedDate(data.dt_txt).split(",")[0]}</div>
							<div class="weekday-description">${data.weather[0].description}</div>
						</div>
						<div class="day-card-icon">
							<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" />
						</div>
						<div class="day-temp">
							${Math.round(data.main.temp)}&deg;
						</div>
					</div>
				`;
		});

		// make sure there is only 4 days ahead
		if (html.length > 4) html.splice(4, html.length);
		return html.join("");
	};

	const weekContainer = createDayCard(nextDays);

	const todayContainerRef = document.querySelector("[data-today]");
	const weekContainerRef = document.querySelector("[data-week]");
	todayContainerRef.innerHTML = todayContainer;
	weekContainerRef.innerHTML = weekContainer;

	const currentTime = document.getElementById("current-time");
	currentTime.innerHTML = updateCurrentTime();
	setInterval(() => (currentTime.innerHTML = updateCurrentTime()), 30000);

	checkScreenSize();
	window.addEventListener("resize", checkScreenSize);
};
