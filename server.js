const express = require('express');
const app = express();
const port = 3000;

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}
const APIKEYNAME_API_KEY = process.env.APIKEYNAME_API_KEY;

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
	res.send('home route working');
});

app.post('/weather', (req, res) => {
	console.log(req.body);
});

app.listen(port, () => console.log(`server connected on ${port}`));
