import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Socket } from "socket.io-client";

//https://gridfiti.com/aesthetic-color-palettes/

/**
 * 
 * @param {object} 	param
 * @param {Socket}	param.socket
 * @param {string}	param.username 	the username of the current user.
 * @param {string}	param.room		the name of the room you are currently in.
 * @returns 
 */
function Chat({ socket, username, room }) {
	const [message, setMessage] = useState("");
	const [messageList, setMesssagList] = useState([]);

	/**
	 * 
	 */
	const sendMessage = () => {
		if (message !== "") {
			const messageBody = {
				room: room,
				user: username,
				message: message,
			};
			socket.emit("send_message", messageBody);
		}
	};

	useEffect(() => {
		socket.on("receive_message", (data) => {
			setMesssagList((list) => [...list, data]);
		});
	}, [socket]);
	
	return (
		<React.Fragment>
			<h2 className="joinAlert">You are in room {room}</h2>

			<Box>
				{messageList.map((content) => {
					return (
						<h4 className="msgbody">
							{content.message}:{" "}
							<span className="msgFrom">from {content.user}</span>
						</h4>
					);
				})}
			</Box>

			<React.Fragment>
				<TextField
					id="standard-basic"
					label="Message here..."
					variant="standard"
					onChange={(event) => {
						setMessage(event.target.value);
					}}
				/>
				<Button
					variant="contained"
					endIcon={<SendIcon />}
					onClick={sendMessage}
				>
					Send
				</Button>
			</React.Fragment>
		</React.Fragment>
	);
}

export default Chat;
