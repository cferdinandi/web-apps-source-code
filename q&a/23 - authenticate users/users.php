<?php

	include_once(dirname( __FILE__) . '/files.php');


	/**
	 * Create a user
	 * @param  string $username The username
	 * @param  string $pw       The user password
	 */
	function create_user ($username, $pw) {

		// Create the user
		$user = array(
		    'pw' => password_hash($pw, PASSWORD_DEFAULT)
		);

		// Save user to a flat JSON file
		set_file('users/' . $username, $user);

	}

	/**
	 * Verify user credentials
	 * @param  string  $username The username
	 * @param  string  $pw       The user password
	 * @return boolean           If true, credentials are valid
	 */
	function are_credentials_valid ($username, $pw) {

		// Get the user associated with the username
		$user = get_file('users/' . $username);
		if (empty($user)) return false;

		// Validate the provided password
		$is_valid = password_verify($pw, $user['pw']);
		if (!$is_valid) return false;

		// Otherwise, return true
		return true;

	}

	/**
	 * Log a user in
	 * @param  string  $username The username
	 * @param  string  $pw       The user password
	 * @return boolean           If true, credentials are valid
	 */
	function login ($username, $pw) {

		// Validate credentials
		if (!are_credentials_valid($username, $pw)) return false;

		// Create a token details
		$expires = time() + (60 * 60 * 24 * 14);
		$token = '_' . $expires . '_' . bin2hex(openssl_random_pseudo_bytes(60));

		// Set cookie
		$cookie = setcookie('session_token', $token, $expires, '/', '', true, true);

		// Save token details to server
		$token_val = array(
		    'user' => $username,
		    'expires' => $expires,
		);
		set_file('tokens/' . $token, $token_val);

		// Confirm success
		return true;

	}