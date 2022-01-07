import react, { useState } from "react";
import Nav from "./Components/Nav/Nav.js";
import { Routes, Route, useNavigate, Link, Navigate } from "react-router-dom";
import Page from "./Components/Page.js";
import {
	Container,
	createTheme,
	SpeedDial,
	SpeedDialIcon,
	ThemeProvider,
	Typography,
} from "@mui/material";
import { Box, Theme } from "@mui/system";
import UserInfo from "./Components/UserInfo/UserInfo.js";
import ChangePassword from "./Components/UserInfo/ChangePassword.js";
import Login from "./Components/NoAuth/Login.js";
import Search from "./Components/Search.js";
import { default as Registration } from "./Components/NoAuth/Register.js";
import Client from "./Components/Client";
import APIQuery from "./API/APIQuery";
import Home from "./Components/HomeSplash/Home.js";
import { Dispatch, SetStateAction } from "react";

/**
 * @typedef {Dispatch<SetStateAction<string>>} SetStateActionString
 */
/**
 * @typedef {Dispatch<SetStateAction<number>>} SetStateActionNumber
 */
/**
 * @typedef {Dispatch<SetStateAction<boolean>>} SetStateActionBool
 */

//#461E52 | #DD517F | #E68E36 | #556DC8 | #7998EE.

//https://mui.com/components/autocomplete/
//Primary Main - Navbar
//Background Default - Background
//Background Paper - Nav pop-out bar

/**
 * Array of all possible themes.
 * @param {string} 	name 	name to call the theme.
 * @param {Theme}	theme	the palate for the theme.
 */
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
					light: "#4cc9f0",
					main: "#E93479",
					dark: "#560bad",
				},
				secondary: {
					light: "#4895ef",
					main: "#b5179e",
				},
				background: {
					paper: "#7a04eb",
					default: "#300350",
				},
				text: {
					primary: "#FFFFFF",
					secondary: "#F9ac53",
					disabled: "#FFFFFF",
					hint: "#FFFFFF",
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
					main: "#A6206A",
					dark: "#3968cb",
				},
				secondary: {
					light: "#64cff7",
					main: "#EC1C4B",
					dark: "#3968cb",
				},
				background: {
					paper: "#F16A43",
					default: "#2F9395",
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
		name: "Cloud",
		theme: createTheme({
			palette: {
				primary: {
					light: "#f08d7e",
					main: "#FD5E53",
					dark: "#f08d7e",
				},
				secondary: {
					light: "#f08d7e",
					main: "#efa18a",
					dark: "#f08d7e",
				},
				background: {
					paper: "#FC9C54",
					default: "#4B3D60",
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
		name: "Kawaii",
		theme: createTheme({
			palette: {
				primary: {
					light: "#defffa",
					main: "#9FE4AD",
					dark: "#b0e1ff",
				},
				secondary: {
					light: "#b0e1ff",
					main: "#befcff",
					dark: "#defffa",
				},
				background: {
					paper: "#ffc1cc",
					default: "#F9A8F5",
				},
				text: {
					primary: "#000000",
					secondary: "#000000",
					disabled: "#000000",
					hint: "#000000",
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
					main: "#defe47",
					dark: "#556dc8",
				},
				secondary: {
					light: "#556dc8",
					main: "#0016ee",
					dark: "#e68e36",
				},
				background: {
					paper: "#dd517f",
					default: "#461e52",
				},
				text: {
					primary: "#D3D3D3",
					secondary: "#D3D3D3",
					disabled: "#ffffff",
					hint: "#ffffff",
				},
			},
		}),
	},
	//Hex Codes: #674AB3 | #A348A6 | #9F63C4 | #9075D8 | #CEA2D7.
	{
		name: "Lofi",
		theme: createTheme({
			palette: {
				primary: {
					light: "#cea2d7",
					main: "#9075D8",
					dark: "#674ab3",
					contrastText: "#000000",
				},
				secondary: {
					light: "#674ab3",
					main: "#9075d8",
					dark: "#cea2d7",
					contrastText: "#000000",
				},
				background: {
					paper: "#A348A6",
					default: "#674AB3",
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
		name: "Outrun",
		theme: createTheme({
			palette: {
				primary: {
					light: "#7998ee",
					main: "#ff0052",
					dark: "#712275",
				},
				secondary: {
					light: "#712275",
					main: "#362fbb",
					dark: "#7998ee",
				},
				background: {
					paper: "#ffef00",
					default: "#00f3ff",
				},
				text: {
					primary: "#000000",
					secondary: "#000000",
					disabled: "#000000",
					hint: "#000000",
				},
			},
		}),
	},
];

/**
 * Main function of our single page aplication.
 * 
 * Changes theme and current page allowed based on their token.
 * 
 * @returns Single Page of our application.
 */
function App() {

	/**
	 * Setting the JWT string token 
	 */
	const [token, setToken] = useState(localStorage.getItem("token"));
	localStorage.setItem("token", token);

	checkJWT();

	async function checkJWT() {
		console.log("Checking JWT");
		let axiosConfig = {
			headers: {
				Authorization: "Bearer " + token,
			},
		};
		await APIQuery.get("/validate", axiosConfig)
			.then()
			.catch((x) => {
				setToken("");
				localStorage.setItem("token", "");
			});
	}

	/**
	 * Setting the active theme but changing the int of activeTheme. Corresponding to the theme array
	 */
	const [activeTheme, updateActiveTheme] = useState(0);
	
	return (
		<ThemeProvider theme={themes[activeTheme].theme}>
			{/* Renders Chat Box */}
			{token ? <Client /> : <></>}
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
					width: "100vw",
					height: "100vh",
					backgroundColor: "background.default",
				}}
			>
				<SwitchBoard
					token={token}
					setToken={setToken}
				/>
			</Box>
		</ThemeProvider>
	);
}

/**
 * Use the token object to find if a user is logged in or not, it will be null if there is no user present currently
 * and will hold a JWT if there is currently a user logged in.
 * 
 * Use the token object passed above if you need to find any
 * 
 * @param {object} 					param
 * @param {string} 					param.token 	JWT token determinig user and log in information.
 * @param {SetStateActionString} 	param.setToken	state variable setter for token field information.
 * @returns 
 */
function SwitchBoard({ token, setToken }) {
	return (
		<Routes>
			<Route path="/">
				<Route index element={<Home />} />
				<Route
					path="login"
					element={<Login setToken={setToken} />}
				/>
				<Route
					path="register"
					element={<Registration setToken={setToken} />}
				/>
				<Route path="search">
					{/* TODO splash page for the search page w/o a search term, currently just sends you back to where you came from.*/}
					<Route index element={<Navigate to={-1} />} />
					<Route path=":searchTerm" element={<Search token={token} />} />
				</Route>
				<Route path="user">
					<Route index element={<Users />} />
					<Route path=":userID" element={<Page JWT={token} />}/>
					<Route path="profile">
						<Route index element={<Page JWT={token} />} />
						<Route path="userInfo" >
							<Route index element={<UserInfo JWT={token} />} />
							<Route path="changePassword" element={<ChangePassword JWT={token}/>} />
						</Route>
						<Route path="userInfo" element={<UserInfo JWT={token} />} />
					</Route>
				</Route>
			</Route>
			<Route path="group">
				<Route index element={<Groups />} />
				<Route path=":userID" element={<Group />} />
				<Route path="profile" element={<GroupProfile />} />
			</Route>
		</Routes>
	);
}

// function Home() {
// 	return <Typography color="textPrimary">HOME</Typography>;
// }

// function Login() {
// 	return <p>Login</p>;
// // }
// function Registration() {
// 	return <p>Registration</p>;
// }

/**
 * 
 * @returns 
 */
function Users() {
	return <Typography color="textPrimary">Users</Typography>;
}

/**
 * 
 * @returns 
 */
function User() {
	return <Typography color="textPrimary">User</Typography>;
}

/**
 * 
 * @returns 
 */
function UserProfile() {
	return <Typography color="textPrimary">UserProfile</Typography>;
}

/**
 * 
 * @returns 
 */
function Groups() {
	return <Typography color="textPrimary">Groups</Typography>;
}

/**
 * 
 * @returns 
 */
function Group() {
	return <Typography color="textPrimary">Group</Typography>;
}

/**
 * 
 * @returns 
 */
function GroupProfile() {
	return <p>GroupProfile</p>;
}

export default App;
