import '../styles/styles.css';
import io from 'socket.io-client';
import React, { useEffect, useState, useContext, useCallback } from "react";
import ReactDOM from 'react-dom';
import TextField from "@material-ui/core/TextField";

import config from '../config.json';
import Message from './Message.jsx';
import SystemMessage from './SystemMessage.jsx';
import Active from './Active.jsx';
import {SocketContext} from '../context/socket.js';

function Chat () {
	const [userName, setUserName] = useState("");
	const [room, setRoom] = useState("");
	const [message, setMessage] = useState("");
	const [messageList, setMessageList] = useState([]);
	const [usersTyping, setUsersTyping] = useState([]);

	const socket = useContext(SocketContext);

	const joinRoom = () => {
		if(userName !== "" && room !== ""){
			socket.emit("join room", {
				user: userName,
				room: room
			});
		}
	}

	const sendMessage = () => {
		if(message !== null && room !== ""){
			socket.emit("message room", {
				user: userName,
				room: room,
				message: message
			});
		}
	}

	const receiveMessage = useCallback((data) => {
		console.log('received message');
		let newList = messageList;
		newList.push(<Message text={data["message"]} time={new Date(data["timestamp"]).toLocaleString()} author={data["user"]}/>);
		setMessageList([...newList]);
	}, []);

	const systemMessage = useCallback((data) => {
		console.log('system message');
		let newList = messageList;
		newList.push(<SystemMessage text={data["message"]}/>);
		setMessageList([...newList]);
	}, []);

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

	const setCountdown = useCallback((data) => {
		let userActive = false;
		let newList = usersTyping;
		for (var i=0; i<usersTyping.length; i++) {
			if (usersTyping[i]["username"] == data["user"]) {
				userActive = true;
				if (data["countdown"] == 0 && usersTyping[i]["countdown"] == 1) {
					newList.splice(i, 1);
				} else {
					newList[i]["countdown"] = data["countdown"];
				}
			}
		}
		if (!userActive && data["countdown"] > 0) {
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
		socket.on("typing countdown", setCountdown);
		socket.on("voice", playAudio);

		return () => {
			socket.off("message sent", receiveMessage);
			socket.off("user joined", systemMessage);
			socket.off("typing countdown", setCountdown);
			socket.off("voice", playAudio);
		};
	}, [socket, receiveMessage, systemMessage, playAudio, setCountdown]);

	return (
		<div className="App">
			<h1>Join a room</h1>
			<input type="text" placeholder="Type room ID" onChange={(event) => {
				setRoom(event.target.value);
			}}
			/><br></br><br></br>
			<input type="text" placeholder="Enter your user name" onChange={(event) => {
				setUserName(event.target.value);
			}}
			/>
			<button onClick={joinRoom}>Join Now </button>
			<br></br><br></br><br></br>
			<input type="text" id="messageInput" placeholder="message" onChange={(event) =>{
				setMessage(event.target.value);
				setActive();
			}}
			/>
			<button onClick={sendMessage}>Send message...</button>
			<br></br><br></br>
			<button onClick={sendAudio}>Send audio to room</button>
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
