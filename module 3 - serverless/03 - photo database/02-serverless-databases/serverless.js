/*

	Call the API from a browser using the fetch() method.
	Change the endpoint to point to your serverless function.

	fetch('https://guide-db.gomakethings.workers.dev?key=Merlin').then(function (response) {
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

	// Handle the OPTIONS method
	if (request.method === 'OPTIONS') {
		return new Response(null, {
			status: 200,
			headers: headers
		});
	}

	// Handle the GET method
	if (request.method === 'GET') {

		// Get the request body
		let params = new URL(request.url).searchParams;
		let key = params.get('key');

		// Get the wizard data
		let wizard = await WIZARDS.get(key, {type: 'json'});

		// If there's no wizard data
		if (wizard === null) {
			return new Response('Wizard not found', {
				status: 404,
				headers: headers
			});
		}

		// Otherwise, return the wizard data
		return new Response(JSON.stringify({
			wizard: wizard
		}), {
			status: 200,
			headers: headers
		});

	}

}

// Listen for API calls
addEventListener('fetch', function (event) {
	event.respondWith(handleRequest(event.request));
});