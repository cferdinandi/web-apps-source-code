/*

	Call the API from a browser using the fetch() method.
	Change the endpoint to point to your serverless function.

	fetch('https://guide-multiple-domains.gomakethings.workers.dev').then(function (response) {
		if (response.ok) {
			return response.json();
		}
		throw response.status;
	}).then(function (data) {
		console.log(data);
	}).catch(function (error) {
		console.warn(error);
	});

*/


/**
 * Respond to the request
 * @param {Request} request
 */
async function handleRequest(request) {

	// Define response headers
	let headers = new Headers({
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
		'Access-Control-Allow-Headers': '*'
	});

	// Allowed domain origins
	let allowed = ['https://gomakethings.com', 'https://vanillajsguides.com'];

	// If domain is not allowed, return error code
	if (!allowed.includes(request.headers.get('origin'))) {
		return new Response('Not allowed', {
			status: 403,
			headers: headers
		});
	}

	// return a Response object
	return new Response(JSON.stringify({
		greeting: 'Hi, Universe!'
	}), {
		status: 200,
		headers: headers
	});

}

// Listen for API calls
addEventListener('fetch', function (event) {
	event.respondWith(handleRequest(event.request));
});