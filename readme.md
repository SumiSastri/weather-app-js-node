## Weather-app using node.js and vanilla javascript

This is a simple weather app using 2 external API's Dark Sky and Google. The learning objective is to understand how external API's work and to protect API-keys by building out a backend environment with node.js and a server with express.js

## API's

Application Programming Interfaces allow a transfer of data (resources) from clients to servers. Data is transported in Java Script Object Notation(JSON) files or XML files. It is an architectural style used for client-server communications.

## External API's 

An external API allows you to access data from a third-party database with an API-key. The google API is free, while many external API's have tiered payments for API use starting with a freemium model and scaling up to a premium model. 

## API-key protection

To protect your API-keys setting up a backend server with express, using node as the environment, API-keys can be saved as a dev dependency and excluded from files that are submitted to github with a gitignore file as well as files that are submitted to a production environment if the app is deployed.

## Scaffolding 

- mkdir [name of directory]
- cd into the directory install node modules - [npm init] 
- install production dependencies [npm i axios express]
- install dev dependencies [npm i --save-dev nodemon dotenv]
- set up a gitignore file to ignore data from node and the dotenv file

```
.env
node_modules
```
- in package JSon run your start script

```
"scripts": {
		"devStart": "nodemon server.js"
	},
```    

## Version control - GitHub

- create a git repo
- link files to origin
- add and commit initial files

## Branch 1 server-set-up

Express is a node package that you can download and create a server for development purposes. You can access external API data with the ```fetch API``` or create your own routes from a unique resource locator (URL) with the Express router module.

To connect routes, you set up a local host port and create a route (localhost:3000/name-of-route) for the API calls. This allows you to
 - get data (a resource) from the local host URL
 - post data (the resource) from the local host URL (by sending a request) to a database
 - getting back the response from the database with the resource required
 - updating the data (resource) on the local host URL with the data (resource, payload) of the data from the database

With an external API as you are not setting up your own routes

```
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
	res.send('home route working');
});

app.listen(port, () => console.log(`server connected on ${port}`));
```   

 - set up your server and your home route and make sure the route works 
 - run start script 
```npm run start```
- go to home route
 ```localhost:3000/```

if it does not work, debug at this stage

- Once server is connected set up midware -  Use the JSOn parser as midware in the server ```app.use(bodyParser.json());``` to connect the responses and requests which will be transfered in their representational state as a JSOn file. Because the API is a layered system, the order of how the middleware is stacked is important. The request goes first through the parser, then to the routes and then parses the body of the text in the routes. 

```
    app.use(express.json());
    app.use(express.static('public'));

    app.get('/', (req, res) => {
        res.send('home route working');
    });
```

Now you are set to set up your environment keys safely
- check that the dotenv file is in your gitignore file 
[.env]

- create a dotenv file to store the keys
[touch .env]

```
APINAME_API_KEY=<your key>
```

- go to your server.js file and ensure that the .env files are not included in the development files

```
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}
const APIKEYNAME_API_KEY = process.env.APIKEYNAME_API_KEY;
```
- Commit files and check that files are not included

## Branch 2 debugging

As soon as you hit a problem set up a debugging branch

Debugging at this stage
- check your gitignore files
- check your dotenv files (.env)
- check your code in your server
- make sure you are using placeholders at this stage APIKEYNAME and <your key> so that when you debug and commit you are not exposing your key
-  To stop tracking a file that is currently tracked, use git rm --cached set up .env files and ensure they are in gitignore files [https://help.github.com/en/github/using-git/ignoring-files] / [https://git-scm.com/docs/gitignore] username:password - remove <> which are placeholders

Once you can see your dotenv files are not tracked merge the bug branch to master and you can add the API keys safely once you have connected the front end files to the back-end server.

## Branch 3 html-set-up
[mkdir public folder] cd into folder add the html file and create directories to separate css and js files
[mkdir css js] add the styles.css and scripts.js files in their respective directories
Set up your app with the key information you want to extract from the Dark Sky API, check render with a hello world tag and then check the render of each of the elements you are setting up.

## Branch 4 javascript-dom-connections

- API set up
- Set up Dark Sky account and get key
Dark Sky [https://darksky.net/dev]
SkyCons [https://cdnjs.cloudflare.com/ajax/libs/skycons/1396634940/skycons.min.js]

- Set up google account and get key 
    - go to drop-down APIs
    - API's - select Library
    - Enable map-javascript api
    - Enable places api
    - Go to credentials create an API key
    - Restrict the key correspondening to the API's you are using and save changes 
    - 
Google [https://console.cloud.google.com/getting-started?pli=1]
Documentation [https://developers.google.com/places/web-service/intro]
Maps tutorial [https://developers.google.com/maps/documentation/javascript/tutorial] 

- Put the keys into the .env file if you need to pay for them
- Put the keys into the script files in the html root if you do not need to pay for them

External API's are the back-end of the app, you can read data from the databases, to write, delete and update data to a database you need to create REST-API's - out of scope for this project.

CHALLENGES WITH GOOGLE API  - there are several challenges with google maps - now layers of authentication are needed even for developers, this resulted in the app working intermittenly as the API key was not recognised - not sure of what the fix to this is.

The search box accesses the google API and an event listener listens to the change in the input box and brings up the location in the API

```
const searchLocation = document.querySelector('[data-city-search]');
const searchBox = new google.maps.places.SearchBox(searchLocation);
searchBox.addListener('places_changed', () => {
	const place = searchBox.getPlaces()[0];
	if (place == null) return;
	const latitude = place.geometry.location.lat();
	const longitude = place.geometry.location.lng();
 ```   

The fetch api calls the Dark Sky API and your main factory function - ```setWeatherData()```  this function updates the textContent of the node in the DOM where you are displaying the API information. A ```Math.round``` method is needed to round up the numbers.

```
function setWeatherData(data, place) {
	updateLocation.textContent = place;
	updateSummary.textContent = `Summary: ${data.summary}`;
	updateTemperature.textContent = `Temperature: ${Math.round(data.temperature)} degrees`;
	updatePrecipitation.textContent = `Likelihood of rain: ${Math.round(data.precipProbability * 100)}%`;
	updateWind.textContent = `Wind Speed (miles/km ph): ${Math.round(data.windSpeed)}`;
	icon.set('icon', data.icon);
	icon.play();
}
```


## Branch 5 styling

Style according to preference once app works.
