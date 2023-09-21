// @ts-nocheck
const cors = require("cors");
const _ = require("lodash");
const express = require("express");
const fs = require("fs");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);

const onlineUsers = [];

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

app.get("/get-users", (req, res) => {
    res.send(onlineUsers);
});

io.on("connection", (socket) => {
    socket.on("auth-request", (...args) => {
        const accountData = args[0];
        socket.emit("auth-response", accountData);

        if (accountData) {
            socket.accountData = accountData;
            _.remove(onlineUsers, (user) => user.id === accountData.id);
            onlineUsers.push(accountData);
            io.emit("user-list-update", onlineUsers);
            io.emit("connect-notification", socket.accountData);
        }

        if (!accountData) {
            _.remove(onlineUsers, (user) => user === socket.accountData);
            socket.emit("auth-response", undefined);
            io.emit("user-list-update", onlineUsers);
            io.emit("disconnect-notification", socket.accountData);
        }
    });

    socket.on("message-to-serv", async (...args) => {
        const incomingMessage = args[0];
        const messagesDb = JSON.parse(fs.readFileSync("messagesDb.json", "utf-8"));

        messagesDb.push(incomingMessage);
        await fs.promises.writeFile("messagesDb.json", JSON.stringify(messagesDb));
        io.emit("message-to-client", messagesDb);
    });

    socket.on("disconnect", () => {
        _.remove(onlineUsers, (user) => user === socket.accountData);
        io.emit("user-list-update", onlineUsers);
        io.emit("disconnect-notification", socket.accountData);
    });
});

httpServer.listen(3000);
