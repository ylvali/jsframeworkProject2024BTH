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

// testfiles: test/reports/report_integration.js
const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = server;