/*
 * Node JS backend that listens on SERVER_PORT (specified in config.json)
 * Only provides connections to sockets with socket.io
 * Custom socket messages include:
 * "join room" --> specify data.user and data.room
 * "leave room" --> specify data.user and data.room
 * "message room" --> specify data.user, data.room, and data.message
 * "active countdown" --> specify data.user and data.room
 * "not active" --> specify data.user and data.room
 * "radio" --> specify audio, room
 */

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
	let myRoom;
	let myUsername;

	//Join a room
	//Store the room and username as socket variables so that system message can be sent upon disconnect
	socket.on("join room", (data) => {
		console.log(`User [${data["user"]}] joined room [${data["room"]}]`);
		socket.join(data["room"]);
		myRoom = data["room"];
		myUsername = data["user"];
		var messageData = {
			message: `${data["user"]} has connected`
		};
		io.to(data["room"]).emit("user joined", messageData);
	});

	//Leave a room
	//Unsubscribe from socket emits of a specific room
	socket.on("leave room", (data) => {
		console.log(`User [${data["user"]}] left room [${data["room"]}]`);
		socket.leave(data["room"]);
		var messageData = {
			message: `${data["user"]} has disconnected`
		};
		io.to(data["room"]).emit("user left", messageData);
	});

	//Message room
	//Broadcast message to a room from the given user
	socket.on("message room", (data) => {
		console.log(`User [${data["user"]}] sent message [${data["message"]}] to room [${data["room"]}]`);
		var messageData = {
			message: data["message"],
			user: data["user"],
			timestamp: Date.now()
		};
		io.to(data["room"]).emit("message sent", messageData);
	});

	//Start an activity timer
	//Every second broadcast room with a countdown counter that starts at 4 and ends at 0
	//This countdown is never interrupted by any other process
	socket.on("active countdown", (data) => {
		let counter = 4;
		io.to(data["room"]).emit("typing countdown", {
			user: data["user"],
			countdown: counter
		});
		let counterCountdown = setInterval(() => {
			counter--;
			let messageData = {
				user: data["user"],
				countdown: counter
			};
			io.to(data["room"]).emit("typing countdown", messageData);
			if (counter == 0) {
				clearInterval(counterCountdown);
			}
		}, 1000);
	});

	//Broadcast a room to tell them a user is no longer typing
	socket.on("not active", (data) => {
		let messageData = {
			user: data["user"],
			countdown: -1
		};
		io.to(data["room"]).emit("typing countdown", messageData);
	});

	//Send back to entire room every audio message received
	socket.on("radio", (audio, room) => {
		console.log('received audio');
		io.to(room).emit("voice", audio);
	});

	//Let the socket's room know which user disconnected
	socket.on("disconnecting", () => {
		var messageData = {
			message: `${myUsername} has disconnected`
		};
		io.to(myRoom).emit("user left", messageData);
	});
});



server.listen(config["SOCKET_PORT"], () =>{
	console.log(`Listening to sockets on port ${config["SOCKET_PORT"]}`);
});
