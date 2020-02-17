console.log('javascript working');
const searchLocation = document.querySelector('[data-city-search]');
const searchBox = new google.maps.places.SearchBox(searchLocation);
searchBox.addListener('places_changed', () => {
	const place = searchBox.getPlaces()[0];
	if (place == null) return;
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
			setWeatherData(data, place.formatted_address);
		})
		.catch((err) => {
			throw `Error: ${err}`;
		});
});
const icon = new Skycons({ color: '' });
const updateLocation = document.querySelector('[data-location]');
const updateSummary = document.querySelector('[data-summary]');
const updateTemperature = document.querySelector('[data-temperature]');
const updatePrecipitation = document.querySelector('[data-precipitation]');
const updateWind = document.querySelector('[data-wind]');

function setWeatherData(data, place) {
	updateLocation.textContent = place;
	updateSummary.textContent = `Summary: ${data.summary}`;
	updateTemperature.textContent = `Temperature: ${Math.round(data.temperature)} degrees`;
	updatePrecipitation.textContent = `Likelihood of rain: ${Math.round(data.precipProbability * 100)}%`;
	updateWind.textContent = `Wind Speed (miles/km ph): ${Math.round(data.windSpeed)}`;
	icon.set('icon', data.icon);
	icon.play();
}

// DATE display - trial code
// const daysOfTheWeek = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];
// const monthsOfTheYear = [
// 	'January',
// 	'February,',
// 	'March',
// 	'April',
// 	'May',
// 	'June',
// 	'July',
// 	'Aug',
// 	'Sept',
// 	'Oct',
// 	'Nov',
// 	'Dec'
// ];
// const timeStamp = new Date(data.currently.time * 1000);
// const forecastDate = `${daysOfTheWeek[timeStamp.getDay()]} ${monthsOfTheYear[
// 	timeStamp.getMonth()
// ]} ${timeStamp.getDate()}}`;
