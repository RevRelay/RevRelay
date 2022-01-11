import React, { useState, 
	useEffect, 
	useRef, 
	useCallback 
} from "react";
import {
	Box,
	IconButton,
	TextField,
	Stack,
	Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Socket } from "socket.io-client";
import MicIcon from "@mui/icons-material/Mic";
import { ChatRoom } from "../typeDef"

//https://gridfiti.com/aesthetic-color-palettes/

/**
 * ---
 * 
 * @param {ChatRoom} 	chatProp
 * @param {Socket}		chatProp.socket
 * @param {String}		chatProp.username 	The username of the current user.
 * @param {String}		chatProp.room		The name of the room you are currently in.
 * @returns HTML for Chatbox
 */
function Chat(chatProp) {
	const [message, setMessage] = useState("");
	const [messageList, setMessageList] = useState([]);
	const [usersTyping, setUsersTyping] = useState([]);

	const scrollRef = useRef(null);

	/**
	 * ---
	 */
	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
		}
	}, [messageList]);

	/**
	 * ---
	 */
	const sendMessage = () => {
		if (message !== "") {
			const messageBody = {
				room: chatProp.room,
				user: chatProp.username,
				message: message,
			};
			chatProp.socket.emit("send_message", messageBody);
			setMessageList((list) => [...list, messageBody]);
			setMessage("");
		}
	};

	/**
	 * ---
	 */
	useEffect(() => {
		chatProp.socket.on("receive_message", (data) => {
			setMessageList((list) => [...list, data]);
		});
	}, [chatProp.socket]);
	
	/**
	 * Clear the chatroom
	 */
	const clearMessages = () => {
		setMessageList((list) => []);
	};

	/**
	 * Setting active/non-active users.
	 * Shows if someone is typing.
	 */
	const setActive = () => {
		console.log(usersTyping);
		let userActive = false;
		for (var i = 0; i < usersTyping.length; i++) {
			if (usersTyping[i]["username"] === chatProp.username) {
				userActive = true;
				//If current typing countdown is 4, don't start a new countdown timer
				if (usersTyping[i]["countdown"] < 4) {
					chatProp.socket.emit("active countdown", {
						user: chatProp.username,
						room: chatProp.room,
					});
				}
			}
		}
		if (!userActive) {
			chatProp.socket.emit("active countdown", {
				user: chatProp.username,
				room: chatProp.room,
			});
		}
	};

	/**
	 * ---
	 */
	const setNotActive = () => {
		for (var i = 0; i < usersTyping.length; i++) {
			if (usersTyping[i]["username"] === chatProp.username) {
				chatProp.socket.emit("not active", {
					user: chatProp.username,
					room: chatProp.room,
				});
			}
		}
	};

	/**
	 * Actually manipulate the frontend state of the list of which users are typing
	 * @param {---} data ---
	 */
	const setCountdown = (data) => {
		console.log(data);
		let userActive = false;
		let newList = [...usersTyping];
		for (var i = 0; i < usersTyping.length; i++) {
			if (usersTyping[i]["username"] === data["user"]) {
				userActive = true;
				if (
					(data["countdown"] === 0 && usersTyping[i]["countdown"] === 1) ||
					data["countdown"] === -1
				) {
					newList.splice(i, 1);
				} else {
					newList[i]["countdown"] = data["countdown"];
				}
			}
		}

		if (!userActive && data["countdown"] === 4) {
			newList.push({
				username: data["user"],
				countdown: data["countdown"],
			});
			console.log(newList);
		}
		//Manipulate state
		console.log(newList);
		setUsersTyping([...newList]);
		console.log(usersTyping);
	};

	/**
	 * Send audio to server, records 5 seconds after audio button is pressed
	 */
	const sendAudio = () => {
		const constraints = { audio: true };

		//Check if browser has audio device they are willing to use
		navigator.mediaDevices
			.getUserMedia(constraints)
			.then(function (mediaStream) {
				console.log("received access to microphone");
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
						type: "audio/ogg; codecs=opus",
					});
					console.log("sending audio");
					chatProp.socket.emit("radio", blob, chatProp.room);
				};

				//Start recording
				mediaRecorder.start();

				//Stop recording after 5 seconds and broadcast it to server
				setTimeout(function () {
					mediaRecorder.stop();
				}, 5000);
			});
	};

	/**
	 * Playback audio received from server
	 */
	// TODO: React Hook useCallback does nothing when called with only one argument. Did you forget to pass an array of dependencies?
	const playAudio = useCallback((arrayBuffer) => {
		console.log("playing audio!");
		let blob = new Blob([arrayBuffer], {
			type: "audio/ogg; codecs=opus",
		});
		let audio = document.createElement("audio");
		audio.src = window.URL.createObjectURL(blob);
		audio.play();
	});

	/**
	 * 
	 */
	// TODO: React Hook useEffect has a missing dependency: 'chatProp.socket'. Either include it or remove the dependency array
	useEffect(() => {
		chatProp.socket.on("typing countdown", setCountdown);
		chatProp.socket.on("voice", playAudio);
		return () => {
			chatProp.socket.off("typing countdown", setCountdown);
			chatProp.socket.off("voice", playAudio);
		};
	}, [usersTyping, playAudio, setCountdown]);

	return (
		<Box>
			<Typography
				style={{
					textAlign: "center",
					width: "100%",
				}}
			>
				<h2>
					You are in room {chatProp.room}
				</h2>
			</Typography>
			<Box
				ref={scrollRef}
				sx={{
					maxHeight: "50vh",
					minHeight: "25vh",
					marginLeft: 1,
					marginRight: 1,
					overflowY: "auto",
					overflowX: "hidden",
					border: 1,
					borderColor: "primary",
				}}
			>
				<Box>
					{messageList.map((content) => {
						return (
							<Typography
								sx={{
									width: "100%",
									textAlign: content.user !== chatProp.username ? "left" : "right",
								}}
							>
								{content.user !== chatProp.username ? "from " + content.user + ": " : ""}
								{content.message}
							</Typography>
						);
					})}
				</Box>
			</Box>
			<Box>
				<Stack
					direction="row"
					sx={{ marginLeft: 3, marginTop: 3, marginBottom: 3 }}
				>
					{usersTyping.map((typer) => {
						return typer.username !== chatProp.username ? (
							<Typography>{typer.username} is typing</Typography>
						) : (
							<></>
						);
					})}
				</Stack>
				<Stack
					direction="row"
					sx={{ marginLeft: 3, marginTop: 3, marginBottom: 3 }}
				>
					<TextField
						sx = {{ width: "90%" }}
						id = "standard-basic"
						label = "Message here..."
						variant = "standard"
						value = {message}
						onChange = {(event) => {
							setMessage(event.target.value);
							setActive();
							console.log("made it here");
						}}
					/>
					<IconButton
						onClick = {() => {
							sendMessage();
							setNotActive();
						}}
						aria-label = "Example"
					>
						<SendIcon />
					</IconButton>
					<button id="audiomessage" onClick={sendAudio}>
						{<MicIcon />}
					</button>
					<button id="clearmessage" onClick={clearMessages}>
						Clear message
					</button>
				</Stack>
			</Box>
		</Box>
	);
}

export default Chat;
