import { errorMessages } from "../config.js";
import { createErrorMessage } from "../utils.js";

export function getUserLocation() {
	return new Promise((resolve, reject) => {
		if (!navigator.geolocation) {
			console.log("Geolocation is not supported by this browser.");
			return;
		}

		navigator.geolocation.getCurrentPosition(
			({ coords }) => {
				resolve(coords);
			},
			(error) => {
				reject(error);
				console.log(
					"GeoLocation error, unable to fetch location: " + error.message
				);
				// handle the error when user denies access.
				// send to the default location.
				// show a message saying the user denied access to geolocation
				// access to location denied. please search for a location manually.
				createErrorMessage(
					"Access to location denied. please search for a location manually",
					5000
				);
			}
		);
	});
}
