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
```npm run devStart```
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
- create a dotenv file to store the keys
```
APINAME_API_KEY=<your key>
```
- import the dot env files into the express server
```
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config;
} 
const APINAME_API_KEY = process.env.APINAME_API_KEY;
```

Debugging at this stage
- Commit files and check that files are not included
To stop tracking a file that is currently tracked, use git rm --cached set up .env files and ensure they are in gitignore files [https://help.github.com/en/github/using-git/ignoring-files] / [https://git-scm.com/docs/gitignore] username:password - remove <> which are placeholders