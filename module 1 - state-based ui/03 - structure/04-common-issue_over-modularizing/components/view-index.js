import {getPhotos} from './api.js';
import {photosHTML} from './html.js';


// Get the #app element
let app = document.querySelector('#app');

// Initialize
getPhotos().then(function (photos) {
    app.innerHTML = photoHTML(photos);
});