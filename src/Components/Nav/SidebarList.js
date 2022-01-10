import {
	List,
	ListItem,
	Divider,
	ListItemText,
	ListItemButton,
	ListItemIcon,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import React from "react";
import { useNavigate } from "react-router-dom";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

/**
 * ---
 * 
 * @returns ---
 */
export default function SidebarList() {
	let navigate = useNavigate();

	return (
		<React.Fragment>
			<List>
				<ListItemButton key="buttonUserProfile" onClick={(x) => navigate("/user/profile")}>
					<ListItemIcon>
						<HomeIcon />
					</ListItemIcon>
					My User Profile
				</ListItemButton>
			</List>
			<Divider />
			<List>
				<ListItemButton key="buttonUserProfileSettings" onClick={(x) => navigate("/user/profile/userInfo")}>
					<ListItemIcon>
						<SettingsIcon />
					</ListItemIcon>
					Settings
				</ListItemButton>
			</List>
		</React.Fragment>
	);
}

/**
 * ---
 * @returns ---
 */
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
