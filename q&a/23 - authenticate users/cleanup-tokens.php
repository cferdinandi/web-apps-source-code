<?php

	// Loop through tokens
	foreach (new DirectoryIterator(dirname(__FILE__) . '/tokens') as $fileInfo) {

	    // If a . file, skip
	    if ($fileInfo->isDot()) continue;

	    // Get expiration date
	    $expires = intval(explode('_', $fileInfo->getFilename())[1]);

	    // If token/key has expired, remove it
	    if ($expires < time()) {
	        unlink($fileInfo->getPathname());
	    }

	}