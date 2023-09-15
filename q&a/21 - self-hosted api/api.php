<?php


	//
	// Utility Methods
	// I usually keep this in a separate file for reuse across APIs
	//

	/**
	 * Get the API method
	 * @return String The API method
	 */
	function get_method () {
		return $_SERVER['REQUEST_METHOD'];
	}

	/**
	 * Get data object from API data
	 * @return Object The data object
	 */
	function get_request_data () {
		return array_merge(empty($_POST) ? array() : $_POST, (array) json_decode(file_get_contents('php://input'), true), $_GET);
	}

	/**
	 * Check if request is not Ajax
	 * @return Boolean If true, is not Ajax
	 */
	function is_not_ajax () {
		return empty($_SERVER['HTTP_X_REQUESTED_WITH']) || strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) !== 'xmlhttprequest';
	}

	/**
	 * Send an API response
	 * @param  *       $response The API response
	 * @param  integer $code     The response code
	 * @param  boolean $encode   If true, encode response
	 */
	function send_response ($response, $code = 200) {
		http_response_code($code);
		die(json_encode($response));
	}



	//
	// The API
	//

	// Bail if not an Ajax request
	if (is_not_ajax()) {
		header('Location: ' . $_SERVER['HTTP_REFERER']);
		return;
	}

	// Get the API method
	$method = get_method();

	// Get any data sent with the request
	// Includes query parameters, post data, and body content
	$data = get_request_data();


	// GET request
	// Get some data and respond with it
	if ($method === 'GET') {

		// You'd normally do stuff here...
		// Let's just send back a success message
		send_response([
			'status' => 'success',
			'message' => 'You did it, dude!',
		]);

	}


	// POST request
	// Store some data or something
	if ($method === 'POST') {

		// You'd normally do stuff here...

		// Example: Check that all required data was provided
		if (empty($data['favorite'])) {
			send_response([
				'status' => 'failed',
				'message' => 'Please provide a favorite movie.',
			], 400);
		}

		// If there are no issues, save your data or something...

		// Then, respond with a success
		send_response([
			'status' => 'success',
			'message' => 'This movie was saved to your favorites!',
		]);

	}


	// All other request methods
	send_response(array(
		'code' => 405,
		'status' => 'failed',
		'message' => 'Method not allowed'
	), 405);