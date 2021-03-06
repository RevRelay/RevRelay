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
				<ListItemButton
					key="buttonUserProfile"
					onClick={(x) => navigate("/user/profile")}
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
					key="buttonUserProfileSettings"
					onClick={(x) => navigate("/user/profile/userInfo")}
				>
					<ListItemIcon>
						<SettingsIcon />
					</ListItemIcon>
					Profile Settings
				</ListItemButton>
			</List>
		</React.Fragment>
	);
}
