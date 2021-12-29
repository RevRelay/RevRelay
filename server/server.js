const express = require("express");
const app = express();
const http = require("http");
const {Server} = require("socket.io");
const cors = require("cors");
app.use(cors);
const server = http.createServer(app);

const config = require('../src/config.json');

const io = new Server(server, {
	cors: {
		origin: `${config["URL"]}:${config["APP_PORT"]}`,
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

server.listen(config["SOCKET_PORT"], () =>{
	console.log("SERVER Running");
});

