
/*jshint esversion: 6 */

// Express app
const express = require("express");

// MORGAN for inloggning
const morgan = require('morgan');

// Cross-Origin Resource Sharing (CORS)
// 3e parts modul för att andra domäner ska kunna hämta info ifrån våran app
const cors = require('cors');

// Parse the extra params with PUT/POST/DELETE
const bodyParser = require("body-parser");

// Express app
const app = express();
const port = 8333;


// Console.log('Running on port' +port);
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Check which mode is on (test/production)
// Set environment to test / production
process.env.NODE_ENV = 'test';
console.log('PROCESS ENV: '+process.env.NODE_ENV);

// Use sqlite database & run it
// const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database('./db/texts.sqlite');
// Use a testdb if in test mode
// in the function the database is selected
const db = require("./db/database.js");
console.log("DB: " + db);

// Use cors
app.use(cors());

// Enable to send req.body (request body) med POST
// till exempel via Postman
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// don't show the log when it is test
// process.env.NODE_ENV = 'test'; < set in the bash file

if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

// This is middleware called for all routes.
// Middleware takes three parameters.
app.use((req, res, next) => {
    console.log(req.method);
    console.log(req.path);
    next();
});

// JSON WEBTOKENS
// A secure way of using tokens for login etc.

// Set the secret key.
// Using an environmental variable
// JWT secret set in the environment : server & process
// This can be changed to do in the CLI 
// $ export JWT_SECRET='R_[/_&g2Upsl5I3]uQ]K<2o|J'
// or set up in the script as below:
process.env.JWT_SECRET = 'R_[/_&g2Upsl5I3]uQ]K<2o|J';
const jwt = require('jsonwebtoken');
const payload = { email: "user@example.com" };

// JWT secret set in the script
const secret = process.env.JWT_SECRET; // using the secret token on your server & local environment

// Create the token sign
// The token is created in the method below
var token;

// ROUTES
// Add a route
// Require routes - routes that are stored in a catalog/directory
// Use the main name with a subcatalog
const index = require('./routes/index');
const registry = require('./routes/registry');
const shop = require('./routes/shop');

app.use('/', index);
app.use('/users', registry);
app.use('/shop', shop);


// Get new token
app.get("/token", (req, res) => {
    token = jwt.sign(payload, secret, { expiresIn: '1h'}); // here is your token
    console.log('Token: '+token);

    res.json({
        data: {
            msg: "Token: "+token,
            token: token
        }
    });
});

// Verify token
app.post("/verifyToken", (req, res) => {
    // Control that the token functions
    var response = 'valid token';
    var token = req.headers['x-access-token'];

    jwt.verify(token, process.env.JWT_SECRET, function(err) {
        if (err) {
            // not a valid token
            response = 'invalid token';
            console.log('Invalid token');
        }
        console.log('Valid token');
    });

    res.json({
        data: {
            msg: "Token: "+response
        }
    });
});


// Add routes for 404 and error handling
// Catch 404 and forward to error handler
// Put this last
app.use((req, res, next) => {
    var err = new Error("Not Found");

    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500).json({
        "errors": [
            {
                "status": err.status,
                "title":  err.message,
                "detail": err.message
            }
        ]
    });
});

// Start up server
// app.listen(port, () => console.log(`Example API listening on port ${port}!`));

// To import server into the test files & call the server
// testfiles: test/reports/report_integration.js
const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = server;
