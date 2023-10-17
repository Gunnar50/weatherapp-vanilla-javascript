import { browserGetWeather } from "./browserGeoController.js";
import { userGetWeather } from "./userGeoController.js";

//listen for user clicking geo location button
const getLocationButtonRef = document.getElementById("getLocation");
getLocationButtonRef.addEventListener("click", () => {
  browserGetWeather();
});

//start listening for user input
userGetWeather();
