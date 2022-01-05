const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const {Server} = require("socket.io");

app.use(cors());

const server  = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});
io.on("connection", (socket) =>{
    console.log("User Connected...");

socket.on("join_room", ({username, room}) =>{
    socket.join(room);
    console.log(`User ${username} Joined room: ${room}`);
});

socket.on("send_message", (data) =>{
    socket.to(data.room).emit("receive_message", data);
});



    socket.on("disconnect", () =>{
        console.log("User Disconnected...");
    });
});
server.listen(3001, () =>{
    console.log("Server Is Running");
});