/*jshint esversion: 6 */

// Express & the router
var express = require('express');
var router = express.Router();

// Enable to send req.body (request body) med POST
// till exempel via Postman
// Parse the extra params with PUT/POST/DELETE
const bodyParser = require("body-parser");

// for parsing application/json
router.use(bodyParser.json());

// for parsing application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: true }));

// Use database & run it
const db = require("../db/database.js");

// Crypting passwords
// const bcrypt = require('bcryptjs');
// const saltRounds = 5; // The more rounds, the more difficult password

/* LOGIC */

// SUPPORTING FUNCTIONS

// Variables
let price;          // product price
let sum;            // available sum
let newSum;         // new sum

// Checks avaiable amount money for a user
function availableSum(req, res, next) {
    console.log('Checking available sum');
    let params;
    let theSql;

    if (!req.body.email) {
        res.status(400).json({"error": 'no email'});
        return;
    }

    // Data type control
    if (typeof req.body.email === 'string') {
        // Database command SQL
        theSql = "SELECT sum FROM depot WHERE email = ?;";
        params = [req.body.email];

        db.all(theSql, params, (err, rows)=> {
            if (err) {
                res.status(400).json({"msg": err.message});
                console.log(err.message);
            }
            if (rows[0] !== undefined) {
                console.log('Sum available: '+rows[0].sum);
                sum = rows[0].sum;
                next();
                return;
            }
            if (rows[0] === undefined) {
                res.json({
                    data: {
                        msg: "No sum available",
                    }
                });
            }
        });
    }
}

// Checks the product price
function productPrice(req, res, next) {
    console.log('Checking product price');
    let params;
    let theSql;

    if (!req.body.productName) {
        res.status(400).json({"error": 'no product'});
        return;
    }

    // Data type control
    if (typeof req.body.productName === 'string') {
        // Database command SQL
        theSql = "SELECT price FROM product WHERE name = ?;";
        params = [req.body.productName];

        db.all(theSql, params, (err, rows)=> {
            if (err) {
                res.status(400).json({"msg": err.message});
            }
            // console.log(rows);

            if (rows[0] !== undefined) {
                console.log('Price: '+rows[0].price);
                price = rows[0].price;
                next();
                return;
            }
            if (rows[0] === undefined) {
                res.json({
                    data: {
                        msg: "No price available",
                    }
                });
            }
        });
    }
}

// Calculate the purchase
function calculation(req, res, next) {
    console.log('Calculating purchase')

    if (!req.body.email) {
        res.status(400).json({"msg": 'no email'});
        return;
    }

    if (sum < price) {
        res.status(400).json({"msg": 'not enpough funds available'});
        return;
    }

    if (sum > price || sum == price) {
        // Add product to depot
        // Update the sum
        newSum = sum - price;
        console.log('New sum: '+newSum);
        next();
    }
}

// Calculation2
function calculation2(req, res, next) {
    console.log('Available sum ' + sum);
    console.log('Product price ' + price);

    // Add product to depot
    // Update the sum
    newSum = sum + price;
    console.log('New sum: '+newSum);
    console.log("Selling a product");
    next();
}

// Update the money in user's depot
function changeDepotSum(req, res, next) {
    console.log('Updating depot fund');
    let params;
    let theSql;

    if (!req.body.email) {
        res.status(400).json({"msg": 'no email'});
        return;
    }

    // Data type control
    if (typeof req.body.email === 'string') {
        // Set up database
        theSql = "UPDATE depot SET sum = ? WHERE email = ?;";
        params = [newSum, req.body.email];

        db.all(theSql, params, (err, rows)=> {
            if (err) {
                res.status(400).json({"error": err.message});
                console.log(err.message)
                return;
            }
            console.log('Updated');
            next();
        });
    }
}

// SQL call
// function sqlCall(sql, params, res) {
//     db.all(sql, params, (err, rows)=> {
//         if (err) {
//             res.status(400).json({"error": err.message});
//             console.log(err.message)
//             return;
//         }
//         console.log(rows);
//         console.log('Success');
//         res.json({
//             data: {
//                 msg: 'success'
//             }
//         });
//     });
// }

// Add a product product to users depot
function addProduct(req, res) {
    console.log('Adding product to depot');
    let params;
    let theSql;

    if (!req.body.email) {
        res.status(400).json({"msg": 'no email'});
        return;
    }

    // Data type control
    if (typeof req.body.email === 'string') {
        // Set up database
        theSql = "UPDATE depot SET nrProducts = nrProducts + 1 WHERE email = ?;";
        console.log(theSql);
        params = [req.body.email];
        // sqlCall(theSql, params, res);
        
        db.all(theSql, params, (err, rows)=> {
            if (err) {
                console.log(err.message)
                res.status(400).json({"msg": err.message});
                return;
            }
            console.log(rows);
            console.log('Success');
            res.json({
                data: {
                    msg: 'Success - item purchased'
                }
            });
        });
    }
}

// Remove a product product to users depot
function removeProduct(req, res) {
    console.log('Removing product from depot');
    let params;
    let theSql;

    if (!req.body.email) {
        res.status(400).json({"msg": 'no email'});
        return;
    }

    // Data type control
    if (typeof req.body.email === 'string') {
        // Set up database
        console.log('test');
        theSql = "UPDATE depot SET nrProducts = nrProducts - 1 WHERE email = ?;";
        params = [req.body.email];
        // sqlCall(theSql, params, res);
        
        db.all(theSql, params, (err, rows)=> {
            if (err) {
                console.log(err.message)
                res.status(400).json({"msg": err.message});
                return;
            }
            console.log(rows);
            console.log('Success');
            res.json({
                data: {
                    msg: 'Success - item sold'
                }
            });
        });
    }
}

// API ROUTES

// Buy product
// 1. check available money (email)              : decline / next
// 2. product price         (productName)        : decline / next
// 3. calculation           ()                   : decline / next
// 4. changeDepotSum        (email)              : decline / next
// 4. addProduct            (email)              : decline / completed

router.post('/buyProduct',
    (req, res, next) => availableSum(req, res, next),
    (req, res, next) => productPrice(req, res, next),
    (req, res, next) => calculation(req, res, next),
    (req, res, next) => changeDepotSum(req, res, next),
    (req, res, next) => addProduct(req, res));

// Sell product
// 1. check saldo           (email)              : decline / next
// 2. product price         (productName)        : decline / next
// 3. calculation           ()                   : decline / next
// 4. changeDepotSum        (email)              : decline / next
// 4. addProduct            (email)              : decline / completed

router.post('/sellProduct',
    (req, res, next) => availableSum(req, res, next),
    (req, res, next) => productPrice(req, res, next),
    (req, res, next) => calculation2(req, res, next),
    (req, res, next) => changeDepotSum(req, res, next),
    (req, res, next) => removeProduct(req, res, next));

// Add product
router.post("/addProduct", (req, res) => {
    let params;
    let theSql;

    // Database command SQL
    theSql = "INSERT INTO product(price, name) VALUES (?,?);";
    params = [100, 'prodX'];

    db.all(theSql, params, (err, rows)=> {
        let aMsg = 'success';

        if (err) {
            res.status(400).json({"msg": 'product already added or other error'});
            console.log(err.message);
            return;
        }
        console.log(rows[0]);
        res.json({
            data: {
                msg: aMsg
            }
        });
    });
});

// Add money to a user - set to 1000 default
router.post("/addMoney", (req, res) => {
    let params;
    let theSql;

    // Checking incoming
    if (!req.body.email) {
        res.status(400).json({"msg": 'no email'});
        return;
    }

    // Database update & SQL
    theSql = "UPDATE depot SET sum = sum + 1000 WHERE email = ?;";
    params = [req.body.email];

    db.all(theSql, params, (err, rows)=> {
        let aMsg = 'success';

        if (err) {
            res.status(400).json({"msg": err.message});
            console.log(err.message);
            return;
        }
        console.log(rows[0]);
        res.json({
            data: {
                msg: aMsg
            }
        });
    });
});

// Check user depot
router.post("/checkDepot", (req, res) => {
    let params;
    let theSql;

    // Checking incoming
    if (!req.body.email) {
        res.status(400).json({"msg": 'no email'});
        return;
    }
    // SQL and database update
    theSql = "SELECT * FROM depot WHERE email = ?;";
    params = [req.body.email];

    db.all(theSql, params, (err, rows)=> {
        if (err) {
            res.status(400).json({"msg": err.message});
            console.log(err.message);
            return;
        }
        res.json({
            data: {
                msg: rows[0]
            }
        });
    });
});

// See products (productName)
router.post("/seeProduct", (req, res) => {
    let params;
    let theSql;

    // Check incoming type
    if (!req.body.productName) {
        res.status(400).json({"msg": 'productName'});
        return;
    }
    // SQL & parameters for database
    theSql = "SELECT * FROM product WHERE name = ?;";
    params = [req.body.productName];

    // Database call
    db.all(theSql, params, (err, rows)=> {
        if (err) {
            res.status(400).json({data:{"msg": 'no product or other error'}});
            console.log(err.message);
            return;
        }
        res.json({
            data: {
                msg: rows[0]
            }
        });
    });
});

module.exports = router;
