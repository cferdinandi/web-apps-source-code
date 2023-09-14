/*

	Call the API from a browser using the fetch() method.
	Change the endpoint to point to your serverless function.

	fetch('https://guide-nyt.gomakethings.workers.dev').then(function (response) {
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
		'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
		'Access-Control-Allow-Headers': '*'
	});

	// return the request to the real API
	return fetch(`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${API_KEY}`);

}

// Listen for API calls
addEventListener('fetch', function (event) {
	event.respondWith(handleRequest(event.request));
});