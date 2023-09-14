/**
 * Get the user token from the API request
 * @param  {Request} request The request object
 * @return {String}          The session token
 */
function getToken (request) {

	// If GET request, get query parameter
	if (request.method === 'GET') {
		return new URL(request.url).searchParams.get('token');
	}

	// Otherwise, get authorization header
	let [scheme, encoded] = request.headers.get('Authorization').split(' ');

	// if Bearer, get token
	if (scheme === 'Bearer') {
		return encoded;
	}

}