import react, { useState } from "react";
import Nav from "./Components/Nav.js";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import "./Styles/themes.css";
import Color from "./Components/Color.js";
import Page from "./Components/Page.js";
import UserInfo from "./Components/UserInfo.js";
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
function SwitchBoard({ theme }) {
	return (
		<Routes>
			<Route path="/">
				<Route index element={<Home />} />
				<Route path="register" element={<Registration />} />
				<Route path="login" element={<Login />} />
				<Route path="user">
					<Route index element={<Users />} />
					<Route path=":userID" element={<User />} />
					<Route path="profile">
						<Route index element={<Page theme={theme} themes={themes} />} />
						<Route path="userInfo" element={<UserInfo />} />
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
function Login() {
	return <p>Login</p>;
}
function Registration() {
	return <p>Registration</p>;
}

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
	const [theme, updateTheme] = useState(0);
	return (
		<>
			<Nav themes={themes} theme={theme} updateTheme={updateTheme} />
			<SwitchBoard theme={theme} />
		</>
	);
}

export default App;
