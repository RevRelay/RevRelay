/*
  /chatroom endpoint
  webpage for joining a room, messaging in that room, receiving messages, and sending audio
*/

import '../styles/styles.css';
import io from 'socket.io-client';
import React, { useEffect, useState, useContext, useCallback } from "react";
import ReactDOM from 'react-dom';
import TextField from "@material-ui/core/TextField";

import config from '../config.json';
import Message from './Message.js';
import SystemMessage from './SystemMessage.js';
import Active from './Active.js';
import {SocketContext} from '../context/socket.js';

function Chat () {
	//string holding username
	const [userName, setUserName] = useState("");

	//string holding room
	const [room, setRoom] = useState("");

	//string holding message
	const [message, setMessage] = useState("");

	/*Each element of messageList:
		 <Message />
		     OR
		<SystemMessage />
	*/
	const [messageList, setMessageList] = useState([]);

	/*Each element of usersTyping:
	  {
		"username": string,
		"countdown": number
	  }
	*/
	const [usersTyping, setUsersTyping] = useState([]);

	//Only connect socket once (done in socket context)
	const socket = useContext(SocketContext);

	//Tell server that you are connecting to a room
	const joinRoom = (r) => {
		if (userName !== "") {
			socket.emit("join room", {
				user: userName,
				room: r
			});
		}
	}

	//Tell server you are leaving a room
	const leaveRoom = (r) => {
		if (userName !== "") {
			socket.emit("leave room", {
				user: userName,
				room: r
			});
		}
	}

	//Give server a message to broadcast to the room
	const sendMessage = () => {
		if (message !== null && room !== ""){
			socket.emit("message room", {
				user: userName,
				room: room,
				message: message
			});
		}
	}

	//Add a new message to the message list
	const receiveMessage = useCallback((data) => {
		let m = <Message text={data["message"]} time={new Date().toLocaleString()} author={data["user"]} />;
		setMessageList((list) => [...list, m]);
	}, []);

	//Add a new system message to the list
	const systemMessage = useCallback((data) => {
		let m = <SystemMessage text={data["message"]}/>;
		setMessageList((list) => [...list, m]);
	}, []);

	//Delete all messages
	const clearMessages = () => {
		setMessageList((list) => []);
	};

        /*Logic for setActive, notActive, and setCountdown

          Deisred Status:
          yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyn

          Frontend receives:
          4     3  4    2  3    1  2    0  1       0


          ^     ^  ^    ^  ^    ^  ^    ^  ^       ^
          4     3       2       1       0
                   4       3       2       1       0

        ----------------------------------------------

          Desired Status:
          yyyyyyyyyyyyyyyyyyyyyyyyyyyyyynnnnnnnnnnnn

          Frontend receives:
          4    43  4   32  3   21  2   10  1      00


          ^    ^^  ^   ^^  ^   ^^  ^   ^^  ^      ^^
          4     3       2       1       0
                   4       3       2       1       0
               4       3       2       1          0    <--THIS SOCKET CALL SHOULD NEVER START

        ---------------------------------------------

          Desired Status:
          yyyyyyyyyyyyynnnnnnnnnnnnnnyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyn

          Frontend receives:
          4       3   -1  2       1  4    0  3       2       1       0


          ^       ^    ^  ^       ^  ^    ^  ^       ^       ^       ^
          4       3       2       1       0
                      -1
                                     4       3       2       1       0

          How to check if not typing:
          Sequence: ... 1 FOLLOWED BY 0
                OR:     -1 ANYWHERE

          How to check if typing:
          If not typing and receive a 4: set to typing
         */

	//Tell room to start countdown timer for this user (most of the time)
	const setActive = () => {
		let userActive = false;
		for (var i=0; i<usersTyping.length; i++) {
			if (usersTyping[i]["username"] == userName) {
				userActive = true;
				//If current typing countdown is 4, don't start a new countdown timer
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

	//Tell room to broadcast -1 for this user typing status
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

	//Actually manipulate the frontend state of the list of which users are typing
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
		//Manipulate state
		setUsersTyping([...newList]);
	});

	//Send audio to server
	const sendAudio = () => {
		const constraints = { audio: true };
		console.log('audio button pressed');

		//Check if browser has audio device they are willing to use
		navigator.mediaDevices.getUserMedia(constraints).then(function (mediaStream) {
			console.log('received access to microphone');
			let mediaRecorder = new MediaRecorder(mediaStream);

			//Start audio data as empty
			mediaRecorder.onstart = function (e) {
				this.chunks = [];
			};

			//Every time new audio is received, add it to audio data
			mediaRecorder.ondataavailable = function (e) {
				this.chunks.push(e.data);
			};
			mediaRecorder.onstop = function (e) {
				//Send the audio data in blob to server
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

	//Playback audio received from server
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
		//Set up socket listeners when component is instantiated in the DOM
		socket.on("message sent", receiveMessage);
		socket.on("user joined", systemMessage);
		socket.on("user left", systemMessage);
		socket.on("typing countdown", setCountdown);
		socket.on("voice", playAudio);

		return () => {
			//Disable socket listeners when component is destroyed
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
						setUsersTyping((t) => []);
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
