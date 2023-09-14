import {store, component} from 'https://cdn.jsdelivr.net/npm/reefjs@12/dist/reef.es.min.js';


// Hold cart data
let cart = store(JSON.parse(localStorage.getItem('cart')) || {});

/**
 * Add a photo to the cart
 * @param {String} id    The photo ID
 * @param {Object} photo The photo data
 */
function addToCart (id, photo) {
	cart[id] = photo;
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

/**
 * Get the items in the cart
 * @return {Array} The items in the cart
 */
function getCartItems () {
    let items = [];
    for (let key in cart) {
        items.push(cart[key]);
    }
    return items;
}

// Create cart count component
component('#cart-count', cartCountHTML);


export {addToCart, inCart, getCartItems};