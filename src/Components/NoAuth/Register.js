import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import APIQuery, { registerUser } from "../../app/api";
import { Button, Grid, Paper } from "@mui/material";
import { userLen, passLen, displayNameLen } from "./RegisterConfig";
import "./Auth.css";
import {
	SetJWTs,
	RegisterUser,
	SetStateActionString
} from "../../typeDef";
import { PasswordField, LoginRegisterField } from "../Library/FormField";
import { useSelector, useDispatch } from "react-redux"
import { setToken } from '../../app/userSlice';

/**
 * Takes a user and checks if the user is valid, then returns negation of truthy or falsy of the message.
 *
 * @param {RegisterUser} 	user 				The Array for a User when registering. Does not include userID, names, or birth date.
 * @param {String} 			user.username		The registering user's username.
 * @param {String}			user.password		The registering user's password.
 * @param {String} 			user.email			The registering user's email.
 * @param {String}			user.displayName	The registering user's display name.
 * @returns returns negation of truthy or falsy of the image.
 */
function validInputRegister(user) {
	let message = "";
	if (!(user.username && user.username.length >= userLen)) {
		message += `Minimum username length ${userLen} \n`;
	}
	if (!(user.password && user.password.length >= passLen)) {
		message += `Minimum password length ${passLen} \n`;
	}
	if (!user.email) {
		message += `A valid email is required \n`;
	}
	if (!(user.displayName && user.displayName.length >= displayNameLen)) {
		message += `Minimum display name length ${displayNameLen} \n`;
	}
	if (user.password !== user.confirmPassword) {
		message += `Your passwords do not match \n`;
	}
	if (message) {
		alert(message);
	}
	return !message;
}

/**
 * Registering a user
 *
 * @returns returns the React webpage for registering a user.
 */
export default function Register(registerProp) {

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [email, setEmail] = useState('');
	const [displayName, setDisplayName] = useState('');
	const dispatch = useDispatch();	
	let navigate = useNavigate();

	/**
	 * Submission of the user's information and returning of a JWT.
	 * 
	 * @async
	 * @param {Event} e ---
	 */
	const submitButton = async (e) => {
		e.preventDefault();
		if (
			validInputRegister({
				username,
				password,
				confirmPassword,
				email,
				displayName,
			})
		) {
			e.preventDefault();
			let response;
			try {
				response = await registerUser({
					username,
					password,
					email,
					displayName,
				});
				dispatch(setToken(response.data));
				navigate("/user/profile");
			} catch (Error) {
				alert(`Error: ${Error?.response?.data}`);
			}
		}
	};

	const registerSize = 19;

	return (
		<Grid
			className="form"
			spacing={2}
			columns={1}
			container
			direction="row"
			justifyContent="center"
			alignItems="center"
			align="flex-start"

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
						<h2>Welcome to the Future of Social Media</h2>
					</Grid>
					<Grid item xs={1}>
						<LoginRegisterField
							id="username"
							label="Username"
							value={username}
							setter={setUsername}
							required={true}
						/>
					</Grid>
					<br />
					<Grid item xs={1}>
						<PasswordField
							id="password"
							label="Password"
							password={password}
							setter={setPassword}
						/>
					</Grid>
					<br />
					<Grid item xs={1}>
						<PasswordField
							id="passwordConfirm"
							label="Confirm Password"
							password={confirmPassword}
							setter={setConfirmPassword}
						/>
					</Grid>
					<br />
					<Grid item xs={1}>
						<LoginRegisterField
							id="email"
							label="Email"
							value={email}
							setter={setEmail}
							required={true}
						/>
					</Grid>
					<br />
					<Grid item xs={1}>
						<LoginRegisterField
							id="displayName"
							label="Display Name"
							value={displayName}
							setter={setDisplayName}
							required={true}
						/>
					</Grid>
					<Grid item xs={1}>
						<br />
						<Button variant="contained" sx={{ bgcolor: "primary" }} type="submit">
							Submit
						</Button>
					</Grid>
					<Grid item xs={1}>
						<Button color="inherit" onClick={(x) => navigate("/login")}>
							Already have an account? Click here.
						</Button>
					</Grid>
				</form>
			</Paper>
		</Grid>
	);
}

Register.propTypes = {
};
