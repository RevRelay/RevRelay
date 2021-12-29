const express = require("express");
const app = express();
const http = require("http");
const {Server} = require("socket.io");
const cors = require("cors");
app.use(cors);
const server = http.createServer(app);
const io = new Server(server, {
    cors:{
       origin:"http://localhost:3000",
       methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) =>{
console.log(`User Connected: ${socket.id}`);

socket.on("join_room", (data) =>{
    socket.join(data);
    console.log(`User ID: ${socket.id} Join room: ${data}`)
    });

    socket.on("message_sent", (data) =>{
console.log(`message from ${socket.id} ${data}`)

    });



socket.on("disconected", () =>{
    console.log("User Disconnected", socket.id);
});
});

server.listen(3001, () =>{
    console.log("SERVER Running");
});

