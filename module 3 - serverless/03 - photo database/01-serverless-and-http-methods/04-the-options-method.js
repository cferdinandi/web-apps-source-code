/*

	Call the API from a browser using the fetch() method.
	Change the endpoint to point to your serverless function.

	fetch('https://guide-options-method.gomakethings.workers.dev', {
		method: 'OPTIONS'
	}).then(function (response) {
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
		'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
		'Access-Control-Allow-Headers': '*'
	});

	// Handle the OPTIONS method
	if (request.method === 'OPTIONS') {
		return new Response(null, {
			status: 200,
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