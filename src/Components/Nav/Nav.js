import {
	AppBar,
	Avatar,
	Box,
	Button,
	Divider,
	Drawer,
	IconButton,
	ListItemButton,
	MenuItem,
	Paper,
	Select,
	Stack,
	Toolbar,
	Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import SidebarList from "./SidebarList.js";
import NavSearchBar from "./NavSearchBar.js";

import {
	NavBar,
	SetStateActionNumber,
	SetStateActionString,
	SetStateActionBool,
} from "../../typeDef";
import { HorizontalRule } from "@mui/icons-material";
import { getProfilePic } from "../../API/UserAPI.js";
import { width } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { clearJWT, selectJWT } from "../NoAuth/jwtSlice.js";

/**
 * Creation of a Navbar using 5 hooks, 2 for user and 3 for themes.
 *
 * Token change login/register to logout, and also logout the user.
 * Themes import load all of the themes
 *
 * @param {NavBar} 					navProp						An Array for the Nav to determine the theme and update the theme.
 * @param {any[]}	 				navProp.themes 				Load all of the List of Themes.
 * @param {Number} 					navProp.activeTheme 		Integer referencing the current theme
 * @param {SetStateActionNumber}	navProp.updateActiveTheme	State variable setter of activeTheme.
 * @param {SetStateActionString} 	navProp.setToken			State variable setter of token.
 * @param {Boolean}					navProp.sendSearch			Boolean state managing searching status.
 * @param {SetStateActionBool}		navProp.setSendSearch		State variable setter of sendSearch.
 * @param {friends}					navProp.friends				State variable current user friends
 * @returns Returns a react page for the navbar
 */
export default function Nav(navProp) {

	const dispatch = useDispatch();
	const JWT = useSelector(selectJWT);

	const [sidebar, updateSidebar] = useState(false);

	/**
	 * ---
	 * @param {Event} open ---
	 * @returns ---
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
						value={navProp.activeTheme}
						onChange={(x) => {
							navProp.updateActiveTheme(x.target.value);
						}}
						style={{ marginLeft: "5%", width: "90%" }}
					>
						{navProp.themes.map((x) => {
							return (
								<MenuItem
									key={navProp.themes.indexOf(x)}
									value={navProp.themes.indexOf(x)}
								>
									{x.name}
								</MenuItem>
							);
						})}
					</Select>
					<br />
					<br />

					<Divider />
					<Typography variant="h5" sx={{ ml: 2, mt: 2 }}>
						Friends
					</Typography>
					
					{navProp.friends.map((f) => {
						return (
							<>
								<ListItemButton onClick={() => navigate("/user/" + f.userID)}>
									<Stack direction="row">
										<Avatar alt={f.displayName} src={getProfilePic(f.userID)} />
										<Typography sx={{ my: "auto", pl: 2 }}>
											{f.displayName}
										</Typography>
									</Stack>
								</ListItemButton>
							</>
						);
					})}
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
						<Typography
							variant="h6"
							component="div"
							sx={{ display: { xs: "none", sm: "block" } }}
						>
							RevRelay
						</Typography>
						<Box sx={{ flexGrow: 1 }}>
							<NavSearchBar
								sendSearch={navProp.sendSearch}
								setSendSearch={navProp.setSendSearch}
							/>
						</Box>
						<Box>
							{navProp.token ? (
								<Button
									color="inherit"
									onClick={() => {
										dispatch(clearJWT());
										navigate("/login");
									}}
									startIcon={<LogoutIcon />}
								>
									<Typography
										sx={{ display: { xs: "none", sm: "none", md: "block" } }}
									>
										Logout
									</Typography>
								</Button>
							) : (
								<React.Fragment>
									<Button
										color="inherit"
										onClick={(x) => navigate("/register")}
										startIcon={<LoginIcon />}
									>
										<Typography
											sx={{ display: { xs: "none", sm: "none", md: "block" } }}
										>
											Register
										</Typography>
									</Button>
									<Button
										color="inherit"
										onClick={(x) => navigate("/login")}
										startIcon={<HowToRegIcon />}
									>
										<Typography
											sx={{ display: { xs: "none", sm: "none", md: "block" } }}
										>
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
