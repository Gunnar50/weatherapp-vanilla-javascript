const API = "085590031a30567d9813303060a2063c";
const URL = "https://api.openweathermap.org/data/2.5/forecast?";

async function getData(lat, lon) {
	try {
		const response = await axios.get(
			URL + `lat=${lat}&lon=${lon}&appid=${API}`
		);
		console.log(response.data);
		displayWeatherInfo(response.data);
	} catch (error) {
		console.log(error);
		displayError("Ops! Something went wrong: " + error.message);
	}
}

function displayWeatherInfo(data) {
	document.getElementById("location").innerText = data.name;
	document.getElementById(
		"icon"
	).src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
	document.getElementById("temperature").innerText = Math.floor(
		data.main.temp - 273.15
	);
	document.getElementById("description").innerText =
		data.weather[0].description;
	document.getElementById("humidity").innerText = data.main.humidity;
	document.getElementById("windSpeed").innerText = data.wind.speed;
	document.getElementById("weather-info").classList.remove("hidden");
}

function displayError(message) {
	const errorDiv = document.getElementById("error-message");
	errorDiv.innerHTML = `<h2>${message}</h2>`;
	errorDiv.classList.remove("hidden");
}

function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			({ coords }) => {
				const lat = coords.latitude;
				const lon = coords.longitude;
				console.log(lat, lon);
				getData(lat, lon);
			},
			(error) => {
				displayError("Unable to fetch location: " + error.message);
			}
		);
	} else {
		displayError("Geolocation is not supported by this browser.");
	}
}

getLocation();
