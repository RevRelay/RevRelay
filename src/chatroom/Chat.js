import '../styles/styles.css';
import io from 'socket.io-client';
import React, { useEffect, useState, useContext, useCallback } from "react";
import ReactDOM from 'react-dom';
import TextField from "@material-ui/core/TextField";

import config from '../config.json';
import Message from './Message.jsx';
import SystemMessage from './SystemMessage.jsx';
import {SocketContext} from '../context/socket.js';

function Chat () {
	const [userName, setUserName] = useState("");
	const [room, setRoom] = useState("");
	const [message, setMessage] = useState("");
	const [messageList, setMessageList] = useState([]);

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

	useEffect(() => {
		socket.on("message sent", receiveMessage);
		socket.on("user joined", systemMessage);

		return () => {
			socket.off("message sent", receiveMessage);
			socket.off("user joined", systemMessage);
		};
	}, [socket, receiveMessage, systemMessage]);

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
			<div id="messages">
				{messageList}
			</div>
		</div>
	);
}

export default Chat;
