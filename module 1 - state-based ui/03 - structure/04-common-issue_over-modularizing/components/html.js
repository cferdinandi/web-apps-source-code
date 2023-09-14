import {getPhotoID, getPhotoByID} from './utilities.js';


/**
 * Generate an HTML of available photos
 * @param  {Object} photos The photo data
 * @return {String}        A list of available photos
 */
function photosHTML (photos) {

	// If there are no photos
	if (!photos.length) {
		return '<p>There are no available photos at this time. Please try again later. Sorry!</p>';
	}

	// Otherwise, show photos
	return `
		<p>High-end photography from the Seven Seas, brought to you by world-famous photographer Captain Jack Sparrow.</p>
		<div id="photos">
			${photos.map(function (photo) {
				return `
					<div class="photo">
						<a href="/photo.html?id=${encodeURIComponent(photo.id)}">
							<img alt="${photo.description}" src="${photo.url}">
							<div>${photo.name}</div>
						</a>
					</div>`;
			}).join('')}
		</div>`;

}

/**
 * The HTML string for when no photo is found
 * @return {String} The HTML string
 */
function noPhotoHTML () {
	return `
		<h1>Uh oh!</h1>
		<p>This photo is missing. Sorry!</p>`;
}

/**
 * Generate an HTML of available photos
 * @param  {Object} photos The photo data
 * @return {String}        The photo HTML string
 */
function photoHTML (photos) {

	// Get the photo ID
	let id = getPhotoID();
	if (!id) return noPhotoHTML();

	// Get the photo data
	let photo = getPhotoByID(photos, id);
	if (!photo) return noPhotoHTML();

	// Update the document.title
	document.title = `${photo.name} | ${document.title}`;

	// Show the photo
	return `
		<h1>${photo.name}</h1>
		<p><img alt="" src="${photo.url}"></p>
		<p>${photo.description}</p>`;

}


export {photosHTML, photoHTML};