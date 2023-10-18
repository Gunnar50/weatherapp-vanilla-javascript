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
				console.log("Unable to fetch location: " + error.message);
				// handle the error when user denies access
			}
		);
	});
}
