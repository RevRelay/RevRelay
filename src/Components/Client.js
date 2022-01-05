import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import {
	Box,
	Container,
	createTheme,
	SpeedDial,
	SpeedDialIcon,
	ThemeProvider,
	Typography,
} from "@mui/material";
const socket = io.connect("http://localhost:3001");
function Client() {
	const actions = [
		{ icon: <AddBoxIcon />, name: "Join/Create Chat Room" },
		{ icon: <IndeterminateCheckBoxIcon />, name: "Leave Chat Room" },
	];
	var chatrooms = [];
	var chatroomObject = { socket: null, username: null, room: null };

	const [username, setUserName] = useState("");
	const [room, setRoom] = useState("");
	const [showChat, setShowChat] = useState(false);

	const joinRoom = () => {
		if (username !== "" && room !== "") {
			socket.emit("join_room", { username, room });
			setShowChat(true);
		}
	};

	return (
		<div>
			<Box
				sx={{
					position: "absolute",
					bottom: 16,
					right: 16,
					minWidth: "20vw",
				}}
			>
				<SpeedDial
					ariaLabel="SpeedDial basic example"
					icon={<SpeedDialIcon />}
					sx={{
						position: "absolute",
						bottom: 16,
						right: 16,
					}}
				>
					{actions.map((action) => (
						<SpeedDialAction
							key={action.name}
							icon={action.icon}
							tooltipTitle={action.name}
						/>
					))}
				</SpeedDial>
				<Box
					sx={{
						position: "absolute",
						backgroundColor: "primary.main",
						bottom: 0,
						left: 0,
						minWidth: "100%",
					}}
				></Box>
			</Box>
			{!showChat ? (
				<div className="joinChatContainer">
					<h2 className="clientHeader">Join A Room</h2>
					<p>
						<TextField
							id="outlined-basic"
							label="Enter Room ID"
							variant="outlined"
							onChange={(event) => {
								setRoom(event.target.value);
							}}
						/>
					</p>
					<p>
						<TextField
							id="outlined-basic"
							label="Enter User Name"
							variant="outlined"
							onChange={(event) => {
								setUserName(event.target.value);
							}}
						/>
					</p>

					<Button onClick={joinRoom} variant="outlined" size="large">
						Join Room
					</Button>
				</div>
			) : (
				<Chat socket={socket} username={username} room={room} />
			)}
		</div>
	);
}

export default Client;
