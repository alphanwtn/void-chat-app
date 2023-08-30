const cors = require("cors");
const express = require("express");
const fs = require("fs");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

app.use(cors());

app.get("/get-messages", (req, res) => {
  const messagesDb = fs.readFileSync("messagesDb.json");
  res.send(messagesDb);
});

io.on("connection", (socket) => {
  socket.on("auth-request", (...args) => {
    const accountData = args[0];
    socket.emit("auth-response", accountData);
  });

  socket.on("message-to-serv", async (...args) => {
    const incomingMessage = args[0];
    const messagesDb = JSON.parse(fs.readFileSync("messagesDb.json", "utf-8"));

    messagesDb.push(incomingMessage);
    await fs.promises.writeFile("messagesDb.json", JSON.stringify(messagesDb));
    io.emit("message-to-client", messagesDb);
  });
});

httpServer.listen(3000);
