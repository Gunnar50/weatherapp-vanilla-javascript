import { findUser } from "./findUserController.js";
import { getUserLocation } from "./inputController.js";
import { getAutoGeoLocation } from "./weatherController.js";

getAutoGeoLocation();
findUser();
getUserLocation();
