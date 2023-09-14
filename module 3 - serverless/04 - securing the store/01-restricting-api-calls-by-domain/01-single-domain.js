/*

	Call the API from a browser using the fetch() method.
	Change the endpoint to point to your serverless function.

	fetch('https://guide-single-domain.gomakethings.workers.dev').then(function (response) {
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
		'Access-Control-Allow-Origin': 'https://gomakethings.com',
		'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
		'Access-Control-Allow-Headers': '*'
	});

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