import io from "socket.io-client";
import { useEffect, useState } from "react";
import Chat from "./Chat";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import MenuItem from "@mui/material/MenuItem";
import { Box, FormControl, InputLabel, Select } from "@mui/material";
import { ChatRoom, SetStateActionChatRoom } from "../typeDef";
import getUserChats from "../API/ChatAPI";
import { useSelector } from "react-redux";
import { selectToken } from "../app/userSlice";

var socket;

/**
 * Allows for Creation of Chats and Chat box
 *
 * @returns html for chat box in bottom left
 */
function Client(props) {

	const token = useSelector(selectToken);
	/**
	 * ---
	 */
	useEffect(() => {
		socket = io.connect(
			"http://revrelaychatbackend-env.eba-d2b6turm.us-east-1.elasticbeanstalk.com/"
		);

		return;
	}, []);

	const actions = [
		{ icon: <AddBoxIcon />, name: "Join/Create Chat Room" },
		{ icon: <IndeterminateCheckBoxIcon />, name: "Leave Chat Room" },
	];

	/**
	 * @type {[ChatRoom, SetStateActionChatRoom]}
	 */
	const [chatrooms, updateChatrooms] = useState([]);
	const [currentChat, setCurrentChat] = useState("");
	const [javaRooms, setJavaRooms] = useState([]);

	useEffect(() => {
		let temprs = [...chatrooms];
		javaRooms.map((jr) => {
			let username = props.currentUser.displayName;
			let room = jr.chatID;
			let roomName = jr.roomName;
			socket.emit("join_room", { username, room });
			temprs = [
				...temprs,
				{ socket: socket, username: username, room: room, name: roomName },
			];
			setCurrentChat(roomName);
		});
		updateChatrooms([...temprs]);
	}, [javaRooms]);
	useEffect(async () => {
		try {
			await getUserChats(token, props.currentUser.userID).then((resp) => {
				setJavaRooms(resp.data.content);
			});
		} catch (e) {
			setJavaRooms([]);
		}
	}, []);

	/**
	 * ---
	 */
	const joinRoom = (username, room, roomName) => {
		if (username !== "" && room !== "") {
		}
	};

	/**
	 * ---
	 * @param {Event} event ---
	 */
	const handleChange = (event) => {
		setCurrentChat(event.target.value);
	};

	return (
		<div>
			<Box
				sx={{
					position: "absolute",
					right: 10,
					bottom: 10,
					minWidth: 275,
					zIndex: 1000,
				}}
			>
				{chatrooms.map((chat) => {
					return (
						<Box
							sx={{
								position: "absolute",
								bottom: 70,
								right: 1,
								visibility: chat.name === currentChat ? "visible" : "hidden",
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
								name={chat.name}
							/>
						</Box>
					);
				})}
				<br />
				<FormControl fullWidth>
					<InputLabel id="demo-simple-select-label">My Chats</InputLabel>
					<Select
						labelId="chats-select-label"
						id="chats-select"
						label="My Chats"
						value={currentChat}
						onChange={handleChange}
					>
						<MenuItem value="none">none</MenuItem>
						{chatrooms.map((chat) => {
							return <MenuItem value={chat.name}>{chat.name}</MenuItem>;
						})}
					</Select>
				</FormControl>
			</Box>
		</div>
	);
}

export default Client;
