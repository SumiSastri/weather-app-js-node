console.log('javascript working');
// cache-DOM - create data-attributes for data from API's
const searchLocation = document.querySelector('[data-city-search]');
// use google places API
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
			setWeatherData(data, place.formatted_address);
		});
});
const updateLocation = document.querySelector('[data-location]');
const updateSummary = document.querySelector('[data-summary]');
const updateTemperature = document.querySelector('[data-temperature]');
const updatePrecipitation = document.querySelector('[data-precipitation]');
const updateWind = document.querySelector('[data-wind]');
function setWeatherData(data, place) {
	updateLocation.textContent = place;
	updateSummary.textContent = `Summary: ${data.summary}`;
	updateTemperature.textContent = `Temperature: ${data.temperature} degrees`;
	updatePrecipitation.textContent = `Likelihood of rain: ${data.precipProbability * 100}%`;
	updateWind.textContent = `Wind Speed (miles/km ph): ${data.windSpeed}`;
}
