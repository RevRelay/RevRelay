import '../styles/styles.css';
import io from 'socket.io-client';
import React, { useEffect, useState, useContext, useCallback } from "react";
import ReactDOM from 'react-dom';
import TextField from "@material-ui/core/TextField";

import React, { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3001");

function Chat () {
	const [userName, setUserName] = useState("");
	const [room, setRoom] = useState("");
	const [message, setMessage] = useState("");
	const [messageList, setMessageList] = useState([]);
	const [usersTyping, setUsersTyping] = useState([]);

    const joinRoom = (r) => {
		if (userName !== "") {
			socket.emit("join room", {
				user: userName,
				room: r
			});
		}
	}
    const leaveRoom = (r) => {
		if (userName !== "") {
			socket.emit("leave room", {
				user: userName,
				room: r
			});
		}
	}

    const sendMessage = () => {
		if (message !== null && room !== ""){
			socket.emit("message room", {
				user: userName,
				room: room,
				message: message
			});
		}
	}

    const receiveMessage = useCallback((data) => {
		let m = <Message text={data["message"]} time={new Date().toLocaleString()} author={data["user"]} />;
		setMessageList((list) => [...list, m]);
	}, []);

	const systemMessage = useCallback((data) => {
		let m = <SystemMessage text={data["message"]}/>;
		setMessageList((list) => [...list, m]);
	}, []);

    const systemMessage = useCallback((data) => {
		let m = <SystemMessage text={data["message"]}/>;
		setMessageList((list) => [...list, m]);
	}, []);

    const clearMessages = () => {
		setMessageList((list) => []);
	};

	const setActive = () => {
		let userActive = false;
		for (var i=0; i<usersTyping.length; i++) {
			if (usersTyping[i]["username"] == userName) {
				userActive = true;
				if (usersTyping[i]["countdown"] < 4) {
					socket.emit("active countdown", {
						user: userName,
						room: room
					});
				}
			}
		}

        if (!userActive) {
			socket.emit("active countdown", {
				user: userName,
				room: room
			});
		}
	}

    const setNotActive = () => {
		for (var i=0; i<usersTyping.length; i++) {
			if (usersTyping[i]["username"] == userName) {
				socket.emit("not active", {
					user: userName,
					room: room
				});
			}
		}
	}

    const setCountdown = useCallback((data) => {
		let userActive = false;
		let newList = usersTyping;
		for (var i=0; i<usersTyping.length; i++) {
			if (usersTyping[i]["username"] == data["user"]) {
				userActive = true;
				if ((data["countdown"] == 0 && usersTyping[i]["countdown"] == 1) || (data["countdown"] == -1)) {
					newList.splice(i, 1);
				} else {
					newList[i]["countdown"] = data["countdown"];
				}
			}
		}
		if (!userActive && data["countdown"] === 4) {
			newList.push({
				username: data["user"],
				countdown: data["countdown"]
			});
		}
		setUsersTyping([...newList]);
	});

    const sendAudio = () => {
		const constraints = { audio: true };
		console.log('audio button pressed');
		navigator.mediaDevices.getUserMedia(constraints).then(function (mediaStream) {
			console.log('received access to microphone');
			let mediaRecorder = new MediaRecorder(mediaStream);
			mediaRecorder.onstart = function (e) {
				this.chunks = [];
			};
			mediaRecorder.ondataavailable = function (e) {
				this.chunks.push(e.data);
			};
			mediaRecorder.onstop = function (e) {
				var blob = new Blob(this.chunks, {
					'type': 'audio/ogg; codecs=opus'
				});
				console.log('sending audio');
				socket.emit('radio', blob, room);
			};

			//Start recording
			mediaRecorder.start();

			//Stop recording after 5 seconds and broadcast it to server
			setTimeout(function() {
				mediaRecorder.stop()
			}, 5000);
		});
	}

	const playAudio = useCallback((arrayBuffer) => {
		console.log('playing audio!');
		let blob = new Blob([arrayBuffer], {
			'type': 'audio/ogg; codecs=opus'
		});
		let audio = document.createElement('audio');
		audio.src = window.URL.createObjectURL(blob);
		audio.play();
	});

	useEffect(() => {
		socket.on("message sent", receiveMessage);
		socket.on("user joined", systemMessage);
		socket.on("user left", systemMessage);
		socket.on("typing countdown", setCountdown);
		socket.on("voice", playAudio);

		return () => {
			socket.off("message sent", receiveMessage);
			socket.off("user joined", systemMessage);
			socket.off("user left", systemMessage);
			socket.off("typing countdown", setCountdown);
			socket.off("voice", playAudio);
		};
	}, [socket, receiveMessage, systemMessage, playAudio, setCountdown]);

	return (
		<div className="App">
			<h1>Join a room</h1>
			<input type="text" id="roomInput" placeholder="Type room ID" />
			<br></br><br></br>
			<input type="text" placeholder="Enter your user name" onChange={(event) => {
				setUserName(event.target.value);
			}}
			/>
			<button onClick={() => {
				let inputValue = document.getElementById('roomInput').value;
				if (inputValue !== room && inputValue !== "") {
					if (room !== "") {
						leaveRoom(room);
						setMessageList((t) => []);
					}
					setRoom(inputValue);
				}
				joinRoom(inputValue);
			}}>Join Now </button>
			<br></br><br></br><br></br>
			<input type="text" id="messageInput" placeholder="message" onChange={(event) =>{
				setMessage(event.target.value);
				setActive();
			}}
			/>
			<button onClick={() => {
				sendMessage();
				let messageInput = document.getElementById('messageInput');
				messageInput.value = "";
				setMessage("");
				setNotActive();
			}}>Send message...</button>
			<br></br><br></br>
			<button onClick={sendAudio}>Send audio to room</button>
			<br></br>
			<button onClick={clearMessages}>Clear message</button>
			<br></br><br></br>
			<Active typing={usersTyping} />
			<br></br>
			<div id="messages">
				{messageList}
			</div>
		</div>
	);
}

export default Chat;
