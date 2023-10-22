import { findUser } from "./controllers/findUserController.js";
import { getUserLocation } from "./controllers/inputController.js";
import { getAutoGeoLocation } from "./controllers/weatherController.js";

getAutoGeoLocation();
findUser();
getUserLocation();
