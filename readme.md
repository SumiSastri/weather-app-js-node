## Weather-app using node.js and vanilla javascript

This is a simple weather app using 2 external API's Dark Sky and Google. The learning objective is to understand how external API's work and to protect API-keys by building out a backend environment with node.js and a server with express.js

## API's

Application Programming Interfaces allow a transfer of data (resources) from clients to servers. Data is transported in Java Script Object Notation(JSON) files or XML files. It is an architectural style used for client-server communications.

## External API's 

An external API allows you to access data from a third-party database with an API-key. The google API is free, while many external API's have tiered payments for API use starting with a freemium model and scaling up to a premium model. 

## API-key protection

To protect your API-keys setting up a backend server with express, using node as the environment, API-keys can be saved as a dev dependency and excluded from files that are submitted to github with a gitignore file as well as files that are submitted to a production environment if the app is deployed.

## Scaffolding

mkdir [name of directory]
cd into the directory install node modules - [npm init] 
install production dependencies [npm i axios express]
install dev dependencies [npm i --save-dev nodemon dotenv]

## Scaffolding