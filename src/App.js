import react, { useState } from "react";
import Nav from "./Components/Nav/Nav.js";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import "./Styles/themes.css";
import Color from "./Components/Color.js";
import Page from "./Components/Page.js";
import UserInfo from "./Components/UserInfo.js";
import Login from "./Components/NoAuth/Login.js";
import {default as Registration} from "./Components/NoAuth/Register.js";
import LoginSplash from "./Components/NoAuth/LoginSplash.js";
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

//Comment For Git
function SwitchBoard({token, setToken, activeTheme, updateActiveTheme }) {
	/**
	 * Use the token object to find if a user is logged in or not, it will be null if there is no user present currently
	 * and will hold a JWT if there is currently a user logged in.
	 * 
	 * Use the token object passed above if you need to find any
	 */
	return (
		<Routes>
			<Route path="/">
				<Route index element={<Home />} />
				<Route path="login" element={<Login setToken={setToken} />} />
				<Route path="register" element={<Registration setToken={setToken} />} />
				<Route path="user">
					<Route index element={<Users />} />
					<Route path=":userID" element={<User />} />
					<Route path="profile">
						<Route index element={<Page theme={activeTheme} themes={updateActiveTheme} />} />
						<Route path="userInfo" element={<UserInfo JWT={token} />} />
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
	return <p>HOME</p>;
}
// function Login() {
// 	return <p>Login</p>;
// // }
// function Registration() {
// 	return <p>Registration</p>;
// }

function Users() {
	return <p>Users</p>;
}

function User() {
	return <p>User</p>;
}

function UserProfile() {
	return <p>UserProfile</p>;
}

function Groups() {
	return <p>Groups</p>;
}

function Group() {
	return <p>Group</p>;
}

function GroupProfile() {
	return <p>GroupProfile</p>;
}

function App() {
	const [token, setToken] = useState();
	const [activeTheme, updateActiveTheme] = useState(0);
	return (
		<>
			<Nav themes={themes} activeTheme={activeTheme} updateActiveTheme={updateActiveTheme} token={token} setToken={setToken}/>
			<SwitchBoard token={token} setToken={setToken} activeTheme={activeTheme} updateActiveTheme = {updateActiveTheme}/>
		</>
	);
}

export default App;
