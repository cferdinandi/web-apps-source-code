<?php

	/**
	 * Get file
	 * @param  String  $filename  The filename
	 * @param  *       $fallback  Fallback content if the file isn't found
	 * @param  Boolean $as_string Return string instead of decoded object
	 * @return *                The file content
	 */
	function get_file ($filename, $fallback = '{}') {

		// File path
		$path = dirname(__FILE__) . '/keep-out/' . $filename . '.json';

		// If file exists, return it
		if (file_exists($path)) {
			$file = file_get_contents($path);
			return json_decode($file, true);
		}

		// Otherwise, return a fallback
		return json_decode($fallback, true);

	}

	/**
	 * Create/update a file
	 * @param String $filename The filename
	 * @param *      $content  The content to save
	*/
	function set_file ($filename, $content, $fallback = '{}') {

		// File path
		$path = dirname(__FILE__) . '/keep-out/' . $filename . '.json';

		// If there's no content but there's a fallback, use it
		if (empty($content)) {
			file_put_contents($path, $fallback);
			return;
		}

		// Otherwise, save the content
		file_put_contents($path, json_encode($content));

	}

	/**
	 * Delete a file
	 * @param String $filename The filename
	*/
	function remove_file ($filename) {
		if (empty($filename)) return;
		if (!file_exists($filename)) return;
		unlink(dirname(__FILE__) . '/keep-out/' . $filename . '.json');
	}

	/**
	 * Rename a file
	 * @param  String $old The old filename
	 * @param  String $new The new filename
	 */
	function rename_file ($old, $new) {
		rename(dirname(__FILE__) . '/keep-out/' . $old . '.json', dirname(__FILE__) . '/keep-out/' . $new . '.json');
	}