import React, { useState } from "react";
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
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import "./Styles/themes.css";
//https://gridfiti.com/aesthetic-color-palettes/
//#461E52 | #DD517F | #E68E36 | #556DC8 | #7998EE.

//https://mui.com/components/autocomplete/
const themes = [
	"Vaporwave",
	"Synthwave",
	"Outrun",
	"Lofi",
	"Kawaii",
	"Cyberpunk",
	"Cloud",
	"80s",
	"90s",
];

function Color(cid, theme) {
	return "var( --" + cid + "-" + themes[theme] + ") ";
}

function App() {
	const [theme, updateTheme] = useState(0);
	const [sidebar, updateSidebar] = React.useState(false);

	const toggleDrawer = (open) => (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}

		updateSidebar(open);
	};

	return (
		<React.Fragment style={{ color: Color(3, theme) }}>
			<div
				className="App"
				style={{
					height: "100vh",
					minHeight: "100vh",
					backgroundColor: Color(1, theme),
					color: Color(3, theme),
				}}
			>
				<Drawer open={sidebar} onClose={toggleDrawer(false)}>
					<Box
						sx={{ width: 250, height: "100%" }}
						role="presentation"
						onClick={toggleDrawer(false)}
						onKeyDown={toggleDrawer(false)}
						style={{ backgroundColor: Color(2, theme) }}
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
					</Box>
				</Drawer>
				<Box sx={{ flexGrow: 1 }}>
					<AppBar
						position="static"
						style={{ backgroundColor: Color(2, theme) }}
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
							<Button color="inherit">Register</Button>
							<Button color="inherit">Login</Button>
						</Toolbar>
					</AppBar>
				</Box>

				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					defaultValue={0}
					onChange={(x) => {
						updateTheme(x.target.value);
					}}
				>
					{themes.map((x) => {
						return (
							<MenuItem key={themes.indexOf(x)} value={themes.indexOf(x)}>
								{x}
							</MenuItem>
						);
					})}
				</Select>
				<Button>hello</Button>
			</div>
			<div>
				<Card
					sx={{ minWidth: "20%", maxWidth: 300, minHeight: 500 }}
					style={{
						backgroundColor: Color(1, theme),
						display: "inline-block",
					}}
				>
					1
				</Card>
				<Card
					sx={{ minWidth: "20%", maxWidth: 300, minHeight: 500 }}
					style={{
						backgroundColor: Color(2, theme),
						display: "inline-block",
					}}
				>
					2
				</Card>
				<Card
					sx={{ minWidth: "20%", maxWidth: 300, minHeight: 500 }}
					style={{
						backgroundColor: Color(3, theme),
						display: "inline-block",
					}}
				>
					3
				</Card>
				<Card
					sx={{ minWidth: "20%", maxWidth: 300, minHeight: 500 }}
					style={{
						backgroundColor: Color(4, theme),
						display: "inline-block",
					}}
				>
					4
				</Card>
				<Card
					sx={{ minWidth: "20%", maxWidth: 300, minHeight: 500 }}
					style={{
						backgroundColor: Color(5, theme),
						display: "inline-block",
					}}
				>
					5
				</Card>
			</div>
		</React.Fragment>
	);
}

export default App;
