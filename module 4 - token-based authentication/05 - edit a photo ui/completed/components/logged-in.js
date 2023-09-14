import {getToken, removeToken} from './token.js';


/**
 * Log the user out
 * @return {Event} event The event object
 */
function clickHandler (event) {

    // Only run on logout links
    if (!event.target.matches('[href*="logout.html"]')) return;

    // Stop link from leaving page
    event.preventDefault();

    // Update the link
    event.target.parentNode.textContent = 'Logging out...';

    // Call the logout API
    fetch('https://academy-expert-users.gomakethings.workers.dev', {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    });

    // Remove the token
    removeToken();

    // Redirect to login page
    window.location.href = 'login.html';

}

// Check if user token is valid
if (!getToken()) {
	window.location.href = 'login.html';
}

// Otherwise, listen for click events on the logout link
document.addEventListener('click', clickHandler);