import '../styles/styles.css';
import io from 'socket.io-client';
import React, { useEffect, useState, useContext } from "react";
import ReactDOM from 'react-dom';
import TextField from "@material-ui/core/TextField";

import config from '../config.json';
import Message from './Message.jsx';
import {SocketContext} from '../context/socket.js';

function Chat () {
	const [userName, setUserName] = useState("");
	const [room, setRoom] = useState("");
	const [message, setMessage] = useState("");

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
		ReactDOM.render(
			<Message text={data["message"]} time={new Date(data["timestamp"]).toLocaleString()} user={data["user"]}/>,
			document.getElementById('messages')
		);
	}, []);

	useEffect(() => {
		socket.on("message sent", receiveMessage);

		return () => {
			socket.off("message sent", receiveMessage);
		};
	}, [socket, receiveMessage]);

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
			}}
			/>
			<button onClick={sendMessage}>Send message...</button>
			<br></br><br></br>
			<TextField name="name"  value={message} onChange={(e) => sendMessage(e)} label="Name" />
			<div id="messages"></div>
//			<Message text="abc" time={new Date(Date.now()).toLocaleString()} />
		</div>
	);
}

export default Chat;
