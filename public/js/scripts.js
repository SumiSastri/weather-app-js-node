console.log('javascript working');
// cache DOM
const searchElement = document.querySelector('[data-city-search]');
const searchBox = new google.maps.places.SearchBox(searchElement);
searchBox.addListener('places_changed', () => {
	const place = searchBox.getPlaces()[0];
	if (place == null) return;
	// store api objects in a variable and stringify in the fetch method
	const latitude = place.geometry.location.lat();
	const longitude = place.geometry.location.lng();
	fetch('/weather', {
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify({
			latitude: latitude,
			longitude: longitude
		})
	})
		.then((res) => res.json())
		.then((data) => {
			setWeatherData(data.place.formatted_address);
		});
});
