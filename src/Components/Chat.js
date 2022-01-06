import React, { useState, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import { Box, IconButton, Stack } from "@mui/material";
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

//https://gridfiti.com/aesthetic-color-palettes/

/**
 * Creates a Chat box.
 * @param {*} param0 {Socket,username,room}
 * @returns HTML for Chatbox
 */
function Chat({ socket, username, room }) {
	const [message, setMessage] = useState("");
	const [messageList, setMesssagList] = useState([]);
	const scrollRef = useRef(null);
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
			setMesssagList((list) => [...list, messageBody]);
			setMessage("");
		}
	};

	useEffect(() => {
		socket.on("receive_message", (data) => {
			setMesssagList((list) => [...list, data]);
		});
	}, [socket]);
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
								{content.message}{" "}
								{content.user !== username ? ": from " + content.user : ""}
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
					<TextField
						sx={{ width: "90%" }}
						id="standard-basic"
						label="Message here..."
						variant="standard"
						value={message}
						onChange={(event) => {
							setMessage(event.target.value);
						}}
					/>
					<IconButton onClick={sendMessage} aria-label="Example">
						<SendIcon />
					</IconButton>
				</Stack>
			</Box>
		</Box>
	);
}

export default Chat;
