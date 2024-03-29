//const { createServer } = require("node:http");
const { createServer } = require("http");

const { Server } = require("socket.io");
const ioc = require("socket.io-client");
const { assert } = require("chai");

function waitFor(socket, event) {
  return new Promise((resolve) => {
    socket.once(event, resolve);
  });
}

describe("test", () => {
  let io, serverSocket, clientSocket;
  console.log('SOCKET TEST');

  before((done) => {
    const httpServer = createServer();
    io = new Server(httpServer);
    httpServer.listen(() => {
      const port = httpServer.address().port;
      clientSocket = ioc(`http://localhost:3001`);
      io.on("connection", (socket) => {
        serverSocket = socket;
      });
      clientSocket.on("connect", done);
    });
  });

  after(() => {
    io.close();
    clientSocket.disconnect();
  });
});