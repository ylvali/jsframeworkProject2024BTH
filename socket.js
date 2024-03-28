// Express & socket
const express = require('express');
const { createServer } = require('node:http');
// const { createServer } = require('https');
const { Server } = require('socket.io');
const { join } = require('node:path');

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

// Use database & run it
process.env.NODE_ENV = 'test';
const db = require("./db/database.js");


// This can be activated to activate the indexfile on
// opening the port in the browser.
// Then the index html needs to contain the css & script inline.
// app.get('/', (req, res) => {
//     res.sendFile(join(__dirname, 'index.html'));
// });

// ROUTES
// Require the chat routes
//const chatDb = require('./routes/chatDb');

//app.use('/chat', chatDb);

// THE SOCKET IO
io.on('connection', (socket) => {
    console.log('a user connected');
    console.log('new user socket id: '+ socket.id);
    let msg1 = 'user connected';

    io.emit('user connected', msg1);

    socket.on('chat message', (msg) => {
        // console.log(socket.id);
        console.log('message: ' + msg);

        // Set new price to db
        var valid = setNewPrice(msg);

        if (!valid) {
            msg = 'Not numeric / whitespace / other error'
        }
        if (valid) {
            msg = 'New price: '+msg;
        }

        // Emit msg to the socket

        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
        console.log('user socket id: '+ socket.id);

        let msg1 = 'user disconnected';

        io.emit('user disconnected', msg1);
    });
});

function setNewPrice(newPrice) {
    console.log('Set new price');

    let productName = 'prodX';

    // Is numeric input? only numeric input.
    // https://stackoverflow.com/questions/175739/how-can-i-check-if-a-string-is-a-valid-number
    function isNumeric(str) {
        if (typeof str != "string") return false // we only process strings!  
        return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
               !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
      }
      if (!isNumeric(newPrice)) {
        console.log('not numeric');
        return false;
      }

    theSql = "UPDATE product SET price = ? WHERE name = ?;";
    params = [newPrice, productName];

    db.all(theSql, params, (err, rows)=> {
        if (err) {
            console.log(err.message)
            return;
        }
        console.log('Updated');
    });

    return true;
}

server.listen(3001, () => {
    console.log('server running at http://localhost:3001');
});
