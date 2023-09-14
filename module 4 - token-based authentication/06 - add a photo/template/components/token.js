/**
 * Save a token to localStorage
 * @param {String} token The token to save
 */
function setToken (token) {
    localStorage.setItem('token', token);
}

/**
 * Get a token from localStorage
 * @return {String} The token
 */
function getToken () {
    return localStorage.getItem('token');
}

/**
 * Remove the token from localStorage
 */
function removeToken () {
    localStorage.removeItem('token');
}


export {setToken, getToken, removeToken};