[![Build Status](https://app.travis-ci.com/ylvali/jsframeworkProject2024BTH.svg?token=zbGBcfgSpBchF7HShAt4&branch=main)](https://app.travis-ci.com/ylvali/jsframeworkProject2024BTH)

[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/ylvali/jsframeworkProject2024BTH/badges/quality-score.png?b=main)](https://scrutinizer-ci.com/g/ylvali/jsframeworkProject2024BTH/?branch=main)

[![Code Coverage](https://scrutinizer-ci.com/g/ylvali/jsframeworkProject2024BTH/badges/coverage.png?b=main)](https://scrutinizer-ci.com/g/ylvali/jsframeworkProject2024BTH/?branch=main)


# Backend Me-API 
## BTH Blekinge technical institute

## Application technology
### Overview
- Node.js Express Npm application 
- Sqlite3 database
- Run environment: Nginx server (droplet online for example)

### Description
Node.js & Express application 
Using routes for creating a REST Api. 
That can be uploaded on for example a droplet server and accessed online.
The API provides & enables entrances to the system, interaction. That has certain effects.
In this sample you can 
- register a user - connected to the sqlite database 
- login a user    - connected to the sqlite database 
- shop            - Sell / buy a product (sample with one product) 
                    Products & funds in user's depot. 
                    Add 1000 to depot. 

This functionality uses jwt tokens, which is a unique token seemingly impossible to memorize used for identification. 
It is a simple one-product sample which demonstrates possibilities to work this way with express & node.js.
Creating a backend API that enables interaction through url routes. Can be fetched with for example AJAX. 

### SQLITE 3
It runs a test database when in test mode ()

## Install
-- npm install 

## Run server & chat server
-- npm start , default on port 8333 (node app.js)
-- npm run realtime, default on port 8334 (node socket.js)
Can be run with packagemanager pm2. 

The chat server is in the socket.js file. It runs with socket.io and uses realtime connection through sockets.
The server runs on a port, and a client can listen. This server assimilates a realtime price microservice, and
the new price is instantly updated realtime. The realtime server is connected to the same sqlite as the other server API (app.js)
in this project. 

## Tests
-- npm test
Runs the test files. The CI chain includes istanbul and mocha testing.
It tests all the routes on the API. The code coverage through istanbul shows +70%. 
Improvements could be to further test the values returned & to test with error values more. 
In this scope within this time this is the set up.


## NPM commands
"pretest": "bash start.bash",

"test": "nyc --reporter=html --reporter=text --reporter=clover mocha 'test/**/*.js'",

"start": "node app.js",

"eslint": "eslint .",

"clean": "rm -rf node_modules package-lock.json",

"process": "pm2 start app.js --name me-api",

"stopProcess": "pm2 stop app.js --name me-api",

"production": "NODE_ENV='production' node app.js",

"testRun": "NODE_ENV='test' node app.js"

## Available routes 
/                   : GET test 

### Token 

/token              : GET token 

/verifyToken        : GET verifies token & uses JWT secret x-access-token

### Users

/users/allUsers     : POST Show all users 

/users/register     : POST register user (body: email & password JSON, body)

/users/allLoggedOn  : POST All logged on 

/users/logOut       : POST Log out all 

/users/login        : POST login user (body: username & password)

### Shop

/shop/seeProduct    : POST (body: productName)

/shop/checkDepot    : POST (body: email)

/shop/addMoney      : POST (body: email default: 1000)

/shop/addProduct    : POST (default: prodX & 1000)

/shop/sellProduct   : POST (email, productName)

/shop/buyProduct    : POST (email, productName)

### Initiation 

1. Register user 

2. Add product 