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
import APIQuery from "./app/api";
import Home from "./Components/HomeSplash/Home.js";
import { Switching } from "./typeDef.js";
import { getCurrentUser, getAllFriends, verifyToken } from './app/api'
//import getCurrentUser from "./API/PageAPI.js";
//import getAllFriends from "./API/friendsAPI.js";
import { selectJWT, verify } from "./Components/NoAuth/jwtSlice";
import { useSelector, useDispatch } from "react-redux"
import themes from "./Components/Library/themes.js";
//#461E52 | #DD517F | #E68E36 | #556DC8 | #7998EE.

//https://mui.com/components/autocomplete/

/**
 * Main function of our single page aplication.
 *
 * Changes theme and current page allowed based on their token.
 *
 * @returns Single Page of our application.
 */
function App() {

	const dispatch = useDispatch();
	/**
	 * Setting the JWT string token
	 */
	//const [token, setToken] = useState(localStorage.getItem("token"));
	const token = useSelector(selectJWT);
	//const setToken = useDispatch(setJWT);
	const setToken = null;
	const [sendSearch, setSendSearch] = useState(false);
	const [friends, setFriends] = useState([]);
	const [currentUser, setCurrentUser] = useState([]);

	useEffect(async () => {
		getCurrentUser(token).then((resp) => setCurrentUser(resp.data));
		dispatch(verify(token));
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
				//setToken={setToken}
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
					//setToken={setToken}
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
		);
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
