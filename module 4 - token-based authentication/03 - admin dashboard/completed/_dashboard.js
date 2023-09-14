// Headers
// Change origin if desired
let headers = new Headers({
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
	'Access-Control-Allow-Headers': '*'
});

/**
 * Check if token is for a valid session
 * @param  {String}  token The session token
 * @return {Boolean}       If true, user is logged in
 */
async function isLoggedIn (token) {

	// Check for token in database
	let session = await TOKENS.get(token);

	// If session exists, user is logged in
	return session === null ? false : true;

}

/**
 * Respond to the request
 * @param {Request} request
 */
async function handleRequest(request) {

	// Get token from request
	let token = new URL(request.url).searchParams.get('token');

	// If user is not logged in, return error
	let loggedIn = await isLoggedIn(token);
	if (!loggedIn) {
		return new Response('Not logged in', {
			status: 401,
			headers: headers
		});
	}

	// Get photos from database
	let photos = await PHOTOS.get('photos');

	// return a Response object
	return new Response(photos, {
		status: 200,
		headers: headers
	});

}

// Listen for API calls
addEventListener('fetch', function (event) {
	event.respondWith(handleRequest(event.request));
});