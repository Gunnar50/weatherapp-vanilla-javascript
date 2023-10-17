const root = document.getElementById("root");

export const getWeatherStartingAt = (weather) => {
  const index = weather.list.findIndex((item) => {
    const date = new Date(item.dt * 1000);
    if (date.getHours() === 7) {
      return true;
    }
  });
  weather.list.splice(0, index);

  return weather;
};

export const setInterface = (weather) => {
  const html = getWeatherStartingAt(weather).list.map((item, i) => {
    if (i % 8 !== 0) {
      return;
    }

    return createWeatherItem(item);
  });

  root.innerHTML = html.join("");
};

export const createWeatherItem = (item) => {
  return `<div>
            <h1>The weather at ${new Date(item.dt * 1000).toLocaleString()} is:
            </h1>
            <p>Temp: ${Math.round(item.main.temp - 271.15)}&deg;</p>
            <p>Humidity: ${Math.round(item.main.humidity)}%</p>
            <p>Description ${item.weather[0].description}</p>
            <img src="http://openweathermap.org/img/wn/${
              item.weather[0].icon
            }.png" alt="${item.weather[0].description}">
          </div>`;
};
