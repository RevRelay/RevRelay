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
	Toolbar,
	ListItemIcon,
	Typography,
} from "@mui/material";
import Color from "../Color.js";
import React, { useState } from "react";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import { Logout } from "@mui/icons-material";
import SidebarList from "./SidebarList.js";
import NavSearchBar from "./NavSearchBar.js";

export default function Nav({
	themes,
	activeTheme,
	updateActiveTheme,
	token,
	setToken,
}) {
	const [sidebar, updateSidebar] = useState(false);

	const toggleDrawer = (open) => (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}

		updateSidebar(open);
	};
	let navigate = useNavigate();
	return (
		<>
			<Drawer open={sidebar} onClose={toggleDrawer(false)}>
				<Box
					sx={{ width: 250, height: "100%" }}
					role="presentation"
					onClick={toggleDrawer(false)}
					onKeyDown={toggleDrawer(false)}
				>
					{SidebarList()}
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						defaultValue={0}
						onChange={(x) => {
							updateActiveTheme(x.target.value);
						}}
						style={{ marginLeft: "5%", width: "90%" }}
					>
						{themes.map((x) => {
							return (
								<MenuItem key={themes.indexOf(x)} value={themes.indexOf(x)}>
									{x.name}
								</MenuItem>
							);
						})}
					</Select>
				</Box>
			</Drawer>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="static">
					<Toolbar>
						<IconButton
							size="large"
							edge="start"
							color="inherit"
							aria-label="menu"
							sx={{ mr: 2 }}
							onClick={toggleDrawer(true)}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" component="div" sx={{ display: { xs: 'none', sm: 'block'}}}> 
							RevRelay
						</Typography>
						<Box sx={{ flexGrow: 1 }}>
						<NavSearchBar/>
						</Box>
						<Box>
						{token ? (
							<Button
								color="inherit"
								onClick={() => {
									setToken("");
									navigate("/login");
								}}
							>
								Logout
							</Button>
						) : (
							<React.Fragment>
								<Button color="inherit" onClick={(x) => navigate("/register")}>
									Register
								</Button>
								<Button color="inherit" onClick={(x) => navigate("/login")}>
									Login
								</Button>
							</React.Fragment>
						)}
						</Box>
					</Toolbar>
				</AppBar>
			</Box>
		</>
	);
}
