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

import React, { useState } from "react";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import SidebarList from "./SidebarList.js";
import NavSearchBar from "./NavSearchBar.js";
import { SetStateActionNumber, SetStateActionString, SetStateActionBool } from "../../typeDef";
import { clearJWT } from "../NoAuth/JwtSlice";
import { useDispatch, useSelector } from "react-redux";

/**
 * Creation of a Navbar using 5 hooks, 2 for user and 3 for themes.
 * 
 * Token change login/register to logout, and also logout the user
 * Themes import load all of the themes
 * 
 * @param {object} 					param
 * @param {object}	 				param.themes 			load all of the themes
 * @param {number} 					param.activeTheme 		integer referencing the current theme
 * @param {SetStateActionNumber}	param.updateActiveTheme	passed to change the state of activeTheme
 * @param {SetStateActionString} 	param.setToken			passed to change the state of token
 * @returns Returns a react page for the navbar
 */
export default function Nav({
	themes,
	activeTheme,
	updateActiveTheme,
	token,
	setToken,
}) {

	const dispatch = useDispatch();

	/**
	 * @type {[boolean, SetStateActionBool]}
	 */
	const [sidebar, updateSidebar] = useState(false);

	/**
	 * 
	 * @param {Event} open 
	 * @returns 
	 */
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

	const logout = () => {
		setToken("");
		dispatch(clearJWT());
		navigate("/login");
	}


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
						value={activeTheme}
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
						<Typography variant="h6" component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
							RevRelay
						</Typography>
						<Box sx={{ flexGrow: 1 }}>
							<NavSearchBar />
						</Box>
						<Box>
							{token ? (
								<Button
									color="inherit"
									onClick={logout} startIcon={<LogoutIcon />}
								>
									<Typography sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
										Logout
									</Typography>
								</Button>
							) : (
								<React.Fragment>
									<Button color="inherit" onClick={(x) => navigate("/register")} startIcon={<LoginIcon />}>
										<Typography sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
											Register
										</Typography>
									</Button>
									<Button color="inherit" onClick={(x) => navigate("/login")} startIcon={<HowToRegIcon />}>
										<Typography sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
											Login
										</Typography>
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
