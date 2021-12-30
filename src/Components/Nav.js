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
import Color from "./Color.js";
import React, { useState } from "react";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import { Logout } from "@mui/icons-material";

export default function Nav({ themes, theme, updateTheme, setToken }) {
	const [theme, updateTheme] = useState(0);
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
		<div style={{ color: Color(3, theme, themes) }}>
			<div className="App">
				<Drawer open={sidebar} onClose={toggleDrawer(false)}>
					<Box
						sx={{ width: 250, height: "100%" }}
						role="presentation"
						onClick={toggleDrawer(false)}
						onKeyDown={toggleDrawer(false)}
						style={{ backgroundColor: Color(2, theme, themes) }}
					>
						<List>
							{["Inbox", "Starred", "Send email", "Drafts"].map(
								(text, index) => (
									<ListItem button key={text}>
										<ListItemIcon>
											{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
										</ListItemIcon>
										<ListItemText primary={text} />
									</ListItem>
								)
							)}
						</List>
						<Divider />
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
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							defaultValue={0}
							onChange={(x) => {
								updateTheme(x.target.value);
							}}
							style={{ marginLeft: "5%", width: "90%" }}
						>
							{themes.map((x) => {
								return (
									<MenuItem key={themes.indexOf(x)} value={themes.indexOf(x)}>
										{x}
									</MenuItem>
								);
							})}
						</Select>
					</Box>
				</Drawer>
				<Box sx={{ flexGrow: 1 }}>
					<AppBar
						position="static"
						style={{ backgroundColor: Color(1, theme, themes) }}
					>
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
							<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
								RevRelay
							</Typography>
							{token?
							<Button color="inherit" onClick={() => {setToken(""); navigate("/login")}} >Logout</Button>:
							<React.Fragment>
								<Button color="inherit" onClick={(x) => navigate("/register")}>
									Register
								</Button>
								<Button color="inherit" onClick={(x) => navigate("/login")}>
									Login
								</Button> 
							</React.Fragment> }
						</Toolbar>
					</AppBar>
				</Box>
			</div>
		</div>
	);
}
