import {getToken, removeToken} from './token.js';
import {dashURL} from './endpoints.js';


/**
 * Fetch photos from the API
 */
async function getPhotos () {

	// Get photos from API
	let response = await fetch(`${dashURL}?token=${getToken()}`);

	// If user is not logged in, redirect
	if (response.status === 401) {
		removeToken();
		window.location.href = 'login.html';
	}

	// Otherwise, return photos
	return await response.json();

}


export {getPhotos};