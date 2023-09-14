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

/**
 * Serialize all form data into an object
 * @param  {FormData} data The FormData object to serialize
 * @return {String}        The serialized form data
 */
function serialize (data) {
    let obj = {};
    for (let [key, value] of data) {
        if (obj[key] !== undefined) {
            if (!Array.isArray(obj[key])) {
                obj[key] = [obj[key]];
            }
            obj[key].push(value);
        } else {
            obj[key] = value;
        }
    }
    return obj;
}


export {getPhotoID, getPhotoByID, serialize};