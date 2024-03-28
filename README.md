[![Build Status](https://app.travis-ci.com/ylvali/jsframeworkProject2024BTH.svg?token=zbGBcfgSpBchF7HShAt4&branch=main)](https://app.travis-ci.com/ylvali/jsframeworkProject2024BTH)

[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/ylvali/jsframeworkProject2024BTH/badges/quality-score.png?b=main)](https://scrutinizer-ci.com/g/ylvali/jsframeworkProject2024BTH/?branch=main)

[![Code Coverage](https://scrutinizer-ci.com/g/ylvali/jsframeworkProject2024BTH/badges/coverage.png?b=main)](https://scrutinizer-ci.com/g/ylvali/jsframeworkProject2024BTH/?branch=main)

[![Build Status](https://scrutinizer-ci.com/g/ylvali/jsframeworkProject2024BTH/badges/build.png?b=main)](https://scrutinizer-ci.com/g/ylvali/jsframeworkProject2024BTH/build-status/main)


# Backend Me-API 
## BTH Blekinge technical institute

## Application technology
### Overview
- Node.js Express Npm application 
- Sqlite3 database
- Socket.io realtime server 
- Run environment: Nginx server (droplet online for example)

### Description
Node.js & Express application 
Using routes for creating a REST API. 
That can be uploaded on for example a droplet server and accessed online or run locally.
The API provides & enables entrances to the system, interaction. 
In this sample you can 
- register a user       - connected to the sqlite database 
- login a user          - connected to the sqlite database 
- shop                  - Sell / buy a product (sample with one product) 
                          Products & funds in user's depot. 
                          Add 1000 to depot (default). 
- set prices realtime   - real time micro service for updating product prices

It is a simple one-product sample. Which demonstrates possibilities to work this way with express & node.js.
Creating a backend API that enables interaction through url routes. Can be fetched with for example AJAX. 
Access with jwt secret access tokens.

### SQLITE 3
It runs with a sqlite3 database.

## Install
-- npm install 

## Run server & chat server
-- npm start , default on port 8333 (node app.js)
-- npm run realtime, default on port 8334 (node socket.js)
Can be run with packagemanager pm2. 

The realtime server is in the socket.js file. It runs with socket.io (realtime connection).
The server runs on a port, and a client can listen. This server assimilates a realtime price microservice, and
the new price is instantly updated. The realtime server is connected to the same sqlite as the other server for the register / product API (app.js)
in this project (/db)

## Tests
-- npm test
Runs the test files. The CI chain includes istanbul, chai & mocha testing.
It tests all the routes on the API. The code coverage through istanbul shows +80%. 
Improvements could be to further test the values returned & to test with error values more. 
In this scope within this time this is the set up.
This is part of the development process, to see that the routes work properly with parameters. 
And to test the procedure that in this case is working with users and a trade situation. Test the whole process of registry, login & trade.
And when something is changed in the script, run the tests again to see that there are no errors. Great.

It is also tested with travis & scrutinizer.

Note: Socket.io functionality is briefly tested. Testing the connection and set up, in socket.io file.

## NPM commands
### Reset tests (database) and run tests (istanbul, mocha, chai)
npm pretest
npm test 

### install the application
npm install 

### Run the application
npm start

### Code validation
npm run eslint


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