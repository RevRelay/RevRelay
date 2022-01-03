import react, { useState } from "react";
import Nav from "./Components/Nav/Nav.js";
import { Routes, Route, useNavigate, Link, Navigate } from "react-router-dom";
import "./Styles/themes.css";
import Color from "./Components/Color.js";
import Page from "./Components/Page.js";
import {
	Container,
	createTheme,
	ThemeProvider,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import UserInfo from "./Components/UserInfo/UserInfo.js";
import Login from "./Components/NoAuth/Login.js";
import { default as Registration } from "./Components/NoAuth/Register.js";
import LoginSplash from "./Components/NoAuth/LoginSplash.js";
//https://gridfiti.com/aesthetic-color-palettes/
//#461E52 | #DD517F | #E68E36 | #556DC8 | #7998EE.

//https://mui.com/components/autocomplete/
const themes = [
	{
		name: "Default",
		theme: createTheme({}),
	},
	{
		name: "Dark",
		theme: createTheme({ palette: { mode: "dark" } }),
	},
	{
		name: "RevRelay",
		theme: createTheme({
			palette: {
				primary: {
					light: "#FFFFF",
					main: "#F26925",
					dark: "#474C55",
				},
				secondary: {
					light: "#B9B9BA",
					main: "#72A4C2",
				},
				background: {
					paper: "#FCB414",
					default: "#72A4C2",
				},
			},
		}),
	},
	{
		name: "Vaporwave",
		theme: createTheme({
			palette: {
				primary: {
					light: "#fa92fb",
					main: "#a653f5",
					dark: "#f96cff",
				},
				secondary: {
					light: "#8f8cf2",
					main: "#65b8bf",
				},
				background: {
					paper: "#8f8cf2",
					default: "#65b8bf",
				},
			},
		}),
	},
	{
		name: "80s",
		theme: createTheme({
			palette: {
				primary: {
					light: "#ff68a8",
					main: "#ca7cd8",
					dark: "#3968cb",
				},
				secondary: {
					light: "#64cff7",
					main: "#f7e752",
					dark: "#3968cb",
				},
				background: {
					paper: "#f7e752",
					default: "#64cff7",
				},
			},
		}),
	},
	{
		name: "Cloud",
		theme: createTheme({
			palette: {
				primary: {
					light: "#f08d7e",
					main: "#efa18a",
					dark: "#f08d7e",
				},
				secondary: {
					light: "#f08d7e",
					main: "#efa18a",
					dark: "#f08d7e",
				},
				background: {
					paper: "#dda6b9",
					default: "#acaec5",
				},
			},
		}),
	},

	{
		name: "Kawaii",
		theme: createTheme({
			palette: {
				primary: {
					light: "#defffa",
					main: "#befcff",
					dark: "#b0e1ff",
				},
				secondary: {
					light: "#b0e1ff",
					main: "#befcff",
					dark: "#defffa",
				},
				background: {
					paper: "#ffdaf5",
					default: "#e6c6ff",
				},
			},
		}),
	},
	{
		name: "Cyberpunk",
		theme: createTheme({
			palette: {
				primary: {
					light: "#e68e36",
					main: "#7998ee",
					dark: "#556dc8",
				},
				secondary: {
					light: "#556dc8",
					main: "#7998ee",
					dark: "#e68e36",
				},
				background: {
					paper: "#dd517f",
					default: "#461e52",
				},
				text: {
					primary: "#FFFFFF",
					secondary: "#FFFFFF",
					disabled: "#FFFFFF",
					hint: "#FFFFFF",
				},
			},
		}),
	},
	{
		name: "Lofi",
		theme: createTheme({
			palette: {
				primary: {
					light: "#cea2d7",
					main: "#9075d8",
					dark: "#674ab3",
				},
				secondary: {
					light: "#674ab3",
					main: "#9075d8",
					dark: "#cea2d7",
				},
				background: {
					paper: "#9f63c4",
					default: "#a348a6",
				},
			},
		}),
	},
	{
		name: "Outrun",
		theme: createTheme({
			palette: {
				primary: {
					light: "#7998ee",
					main: "#362fbb",
					dark: "#712275",
				},
				secondary: {
					light: "#712275",
					main: "#362fbb",
					dark: "#7998ee",
				},
				background: {
					paper: "#f97698",
					default: "#ffb845",
				},
			},
		}),
	},
];

//Comment For Git

function App() {
	const [token, setToken] = useState();
	const [activeTheme, updateActiveTheme] = useState(0);
	return (
		<ThemeProvider theme={themes[activeTheme].theme}>
			<Nav
				themes={themes}
				activeTheme={activeTheme}
				updateActiveTheme={updateActiveTheme}
				token={token}
				setToken={setToken}
			/>
			<Box
				sx={{
					paddingTop: 8.5,
					width: "99.1vw",
					height: "90vh",
					backgroundColor: "background.default",
				}}
			>
				<SwitchBoard
					token={token}
					setToken={setToken}
					activeTheme={activeTheme}
					updateActiveTheme={updateActiveTheme}
				/>
			</Box>
		</ThemeProvider>
	);
}
function SwitchBoard({ token, setToken, activeTheme, updateActiveTheme }) {
	/**
	 * Use the token object to find if a user is logged in or not, it will be null if there is no user present currently
	 * and will hold a JWT if there is currently a user logged in.
	 *
	 * Use the token object passed above if you need to find any
	 */
	if(token){
		var element = document.querySelector('canvas');
		if(element){
			element.parentNode.removeChild(element);
		}
	}
	return (
		<Routes>
			<Route path="/">
				<Route index element={<Home />} />
				<Route path="login" element={<Login setToken={setToken} token={token}/>} />
				<Route path="register" element={<Registration setToken={setToken} token={token}/>} />
				<Route path="user">
					<Route index element={<Users />} />
					<Route path=":userID" element={<User />} />
					<Route path="profile">
						<Route index element={token ? <Page theme={activeTheme} themes={updateActiveTheme} /> : <Navigate replace to="/login"/>}/>
						<Route path="userInfo" element={token ? <UserInfo JWT={token}/> : <Navigate replace to="/login"/>}/>
					</Route>
				</Route>
				<Route path="group">
					<Route index element={<Groups />} />
					<Route path=":userID" element={<Group />} />
					<Route path="profile" element={<GroupProfile />} />
				</Route>
			</Route>
		</Routes>
	);
}

function Home() {
	return <Typography color="textPrimary">HOME</Typography>;
}

// function Login() {
// 	return <p>Login</p>;
// // }
// function Registration() {
// 	return <p>Registration</p>;
// }

function Users() {
	return <Typography color="textPrimary">Users</Typography>;
}

function User() {
	return <Typography color="textPrimary">User</Typography>;
}

function UserProfile() {
	return <Typography color="textPrimary">UserProfile</Typography>;
}

function Groups() {
	return <Typography color="textPrimary">Groups</Typography>;
}

function Group() {
	return <Typography color="textPrimary">Group</Typography>;
}

function GroupProfile() {
	return <p>GroupProfile</p>;
}

export default App;
