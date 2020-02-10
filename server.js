const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios');

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}
const DARKSKY_API_KEY = process.env.DARKSKY_API_KEY;

app.use(express.json());
app.use(express.static('public'));

app.post('/api-weather', (req, res) => {
	const url = `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${req.body.latitude},${req.body
		.longitude}?units=auto`;
	// console.log(req.body);
	axios({
		url: url,
		responseType: 'json'
	}).then((data) => res.json(data.data.currently));
});

app.listen(port, () => console.log(`server connected on ${port}`));
