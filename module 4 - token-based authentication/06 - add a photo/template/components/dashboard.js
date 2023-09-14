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

/**
 * Edit photo data
 * @param {Object} data The photo data
 */
async function editPhoto (data) {

	// Get photos from API
	let response = await fetch(dashURL, {
		method: 'PUT',
		body: JSON.stringify(data),
		headers: {
			'Content-type': 'application/json',
			'Authorization': `Bearer ${getToken()}`
		}
	});

	// Return status
	return await response.text();

}


export {getPhotos, editPhoto};