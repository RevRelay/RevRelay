import { useState } from "react";
import {
	Button,
	Grid,
	TextField
} from "@mui/material";
import APIQuery from "../../API/APIQuery";
import {useNavigate} from 'react-router-dom'
import { LoginSharp } from "@mui/icons-material";
import PropTypes from 'prop-types';
import './Auth.css';

/**
 * The url of the appended login url
 */
const apiLoginUrl = '/public/users/login'

/**
 * Axios query to login a user
 * 
 * @async
 * @param {USER} user The user to be logged in
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
 * @param {object} 		param 
 * @param {Function} 	param.setToken state variable setter for token field information.
 * @returns Returns the login page with React
 */
export default function Login({ setToken }) {
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();
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
					<TextField id="username" label="Username" variant="outlined" maxRows={1} onChange={e => setUsername(e.target.value)}/>
				</Grid>
				<br/>
				<Grid item xs={1}>
					<TextField id="password" label="Password" variant="outlined" maxRows={1} onChange={e => setPassword(e.target.value)}/>
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