const express = require('express');
const app = express();
const port = 3000;

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config;
}
const DARKSKY_API_KEY = process.env.DARKSKY_API_KEY;

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
	res.send('home route working');
});

app.listen(port, () => console.log(`server connected on ${port}`));
