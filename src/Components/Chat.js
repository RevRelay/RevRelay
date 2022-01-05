import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";

//https://gridfiti.com/aesthetic-color-palettes/
function Chat({ socket, username, room }) {
	const [message, setMessage] = useState("");
	const [messageList, setMesssagList] = useState([]);

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
		<div>
			<h2 className="joinAlert">You are in room {room}</h2>

			<div>
				{messageList.map((content) => {
					return (
						<h4 className="msgbody">
							{content.message}:{" "}
							<span className="msgFrom">from {content.user}</span>
						</h4>
					);
				})}
			</div>

			<div>
				<TextField
					id="standard-basic"
					label="Message here..."
					variant="standard"
					onChange={(event) => {
						setMessage(event.target.value);
					}}
				/>
				<div></div>
				<Button
					variant="contained"
					endIcon={<SendIcon />}
					onClick={sendMessage}
				>
					Send
				</Button>
			</div>
		</div>
	);
}

export default Chat;
