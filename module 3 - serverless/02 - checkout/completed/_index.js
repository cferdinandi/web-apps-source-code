// The photo data
let photos = [
	{
		"id": "anchor",
		"name": "Anchor",
		"url": "https://cdn.gomakethings.com/academy/ecommerce/anchor.jpg",
		"description": "A boat sits in a bay of gorgeous topaz water, an anchor line cast from her bow.",
		"price": 29
	},
	{
		"id": "jellyfish-2",
		"name": "Orange Bloom",
		"url": "https://cdn.gomakethings.com/academy/ecommerce/jellyfish2.jpg",
		"description": "A bloom of orange jellyfish drift through the lush blue ocean.",
		"price": 79
	},
	{
		"id": "compass",
		"name": "Compass",
		"url": "https://cdn.gomakethings.com/academy/ecommerce/compass.jpg",
		"description": "You're never lost if you know what you're going. A compass in the sand.",
		"price": 29
	},
	{
		"id": "starfish",
		"name": "Solo Starfish",
		"url": "https://cdn.gomakethings.com/academy/ecommerce/starfish.jpg",
		"description": "A lone starfish sits on the seafloor, hoping for a friend to come join him.",
		"price": 79
	},
	{
		"id": "hammerhead",
		"name": "From the Depths",
		"url": "https://cdn.gomakethings.com/academy/ecommerce/hammerhead.jpg",
		"description": "A hammerhead shark emerges from the dark depths.",
		"price": 129
	},
	{
		"id": "island-1",
		"name": "Desert Island",
		"url": "https://cdn.gomakethings.com/academy/ecommerce/island1.jpg",
		"description": "A deserted island beach, with cool blue water off to the right.",
		"price": 129
	},
	{
		"id": "island-2",
		"name": "Treasure Hideout",
		"url": "https://cdn.gomakethings.com/academy/ecommerce/island2.jpg",
		"description": "A rocky outcrop in a vast ocean, covered in trees and perfect for hiding treasure.",
		"price": 79
	},
	{
		"id": "island-3",
		"name": "Paradise",
		"url": "https://cdn.gomakethings.com/academy/ecommerce/island3.jpg",
		"description": "Sun sets on the horizon, as a flock of birds flies past the stolen boat used to navigate to this remote paradise.",
		"price": 129
	},
	{
		"id": "crab",
		"name": "Curious Crab",
		"url": "https://cdn.gomakethings.com/academy/ecommerce/crab.jpg",
		"description": "A crab skitters across the sand, the wet beach a blur behind him.",
		"price": 49
	},
	{
		"id": "turtle",
		"name": "Silly Sea Turtle",
		"url": "https://cdn.gomakethings.com/academy/ecommerce/turtle.jpg",
		"description": "A good luck charm for pirates, a curious sea turtle swims right past my camera. Is he after me treasure, or does he just want to say hi?",
		"price": 129
	},
	{
		"id": "jellyfish-3",
		"name": "Jellyfish in a Sunbeam",
		"url": "https://cdn.gomakethings.com/academy/ecommerce/jellyfish3.jpg",
		"description": "A lone jellyfish, suspended in a sunbeam, floats close the surface.",
		"price": 129
	},
	{
		"id": "kelp",
		"name": "Kelp Forest",
		"url": "https://cdn.gomakethings.com/academy/ecommerce/kelp.jpg",
		"description": "A blue forest of kelp rises from the dark sea floor to the light of the surface above.",
		"price": 49
	},
	{
		"id": "jolly-roger",
		"name": "Jolly Roger",
		"url": "https://cdn.gomakethings.com/academy/ecommerce/jollyroger.jpg",
		"description": "The pride of the fleet, the skull-and-crossbones hangs on the red wall, a single rose perched from her lips.",
		"price": 49
	},
	{
		"id": "sting-rays-1",
		"name": "Rays and Coral",
		"url": "https://cdn.gomakethings.com/academy/ecommerce/stingrays1.jpg",
		"description": "A pair of sting rays make their way past a school of fish on the edge of a coral reef.",
		"price": 49
	},
	{
		"id": "jellyfish-1",
		"name": "Rainbow Jellies",
		"url": "https://cdn.gomakethings.com/academy/ecommerce/jellyfish1.jpg",
		"description": "Three jellyfish in a rainbow of colors pulse through the dark waters.",
		"price": 49
	},
	{
		"id": "map",
		"name": "Treasure Map",
		"url": "https://cdn.gomakethings.com/academy/ecommerce/map.jpg",
		"description": "With this map, you'll always know where to find your buried treasure.",
		"price": 29
	},
	{
		"id": "sharks",
		"name": "Guardians of the Deep",
		"url": "https://cdn.gomakethings.com/academy/ecommerce/sharks.jpg",
		"description": "A school of sharks circles in the dark blue waters, providing natural protection for the treasures that lay on the nearby island.",
		"price": 29
	},
	{
		"id": "ship",
		"name": "Home, Sweet Home",
		"url": "https://cdn.gomakethings.com/academy/ecommerce/ship.jpg",
		"description": "The four masts of a gorgeous ship silhouette the clouds as the sun sets on the horizon.",
		"price": 129
	},
	{
		"id": "sting-rays-2",
		"name": "Sting Ray Taxi",
		"url": "https://cdn.gomakethings.com/academy/ecommerce/stingrays2.jpg",
		"description": "A large, aging ray provides a free ride to some grifters.",
		"price": 29
	},
	{
		"id": "treasure",
		"name": "Treasure!",
		"url": "https://cdn.gomakethings.com/academy/ecommerce/treasure.jpg",
		"description": "Me buried treasure sits at the base of the stone steps leading up to me hideout.",
		"price": 29
	}
];

/**
 * Respond to the request
 * @param {Request} request
 */
async function handleRequest(request) {

	let headers = new Headers({
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
		'Access-Control-Allow-Headers': '*'
	});

	// return a Response object
	return new Response(JSON.stringify(photos), {
		status: 200,
		headers: headers
	});

}

// Listen for API calls
addEventListener('fetch', function (event) {
	event.respondWith(handleRequest(event.request));
});