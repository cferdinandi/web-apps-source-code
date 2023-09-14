import {store, component} from 'https://cdn.jsdelivr.net/npm/reefjs@12/dist/reef.es.min.js';


// Hold cart data
let cart = store(JSON.parse(localStorage.getItem('cart')) || {});

/**
 * Add a photo to the cart
 * @param {String} id The photo ID
 */
function addToCart (id) {
	cart[id] = true;
	localStorage.setItem('cart', JSON.stringify(cart));
}

/**
 * Remove a photo from the cart
 * @param  {String} id The photo ID
 */
function removeFromCart (id) {
	delete cart[id];
	localStorage.setItem('cart', JSON.stringify(cart));
}

/**
 * Check if an item is in the cart
 * @param  {String}  id The photo ID
 * @return {Boolean}    If true, the item is in the cart
 */
function inCart (id) {
	return cart[id];
}

/**
 * Get the cart count HTML
 * @return {String} The cart count HTML string
 */
function cartCountHTML () {
	return `(${Object.keys(cart).length})`;
}

// Create cart count component
component('#cart-count', cartCountHTML);


export {addToCart, removeFromCart, inCart};