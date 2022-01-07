import React, { useState, useEffect, useRef, useCallback } from "react";

import {
	Box,
	Button,
	Card,
	CardHeader,
	CardMedia,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Divider,
	Fade,
	Grid,
	IconButton,
	Pagination,
	Paper,
	Tab,
	Tabs,
	TextField,
	Tooltip,
	Typography,
	Stack,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Socket } from "socket.io-client";
import MicIcon from "@mui/icons-material/Mic";

//https://gridfiti.com/aesthetic-color-palettes/

/**
 * 
 * @param {object} 	param
 * @param {Socket}	param.socket
 * @param {string}	param.username 	the username of the current user.
 * @param {string}	param.room		the name of the room you are currently in.
 * @returns HTML for Chatbox
 */
function Chat({ socket, username, room }) {
	const [message, setMessage] = useState("");
	const [messageList, setMessageList] = useState([]);
	const scrollRef = useRef(null);
	const [usersTyping, setUsersTyping] = useState([]);

	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
		}
	}, [messageList]);
	const sendMessage = () => {
		if (message !== "") {
			const messageBody = {
				room: room,
				user: username,
				message: message,
			};
			socket.emit("send_message", messageBody);
			setMessageList((list) => [...list, messageBody]);
			setMessage("");
		}
	};

	useEffect(() => {
		socket.on("receive_message", (data) => {
			setMessageList((list) => [...list, data]);
		});
	}, [socket]);
	// Clear the chatroom
	const clearMessages = () => {
		setMessageList((list) => []);
	};

	// Setting active/non-active users
	// Shows if someone is typing
	const setActive = () => {
		console.log(usersTyping);
		let userActive = false;
		for (var i = 0; i < usersTyping.length; i++) {
			if (usersTyping[i]["username"] == username) {
				userActive = true;
				//If current typing countdown is 4, don't start a new countdown timer
				if (usersTyping[i]["countdown"] < 4) {
					socket.emit("active countdown", {
						user: username,
						room: room,
					});
				}
			}
		}
		if (!userActive) {
			socket.emit("active countdown", {
				user: username,
				room: room,
			});
		}
	};

	const setNotActive = () => {
		for (var i = 0; i < usersTyping.length; i++) {
			if (usersTyping[i]["username"] == username) {
				socket.emit("not active", {
					user: username,
					room: room,
				});
			}
		}
	};

	//Actually manipulate the frontend state of the list of which users are typing
	const setCountdown = (data) => {
		console.log(data);
		let userActive = false;
		let newList = [...usersTyping];
		for (var i = 0; i < usersTyping.length; i++) {
			if (usersTyping[i]["username"] == data["user"]) {
				userActive = true;
				if (
					(data["countdown"] == 0 && usersTyping[i]["countdown"] == 1) ||
					data["countdown"] == -1
				) {
					newList.splice(i, 1);
				} else {
					newList[i]["countdown"] = data["countdown"];
				}
			}
		}
		if (!userActive && data["countdown"] == 4) {
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

	// Send audio to server, records 5 seconds after button is pressed
	const sendAudio = () => {
		const constraints = { audio: true };
		console.log("audio button pressed");

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
					socket.emit("radio", blob, room);
				};

				//Start recording
				mediaRecorder.start();

				//Stop recording after 5 seconds and broadcast it to server
				setTimeout(function () {
					mediaRecorder.stop();
				}, 5000);
			});
	};

	//Playback audio received from server
	const playAudio = useCallback((arrayBuffer) => {
		console.log("playing audio!");
		let blob = new Blob([arrayBuffer], {
			type: "audio/ogg; codecs=opus",
		});
		let audio = document.createElement("audio");
		audio.src = window.URL.createObjectURL(blob);
		audio.play();
	});

	useEffect(() => {
		socket.on("typing countdown", setCountdown);
		socket.on("voice", playAudio);
		return () => {
			socket.off("typing countdown", setCountdown);
			socket.off("voice", playAudio);
		};
	}, [usersTyping, playAudio, setCountdown]);

	return (
		<Box>
			<h2
				style={{
					textAlign: "center",
					width: "100%",
				}}
			>
				You are in room {room}
			</h2>
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
							<Box
								sx={{
									width: "100%",
									textAlign: content.user !== username ? "left" : "right",
								}}
							>
								{content.user !== username ? "from " + content.user + ": " : ""}
								{content.message}
							</Box>
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
						return typer.username !== username ? (
							<p>{typer.username} is typing</p>
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
						sx={{ width: "90%" }}
						id="standard-basic"
						label="Message here..."
						variant="standard"
						value={message}
						onChange={(event) => {
							setMessage(event.target.value);
							setActive();
							console.log("made it here");
						}}
					/>
					<IconButton
						onClick={() => {
							sendMessage();
							setNotActive();
						}}
						aria-label="Example"
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
