/**
 * Respond to the request
 * @param {Request} request
 */
async function handleRequest(request) {

	let headers = new Headers({
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
		'Access-Control-Allow-Headers': '*'
	});

	// Get photos from the database
	let photos = await PHOTOS.get('photos');

	// Otherwise, return photos
	return new Response(photos, {
		status: 200,
		headers: headers
	});

}

// Listen for API calls
addEventListener('fetch', function (event) {
	event.respondWith(handleRequest(event.request));
});