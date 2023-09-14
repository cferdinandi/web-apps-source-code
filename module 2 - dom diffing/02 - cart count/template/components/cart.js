// Hold cart data
let cart = JSON.parse(localStorage.getItem('cart')) || {};

/**
 * Add a photo to the cart
 * @param {String} id The photo ID
 */
function addToCart (id) {
	cart[id] = true;
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


export {addToCart, inCart};