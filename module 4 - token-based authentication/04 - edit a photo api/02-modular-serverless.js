// Define response headers
let headers = new Headers({
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
	'Access-Control-Allow-Headers': '*'
});

/**
 * Handle GET requests
 * @param  {Request} request The request object
 * @return {Response}        The response
 */
async function handleGET (request) {

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

/**
 * Handle PUT requests
 * @param  {Request} request The request object
 * @return {Response}        The response
 */
async function handlePUT (request) {

	// Get the request body
	let body = await request.json();

	// Save or update the data in the database
	let data = {
		spell: body.spell,
		pet: body.pet
	};
	let wizard = await WIZARDS.put(body.wizard, JSON.stringify(data));

	// If the wizard wasn't saved
	if (wizard === null) {
		return new Response('Wizard not saved', {
			status: 404,
			headers: headers
		});
	}

	// Otherwise, return the wizard data
	return new Response(JSON.stringify({
		wizard: data
	}), {
		status: 200,
		headers: headers
	});

}

/**
 * Handle POST requests
 * @param  {Request} request The request object
 * @return {Response}        The response
 */
async function handlePOST (request) {

	// Get the request body
	let body = await request.json();

	// Check if the item already exists
	let existing = await WIZARDS.get(body.wizard);
	if (existing) {
		return new Response('Wizard already exists', {
			status: 409,
			headers: headers
		});
	}

	// Save or update the data in the database
	let data = {
		spell: body.spell,
		pet: body.pet
	};
	let wizard = await WIZARDS.put(body.wizard, JSON.stringify(data));

	// If the wizard wasn't saved
	if (wizard === null) {
		return new Response('Wizard not saved', {
			status: 404,
			headers: headers
		});
	}

	// Otherwise, return the wizard data
	return new Response(JSON.stringify({
		wizard: data
	}), {
		status: 200,
		headers: headers
	});

}

/**
 * Handle DELETE requests
 * @param  {Request} request The request object
 * @return {Response}        The response
 */
async function handleDELETE (request) {

	// Get the request body
	let body = await request.json();

	// Delete the wizard from the database
	let wizard = await WIZARDS.delete(body.wizard);

	// Confirm the deletion
	return new Response(JSON.stringify({
		wizard: body.wizard
	}), {
		status: 200,
		headers: headers
	});

}

/**
 * Respond to the request
 * @param {Request} request
 */
async function handleRequest(request) {

	// Handle the OPTIONS method
	if (request.method === 'OPTIONS') {
		return new Response(null, {
			status: 200,
			headers: headers
		});
	}

	// Handle the GET method
	if (request.method === 'GET') {
		return await handleGET(request);
	}

	// Handle the PUT method
	if (request.method === 'PUT') {
		return await handlePUT(request);
	}

	// Handle the POST method
	if (request.method === 'POST') {
		return await handlePOST(request);
	}

	// Handle the DELETE method
	if (request.method === 'DELETE') {
		return await handleDELETE(request);
	}

	// Catchall response
	return new Response('Invalid HTTP method', {
		status: 405,
		headers: headers
	});

}

// Listen for API calls
addEventListener('fetch', function (event) {
	event.respondWith(handleRequest(event.request));
});