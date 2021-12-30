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

	socket.on("leave room", (data) => {
		console.log(`User [${data["user"]}] left room [${data["room"]}]`);
		socket.leave(data["room"]);
		var messageData = {
			message: `${data["user"]} has disconnected`
		};
		io.to(data["room"]).emit("user left", messageData);
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

	socket.on("radio", (audio, room) => {
		console.log('received audio');
		io.to(room).emit("voice", audio);
	});

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
