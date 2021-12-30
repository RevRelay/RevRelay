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
	console.log(`Socket connected: ${socket.id}`);

	socket.on("join room", (data) => {
		console.log(`User [${data["user"]}] joined room [${data["room"]}]`);
		socket.join(data["room"]);
		var messageData = {
			message: `${data["user"]} has connected`
		};
		io.to(data["room"]).emit("user joined", messageData);
	});

	socket.on("message room", (data) => {
		console.log(`User [${data["user"]}] sent message [${data["message"]}] to room [${data["room"]}]`);
		var messageData = {
			message: data["message"],
			user: data["user"],
			timestamp: Date.now()
		};
		io.to(data["room"]).emit("message sent", messageData);
	});

	socket.on("disconected", () =>{
		console.log(`Socket disconnected: ${socket.id}`);
	});
});

server.listen(config["SOCKET_PORT"], () =>{
	console.log(`Listening to sockets on port ${config["SOCKET_PORT"]}`);
});

