import { useEffect, useState } from "react";
import Nav from "./Components/Nav/Nav.js";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Page from "./Components/Page.js";
import { createTheme, ThemeProvider } from "@mui/material";
import { Box, Theme } from "@mui/system";
import UserInfo from "./Components/UserInfo/UserInfo.js";
import ChangePassword from "./Components/UserInfo/ChangePassword.js";
import Login from "./Components/NoAuth/Login.js";
import Search from "./Components/Search.js";
import { default as Registration } from "./Components/NoAuth/Register.js";
import Client from "./Components/Client";
import APIQuery from "./API/APIQuery";
import Home from "./Components/HomeSplash/Home.js";
import { Switching } from "./typeDef.js";
import getCurrentUser from "./API/PageAPI.js";
import getAllFriends from "./API/friendsAPI.js";
//#461E52 | #DD517F | #E68E36 | #556DC8 | #7998EE.

//https://mui.com/components/autocomplete/

/**
 * Array of all possible themes.
 * @param {String} 	name 	Name to call the theme.
 * @param {Theme}	theme	The palate for the theme.
 * 		- Palate:
 * 			- Mode: 			Dark - Sets theme to the dark mode color palate (https://mui.com/customization/dark-mode/)
 * 			- Primary:			Used to represent primary interface elements for a user. It's the color displayed most frequently across your app's screens and components.
 * 				- Main: 		Navbar
 * 			- Secondary:		Used to represent secondary interface elements for a user. It provides more ways to accent and distinguish your product.
 * 				- Main:
 * 			- Backgroud:
 * 				- Paper:		SideBar background, and User Settings background
 * 				- Default:		Overall Page Background
 * 			- Text:
 * 				- Primary:
 * 				- Secondary:
 * 				- Disabled:
 * 				- Hint:
 */
const themes = [
	{
		name: "Default",
		theme: createTheme({}),
	},
	{
		name: "Dark",
		theme: createTheme({
			palette: { mode: "dark" },
			typography: {
				allVariants: {
					color: "lightgrey",
				},
			},
		}),
	},
	{
		name: "RevRelay",
		theme: createTheme({
			palette: {
				primary: {
					main: "#E55C18",
				},
				secondary: {
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
					main: "#E93479",
				},
				secondary: {
					main: "#b5179e",
				},
				background: {
					paper: "#65B8BF",
					default: "#4A1D6A",
				},
				text: {
					primary: "#FFFFFF",
					secondary: "#F9ac53",
					disabled: "#FFFFFF",
					hint: "#FFFFFF",
				},
			},
			typography: {
				allVariants: {
					color: "palette.text.secondary",
				},
			},
		}),
	},
	{
		name: "80s",
		theme: createTheme({
			palette: {
				primary: {
					main: "#A6206A",
				},
				secondary: {
					main: "#EC1C4B",
				},
				background: {
					paper: "#F16A43",
					default: "#379B9D",
				},
				text: {
					primary: "#FFFFFF",
					secondary: "#FFFFFF",
					disabled: "#FFFFFF",
					hint: "#FFFFFF",
				},
			},
			typography: {
				allVariants: {
					color: "palette.text.secondary",
				},
			},
		}),
	},
	// Hex Codes: #F08D7E | #EFA18A | #E2BAB1 | #DDA6B9 | #ACAEC5.
	{
		name: "Cloud",
		theme: createTheme({
			palette: {
				primary: {
					main: "#FEC7BC",
				},
				secondary: {
					main: "#7b7ea3",
				},
				background: {
					paper: "#C5AFC1",
					default: "#84A6D6",
				},
				text: {
					primary: "#FFFFFF",
					secondary: "#FFFFFF",
					disabled: "#FFFFFF",
					hint: "#FFFFFF",
				},
			},
			typography: {
				allVariants: {
					color: "palette.text.secondary",
				},
			},
		}),
	},
	{
		name: "Kawaii",
		theme: createTheme({
			palette: {
				primary: {
					main: "#E6C6FF",
				},
				secondary: {
					main: "#97C8E6",
				},
				background: {
					paper: "#DEFFFA",
					default: "#B0E1FF",
				},
				text: {
					primary: "#000000",
					secondary: "#708aa3",
					disabled: "#000000",
					hint: "#000000",
				},
			},
			typography: {
				allVariants: {
					color: "palette.text.secondary",
				},
			},
		}),
	},
	{
		name: "Cyberpunk",
		theme: createTheme({
			palette: {
				primary: {
					main: "#E68E36",
				},
				secondary: {
					main: "#556DC8",
				},
				background: {
					paper: "#DD517F",
					default: "#461E52",
				},
				text: {
					primary: "#D3D3D3",
					secondary: "#D3D3D3",
					disabled: "#ffffff",
					hint: "#ffffff",
				},
			},
			typography: {
				allVariants: {
					color: "palette.text.secondary",
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
					main: "#DD9999",
				},
				secondary: {
					main: "#cea2d7",
				},
				background: {
					paper: "#556696",
					default: "#332244",
				},
				text: {
					primary: "#FFFFFF",
					secondary: "#FFFFFF",
					disabled: "#FFFFFF",
					hint: "#FFFFFF",
				},
			},
			typography: {
				allVariants: {
					color: "palette.text.secondary",
				},
			},
		}),
	},
	{
		name: "Outrun",
		theme: createTheme({
			palette: {
				primary: {
					main: "#EA6789",
				},
				secondary: {
					main: "#362fbb",
				},
				background: {
					paper: "#FFB845",
					default: "#453ECA",
				},
				text: {
					primary: "#000000",
					secondary: "#000000",
					disabled: "#000000",
					hint: "#000000",
				},
			},
			typography: {
				allVariants: {
					color: "palette.text.secondary",
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
	const [sendSearch, setSendSearch] = useState(false);
	const [friends, setFriends] = useState([]);
	const [currentUser, setCurrentUser] = useState([]);

	useEffect(async () => {
		getCurrentUser(token).then((resp) => setCurrentUser(resp.data));
	}, [token]);
	useEffect(async () => {
		if (currentUser) {
			await getAllFriends(currentUser.username, token).then((resp) =>
				setFriends(resp.data)
			);
		}
	}, [currentUser]);

	let nav = useNavigate();

	localStorage.setItem("token", token);

	checkJWT();

	/**
	 * Validates the stored JWT against the database, discarding if not valid.
	 * @async
	 */
	async function checkJWT() {
		//console.log("Checking JWT");
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
			{currentUser.userID ? (
				<Client token={token} currentUser={currentUser} />
			) : (
				<></>
			)}
			<Nav
				themes={themes}
				activeTheme={activeTheme}
				updateActiveTheme={updateActiveTheme}
				token={token}
				setToken={setToken}
				sendSearch={sendSearch}
				setSendSearch={setSendSearch}
				friends={friends}
			/>
			<Box
				sx={{
					pt: 8.5,
					width: "100vw",
					height: "100vh",
					backgroundColor: "background.default",
				}}
			>
				<SwitchBoard
					token={token}
					setToken={setToken}
					sendSearch={sendSearch}
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
 * @param {Switching} 				switchProp					---
 * @param {String} 					switchProp.token 			JWT token determinig user and log in information.
 * @param {SetStateActionString} 	switchProp.setToken			State variable setter for token field information.
 * @param {Boolean}					switchProp.isSendSearch		Boolean state managing searching status.
 * @returns
 */
function SwitchBoard(switchProp) {

	if (!switchProp.token) {
		return (
			<Routes>
				<Route path="/">
					<Route index element={<Home token={switchProp.token} />} />
					<Route
						path="login"
						element={<Login setToken={switchProp.setToken} />}
					/>
					<Route
						path="register"
						element={<Registration setToken={switchProp.setToken} />}
					/>
				</Route>
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		)
	}

	return (
		<Routes>
			<Route path="/">
				<Route index element={<Home token={switchProp.token} />} />
				<Route
					path="login"
					element={<Login setToken={switchProp.setToken} />}
				/>
				<Route
					path="register"
					element={<Registration setToken={switchProp.setToken} />}
				/>
				<Route path="search">
					{/* TODO splash page for the search page w/o a search term, currently just sends you back to where you came from.*/}
					<Route index element={<Navigate to={-1} />} />
					<Route
						path=":searchTerm"
						element={
							<Search
								token={switchProp.token}
								isSendSearch={switchProp.isSendSearch}
							/>
						}
					/>
				</Route>
				<Route path="user">
					<Route index element={<Navigate to={-1} />} />
					<Route
						path=":pageParam"
						element={<Page token={switchProp.token} />}
					/>
					<Route path="profile">
						<Route index element={<Page token={switchProp.token} />} />
						<Route path="userInfo">
							<Route index element={<UserInfo token={switchProp.token} />} />
							<Route
								path="changePassword"
								element={<ChangePassword token={switchProp.token} />}
							/>
						</Route>
					</Route>
				</Route>
			</Route>
			<Route path="group">
				<Route index element={<Navigate to={-1} />} />
				<Route path=":pageParam" element={<Page token={switchProp.token} />} />
			</Route>
		</Routes>
	);
}

export default App;
