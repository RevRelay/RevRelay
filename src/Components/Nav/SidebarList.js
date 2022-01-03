import {
	AppBar,
	Autocomplete,
	Box,
	Button,
	Card,
	Drawer,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
	List,
	ListItem,
	Divider,
	ListItemText,
	ListItemButton,
	Toolbar,
	ListItemIcon,
	Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import React, { useState } from "react";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import { Logout } from "@mui/icons-material";

export default function SidebarList() {
	let navigate = useNavigate();
	return (
		<React.Fragment>
			<List>
				<ListItemButton
					onClick={(x) => navigate("/user/profile")}
					key="buttonUserProfile"
				>
					<ListItemIcon>
						<HomeIcon />
					</ListItemIcon>
					My User Profile
				</ListItemButton>
			</List>
			<Divider />
			<List>
				<ListItemButton
					onClick={(x) => navigate("/user/profile/userInfo")}
					key="buttonUserProfileSettings"
				>
					<ListItemIcon>
						<SettingsIcon />
					</ListItemIcon>
					Settings
				</ListItemButton>
			</List>
		</React.Fragment>
		//     {["Inbox", "Starred", "Send email", "Drafts"].map(
		//         (text, index) => (
		//             <ListItem button key={text}>
		//                 <ListItemIcon>
		//                     {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
		//                 </ListItemIcon>
		//                 <ListItemText primary={text} />
		//             </ListItem>
		//         )
		//     )}
		// </List>
	);
}

export function SidebarList2() {
	return (
		<List>
			{["All mail", "Trash", "Spam"].map((text, index) => (
				<ListItem button key={text}>
					<ListItemIcon>
						{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
					</ListItemIcon>
					<ListItemText primary={text} />
				</ListItem>
			))}
		</List>
	);
}
