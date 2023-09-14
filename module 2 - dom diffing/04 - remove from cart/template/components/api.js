/**
 * Save photos to session storage
 * @param  {Array} photos The photo data
 */
function savePhotos (photos) {
	sessionStorage.setItem('photos', JSON.stringify(photos));
}

/**
 * Get saved photo data from session storage
 * @return {Array} The photo data
 */
function getSavedPhotos () {
	return JSON.parse(sessionStorage.getItem('photos'));
}

/**
 * Fetch photos from the API
 */
async function getPhotos () {

	// Check for saved data
	let saved = getSavedPhotos();
	if (saved) {
		return saved;
	}

	// Otherwise, fetch fresh data from the API
	try {
		let response = await fetch('https://vanillajsacademy.com/api/photos.json');
		if (!response.ok) throw response;
		let photos = await response.json();
		savePhotos(photos);
		return photos;
	} catch (error) {
		console.warn(error);
		return [];
	}

}


export {getPhotos};