import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import MenuItem from "@mui/material/MenuItem";
import {
	Box,
	Container,
	createTheme,
	FormControl,
	InputLabel,
	Select,
	SpeedDial,
	SpeedDialIcon,
	Stack,
	ThemeProvider,
	Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
const socket = io.connect("http://localhost:3001");
function Client() {
	const actions = [
		{ icon: <AddBoxIcon />, name: "Join/Create Chat Room" },
		{ icon: <IndeterminateCheckBoxIcon />, name: "Leave Chat Room" },
	];
	var [chatrooms, updateChatrooms] = useState([]);
	const [currentChat, setCurrentChat] = useState(0);
	const [username, setUserName] = useState("");
	const [room, setRoom] = useState("");

	const joinRoom = () => {
		if (username !== "" && room !== "") {
			socket.emit("join_room", { username, room });
			updateChatrooms([
				...chatrooms,
				{ socket: socket, username: username, room: room },
			]);
		}
	};
	const handleChange = (event) => {
		setCurrentChat(event.target.value);
	};

	return (
		<div>
			<Box
				sx={{
					position: "absolute",
					right: 16,
					bottom: 16,
					minWidth: 275,
				}}
			>
				{chatrooms.map((chat) => {
					return (
						<Box
							sx={{
								position: "absolute",
								bottom: 70,
								right: 1,
								visibility: chat.room === currentChat ? "visible" : "hidden",
								minWidth: "16vw",
								minHeight: "25vh",
								backgroundColor: "background.paper",
								border: 1,
								borderColor: "primary",
								borderRadius: 5,
							}}
						>
							<Chat
								socket={chat.socket}
								username={chat.username}
								room={chat.room}
							/>
						</Box>
					);
				})}
				<br />
				<FormControl fullWidth>
					<InputLabel id="demo-simple-select-label">Age</InputLabel>
					<Select
						labelId="chats-select-label"
						id="chats-select"
						label="Chats"
						value={currentChat}
						onChange={handleChange}
					>
						<MenuItem value="none">none</MenuItem>
						{chatrooms.map((chat) => {
							return <MenuItem value={chat.room}>{chat.room}</MenuItem>;
						})}
					</Select>
				</FormControl>
			</Box>

			<div className="joinChatContainer">
				<h2 className="clientHeader">Join A Room</h2>
				<Box>
					<TextField
						id="outlined-basic"
						label="Enter Room ID"
						variant="outlined"
						onChange={(event) => {
							setRoom(event.target.value);
						}}
					/>
				</Box>
				<Box>
					<TextField
						id="outlined-basic"
						label="Enter User Name"
						variant="outlined"
						onChange={(event) => {
							setUserName(event.target.value);
						}}
					/>
				</Box>

				<Button onClick={joinRoom} variant="outlined" size="large">
					Join Room
				</Button>
			</div>
		</div>
	);
}

export default Client;
