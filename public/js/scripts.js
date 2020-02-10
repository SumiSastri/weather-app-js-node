console.log('javascript working');
// cache-DOM - create data-attributes for data from API's
const searchLocation = document.querySelector('[data-city-search]');
const location = document.querySelector('[data-location]');
const status = document.querySelector('[data-status]');
const temperature = document.querySelector('[data-temperature]');
const precipitation = document.querySelector('[data-precipitation]');
const wind = document.querySelector('[data-wind]');

const searchBox = new google.maps.places.SearchBox(searchLocation);

searchBox.addListener('places_changed', () => {
	const place = searchBox.getPlaces()[0];
	if (place == null) return;
	// store api objects in a variable and stringify in the fetch method
	const latitude = place.geometry.location.lat();
	const longitude = place.geometry.location.lng();

	fetch('/api-weather', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify({
			latitude: latitude,
			longitude: longitude
		})
	})
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			// setWeatherData(data, place.formatted_address);
		});
});
