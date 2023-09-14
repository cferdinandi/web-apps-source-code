/**
 * Get the photo ID from the URL
 * @return {String} The photo ID
 */
function getPhotoID () {
	return new URL(window.location.href).searchParams.get('id');
}

/**
 * Get a photo by its ID
 * @param  {Array}  photos All photos
 * @param  {String} id     The ID of the photo to get
 * @return {Object}        The photo data
 */
function getPhotoByID (photos, id) {
	return photos.find(function (photo) {
		return photo.id === id;
	});
}


export {getPhotoID, getPhotoByID};