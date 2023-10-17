import { formatTime, getFormattedDate, updateCurrentTime } from "./utils.js";

const root = document.getElementById("root");

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

	// console.log(todayWeather);
	// console.log(nextDays);

	const todayContainer = `
	<div class="today-container">
		<div class="location">
			<span class="city">${cityName}</span>
			<span class="country">${country}</span>
		</div>
		<div class="today-date">
			<span class="current-date">${getFormattedDate(currentWeather.dt_txt)}</span>
			<span id="current-time" class="current-time"></span>
		</div>
		<div class="today-temp">
			<span class="weather-temp">${Math.floor(
				currentWeather.main.temp
			)}<span>&deg;</span></span>
			<span class="weather-descritption">${
				currentWeather.weather[0].description
			}</span>
		</div>
		<div class="more-info">
			<span class="feels">feels like: ${currentWeather.main.feels_like}&deg;</span>
			<span class="wind">wind: ${currentWeather.wind.speed}m/s</span>
			<span class="sunrise">sunrise: ${formatTime(sunrise)}</span>
			<span class="sunset">sunset: ${formatTime(sunset)}</span>
		</div>
		${todayWeather
			.map((data) => {
				return `
					<div class="hour-card">
						<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" />
						<span class="hour-temp"> ${Math.floor(data.main.temp)}&deg; </span>
						<span class="hour-time">${formatTime(data.dt_txt)}</span>
					</div>
				`;
			})
			.join("")}
		
	</div>
	`;

	const weekContainer = `
	<div class="week-container">
		${nextDays
			.map((data) => {
				return `
					<div class="day-card">
						<div class="day">
							<span class="weekday">${getFormattedDate(data.dt_txt).split(",")[0]}</span>
							<span class="weekday-description">${data.weather[0].description}</span>
						</div>
						<div class="day-temp">
							<span>${Math.floor(data.main.temp)}&deg;</span>
						</div>
					</div>
				`;
			})
			.join("")}
		
	</div>
	`;

	root.innerHTML += todayContainer + weekContainer;
	const currentTime = document.getElementById("current-time");
	currentTime.innerHTML = updateCurrentTime();
	setInterval(() => (currentTime.innerHTML = updateCurrentTime()), 30000);
};
