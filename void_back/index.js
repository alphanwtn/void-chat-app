const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("auth-request", (...args) => {
    console.log(args);
    if (args[0]) {
      socket.emit("auth-response", args[0]);
    } else {
      socket.emit("auth-response", args[0]);
    }
  });

  socket.on("message-to-serv", (...args) => {
    io.emit("message-to-client", args[0]);
  });
});

httpServer.listen(3000);
