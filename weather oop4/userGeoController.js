import { setInterface } from "./interface.js";
import { get, set } from "./storage/sorageUtils.js";
const locationInputRef = document.getElementById("location");
const errorRef = document.getElementById("error");

let locationInput = "";

export const userGetWeather = async () => {
	//listen for user input
	locationInputRef.addEventListener("input", async (e) => {
		locationInput = e.target.value;

		//validate
		const schema = joi.object({ location: joi.string().required().min(3) });

		try {
			await schema.validateAsync({ location: locationInput });
			errorRef.innerHTML = ``;

			let result;
			let dataFromDisk = get(locationInput);
			if (dataFromDisk) {
				result = dataFromDisk;
			} else {
				const { data } = await axios.get(
					`http://api.openweathermap.org/geo/1.0/direct?q=${locationInput},GB&limit=1&appid=37b29f091f8754cf8600dea56dee3863`
				);
				result = data;
			}

			console.log(result);

			if (result.length > 0) {
				set(locationInput, result);
				const { lat, lon } = result[0];
				const weather = await axios.get(
					`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=37b29f091f8754cf8600dea56dee3863`
				);

				//task to the setInterface stuff and it can sort the interface
				setInterface(weather.data);
			} else {
				errorRef.innerHTML = `Place not found`;
			}
		} catch (error) {
			console.log("Error", error, errorRef);
			errorRef.innerHTML = `Please check you input`;
		}
	});
};
