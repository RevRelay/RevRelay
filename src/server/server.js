const express = require("express");
const http = require("http");
const {Server} = require("socket.io");
const app = express();
const cors = require("cors");
app.use((cors));
const server = http.createServer(app);

const io = new Server(server, {
cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) =>{
    console.log(socket.id);
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
    socket.on("not active", (data) => {
		let messageData = {
			user: data["user"],
			countdown: -1
		};
		io.to(data["room"]).emit("typing countdown", messageData);
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




server.listen(3001, ()=>{
    console.log("Server is Running on Port 3001");
});
