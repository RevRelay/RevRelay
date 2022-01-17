import { useEffect, useState } from "react";
import Nav from "./Components/Nav/Nav.js";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Page from "./Components/Page.js";
import { createTheme, ThemeProvider } from "@mui/material";
import { Box, Theme } from "@mui/system";
import UserInfo from "./Components/UserInfo/UserInfo.js";
import ChangePassword from "./Components/UserInfo/ChangePassword.js";
import Login from "./Components/NoAuth/Login.js";
import Search from "./Components/Search/Search.js";
import { default as Registration } from "./Components/NoAuth/Register.js";
import Client from "./Components/Client";
import APIQuery from "./app/api";
import Home from "./Components/HomeSplash/Home.js";
import { Switching } from "./typeDef.js";
import { getCurrentUser, getAllFriends } from './app/api'
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
	const token = useSelector(selectJWT);
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

	/**
	 * Setting the active theme but changing the int of activeTheme. Corresponding to the theme array
	 */
	const [activeTheme, updateActiveTheme] = useState(0);

	return (
		<ThemeProvider theme={themes[activeTheme].theme}>
			{/* Renders Chat Box */}
			{currentUser.userID ? (
				<Client currentUser={currentUser} />
			) : (
				<></>
			)}
			<Nav
				themes={themes}
				activeTheme={activeTheme}
				updateActiveTheme={updateActiveTheme}
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
 * @param {Switching} 				switchProp					---
 * @param {Boolean}					switchProp.isSendSearch		Boolean state managing searching status.
 * @returns
 */
function SwitchBoard(switchProp) {
	const token = useSelector(selectJWT);
	if (!token) {
		return (
			<Routes>
				<Route path="/">
					<Route index element={<Home/>} />
					<Route path="login" element={<Login/>} />
					<Route path="register" element={<Registration />} />
				</Route>
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		);
	}

	return (
		<Routes>
			<Route path="/">
				<Route index element={<Home />} />
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Registration />} />
				<Route path="search">
					{/* TODO splash page for the search page w/o a search term, currently just sends you back to where you came from.*/}
					<Route index element={<Navigate to={-1} />} />
					<Route path=":searchTerm" element={<Search isSendSearch={switchProp.isSendSearch} />} />
				</Route>
				<Route path="user">
					<Route index element={<Navigate to={-1} />} />
					<Route path=":pageParam" element={<Page />} />
					<Route path="profile">
						<Route index element={<Page />} />
						<Route path="userInfo">
							<Route index element={<UserInfo />} />
							<Route path="changePassword" element={<ChangePassword />} />
						</Route>
					</Route>
				</Route>
			</Route>
			<Route path="group">
				<Route index element={<Navigate to={-1} />} />
				<Route path=":pageParam" element={<Page />} />
			</Route>
		</Routes>
	);
}

export default App;
