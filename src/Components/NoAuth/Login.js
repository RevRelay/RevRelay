import { useState } from "react";
//import { Navigate } from "react-router-dom";
import { Button, Grid, Paper } from "@mui/material";
import {PasswordField, LoginRegisterField} from "../Library/FormField";
import APIQuery from "../../app/api";
import {useNavigate} from 'react-router-dom'
import PropTypes from 'prop-types';
import './Auth.css';
import { 
	SetJWTs,
	LoginUser,
	SetStateActionString 
} from "../../typeDef";
import { selectToken, login, getCurrentUserInfo } from '../../app/userSlice'
import { useSelector, useDispatch } from "react-redux"

/**
 * Login a user
 * 
 * @returns Returns the login page with React
 */
export default function Login() {

	const token = useSelector(selectToken);

	const dispatch = useDispatch();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	let navigate = useNavigate();

	/**
	 * Submit button is pressed login request is sent.
	 * 
	 * @async
	 * @param {Event} e The event of the login button being pressed, username and password are captured.
	 */
	//
	const submitButton = async e => {
		e.preventDefault();
		dispatch(login({username,password})).then(() => dispatch(getCurrentUserInfo()));
	}
	return (
		<>
	{(token) ? (<>{navigate("/user/profile")}</>
		) : (
			<Grid 
				className = "form"
				spacing = {2}
				columns = {1}
				container
				direction = "row"
				justifyContent = "center"
				alignItems = "center"
				align = "flex-start"
			>
				<Paper
					elevation={10}
					sx={{
						paddingLeft: 7,
						paddingRight: 7,
						paddingTop: 5,
						paddingBottom: 5,
						borderRadius: 10,
					}}
				>
					<form onSubmit={submitButton}>
						<Grid item xs={1}>
							<h2>Login here</h2>
						</Grid>
						<Grid item xs={1}>
							<LoginRegisterField 
								id = "username"
								label = "Username"
								value = {username} 
								setter = {setUsername}
								required = {true}
							/>
						</Grid>
						<br/>
						<Grid item xs={1}>
							<PasswordField
								id = "password"
								label = "Password"
								password = {password}
								setter = {setPassword}
							/>
						</Grid>
						<Grid item xs={1}>
							<br/>
							<Button variant="contained" sx={{bgcolor:"primary"}} type="submit">Login</Button>
						</Grid>
						<Grid item xs={1}>
							<Button color="inherit" onClick={(x) => navigate("/register")}>No account? Click here!</Button>
						</Grid>
					</form>
				</Paper>
			</Grid>
			)
			}
			</>)
}

Login.propTypes = {
}