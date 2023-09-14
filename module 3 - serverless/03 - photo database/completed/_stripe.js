/**
 * Create a PHP-style query string from an object
 * @param  {Object} data   The data to serialize into a string
 * @param  {String} prefix The prefix to use before the string
 * @return {String}        The serialized query string
 */
function buildQuery (data, prefix) {

	// Determine the data type
	var type = Object.prototype.toString.call(data).slice(8, -1).toLowerCase();

	// Loop through the object and create the query string
	return Object.keys(data).map(function (key, index)  {

		// Cache the value of the item
		var value = data[key];

		// Add the correct string if the object item is an array or object
		if (type === 'array') {
			key = prefix + '[' + index + ']';
		} else if (type === 'object') {
			key = prefix ? prefix + '[' + key + ']' : key;
		}

		// If the value is an array or object, recursively repeat the process
		if (typeof value === 'object') {
			return buildQuery(value, key);
		}

		// Join into a query string
		return key + '=' + encodeURIComponent(value);

	}).join('&');

}

/**
 * Respond to the request
 * @param {Request} request
 */
async function handleRequest(request) {

	let headers = new Headers({
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'HEAD, POST, OPTIONS',
		'Access-Control-Allow-Headers': '*'
	});

	// Catch-all for non-POST request types
	if (request.method !== 'POST') {
		return new Response('ok', {
			status: 200,
			headers: headers
		});
	}

	// Get checkout session token
	try {

		// Get the request data
		let body = await request.json();
		let {line_items, success_url, cancel_url} = body;

		// Call the Stripe API
		let stripeRequest = await fetch('https://api.stripe.com/v1/checkout/sessions', {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${API_TOKEN}`,
				'Content-type': 'application/x-www-form-urlencoded'
			},
			body: buildQuery({
				payment_method_types: ['card'],
				mode: 'payment',
				line_items,
				success_url,
				cancel_url
			})
		});

		// Get the API response
		let stripeResponse = await stripeRequest.json();

		// Return the data
		return new Response(JSON.stringify(stripeResponse), {
			status: 200,
			headers: headers
		});

	} catch (error) {
		return new Response('Unable to reach API', {
			status: 500,
			headers: headers
		});
	}

}

// Listen for API calls
addEventListener('fetch', function (event) {
	event.respondWith(handleRequest(event.request));
});