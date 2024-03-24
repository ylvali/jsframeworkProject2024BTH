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
This functionality uses jwt tokens, which is a unique token seemingly impossible to memorize used for identification. 

### SQLITE 3
It runs a test database when in test mode ()

## Install
-- npm install 

## Run server 
-- npm start , default on port 8333

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

/token              : GET token 

/verifyToken        : GET verifies token & uses JWT secret x-access-token

/users/allUsers     : POST Show all users 

/users/register     : POST register user (email & password JSON, body)

/users/allLoggedOn  : POST All logged on 

/users/logOut       : POST Log out all 

/users/login        : POST login user (username & password)