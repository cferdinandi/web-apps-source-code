import {getToken, removeToken} from './token.js';
import {dashURL} from './endpoints.js';


/**
 * Fetch photos from the API
 */
async function getPhotos () {

	// Get the user token
	let token = getToken();

	// If there's no token
	if (!token) {
		window.location.href = 'login.html';
		return;
	}

	// Get photos from API
	let response = await fetch(`${dashURL}?token=${token}`);

	// Otherwise, return photos
	return await response.json();

}


export {getPhotos};