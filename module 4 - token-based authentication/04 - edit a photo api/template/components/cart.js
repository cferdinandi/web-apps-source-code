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
 * Empty cart
 */
function emptyCart () {
	cart = store({});
	localStorage.removeItem('cart');
}

/**
 * Get cart data from the URL
 * @return {Object} Cart data
 */
function getCartFromURL () {
	let items = new URL(window.location.href).searchParams.get('cart');
	if (!items) return;
	return items.split(',');
}

/**
 * Restore the cart
 */
function restoreCart () {

	// Check for cached cart in URL
	let cartInURL = getCartFromURL();
	if (!cartInURL) return;

	// Empty the current cart data, if any
	emptyCart();

	// Load new cart data
	for (let id of cartInURL) {
		cart[id] = true;
	}

	// Save to local storage
	localStorage.setItem('cart', JSON.stringify(cart));

	// Update the URL
	let url = new URL(window.location.href);
	url.searchParams.delete('cart');
	history.replaceState(history.state, '', url);

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

/**
 * Get data for just photos that are in the cart
 * @param  {Array}  photos All photos
 * @return {Array}         Photos in the cart
 */
function getPhotosInCart (photos) {
	return photos.filter(function (photo) {
		return inCart(photo.id);
	});
}

/**
 * Get data for just photos that are in the cart
 * @param  {Array}  photos All photos
 * @return {Array}         Photos in the cart
 */
function getPhotosFromURL (photos) {
	let cart = getCartFromURL();
	if (!cart) return [];
	return photos.filter(function (photo) {
		return cart.includes(photo.id);
	});
}

// Create cart count component
component('#cart-count', cartCountHTML);


export {addToCart, removeFromCart, emptyCart, restoreCart, inCart, getPhotosInCart, getPhotosFromURL};