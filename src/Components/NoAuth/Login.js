import { useState } from "react";
import {
	Button,
	Grid
} from "@mui/material";
import {PasswordField, LoginRegisterField} from "../Library/FormField";
import APIQuery from "../../API/APIQuery";
import {useNavigate} from 'react-router-dom'
import PropTypes from 'prop-types';
import './Auth.css';
import { User, SetStateActionString } from "../../typeDef";

/**
 * The url of the appended login url
 */
const apiLoginUrl = '/public/users/login'

/**
 * Axios query to login a user
 * 
 * @async
 * @param {User} user The user to be logged in
 * @returns The JWT of the user in the form data{jwt{*KEY*}}
 */
async function loginUser(user) {
	return await APIQuery.post(apiLoginUrl,
		JSON.stringify(user))
		.then(data => data.data.jwt)
}

/**
 * Login a user
 * 
 * @param {object} 					param 
 * @param {SetStateActionString} 	param.setToken state variable setter for token field information.
 * @returns Returns the login page with React
 */
export default function Login({ setToken }) {
	/**
	 * @type {[string, SetStateActionString]}
	 */
	const [username, setUsername] = useState('');
	/**
	 * @type {[string, SetStateActionString]}
	 */
	const [password, setPassword] = useState('');
	let navigate = useNavigate();

	/**
	 * Submit button is pressed login request is sent
	 * 
	 * @async
	 * @param {event} e The event of the login button being pressed, username and password are captured
	 */
	const submitButton = async e => {
		e.preventDefault();
		const jwt = await loginUser({
			username,
			password
		});
		setToken(jwt);
		jwt ? navigate("/user/profile") : alert("Unable to log in.");
	}

	/**
	 * The login page returned with React
	 */
	return (
		<Grid className="form" spacing={2} columns={1} container direction="row" justifyContent="center" alignItems="center" align="flex-start">
			<form onSubmit={submitButton}>
				<Grid item xs={1}>
					<h2>Login here</h2>
				</Grid>
				<Grid item xs={1}>
					<LoginRegisterField id="username" label="Username" value={username} setter={setUsername} required={true}/>
				</Grid>
				<br/>
				<Grid item xs={1}>
					<PasswordField id="password" label="Password" password={password} setter={setPassword}/>
				</Grid>
				<Grid item xs={1}>
					<Button color="inherit" type="submit" variant="h5">Login</Button>
				</Grid>
				<Grid item xs={1}>
					<Button color="inherit" onClick={(x) => navigate("/register")}>No account? Click here!</Button>
				</Grid>
			</form>
		</Grid>
	)
	//<LoginSplash /> Used for background for login page
}

Login.propTypes = {
	setToken: PropTypes.func.isRequired
}