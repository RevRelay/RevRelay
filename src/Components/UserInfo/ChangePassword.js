import React, { useState, useEffect } from "react";
import {
	Button,
	Grid,
	TextField,
	Paper,
} from "@mui/material";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
 import {
	useNavigate, 
} from "react-router-dom";
import APIQuery from "../../API/APIQuery";
import { passwordReset } from "../../API/UserAPI";
import { passLen } from "../NoAuth/RegisterConfig.js"

const apiChangePasswordUrl = "/users/password";
/**
 * Helper function to take 2 passwords as a passwordCheck object and return an alert if they dont match or if they arent valid
 * 
 * @param {Object} PasswordCheck - An object with 2 Strings, Checks if strings are a valid length and then if they are matching
 * @returns returns the negation of message's truthy/falsy value. Also sends an alert if message is truthy
 */
function validPasswordReset(passwordCheck) {
	let message = "";
	console.log(message)
	if (!(passwordCheck.newPassword && passwordCheck.newPassword.length >= passLen)) {
		message += `Minimum password length ${passLen} \n`;
	}
	if(passwordCheck.newPassword !== passwordCheck.confirmPassword){
		message += `Your passwords do not match \n`;
	}
	if (message) {
		alert(message);
	}
	return !message;
}

/**
 * 
 * @param {object} param
 * @param {string} param.JWT token determinig user and log in information.
 */
function ChangePassword({JWT}) {
	const [oldPassword, setOldPassword] = useState();
	const [newPassword, setNewPassword] = useState();
	const [confirmPassword, setConfirmPassword] = useState();
	let navigate = useNavigate();

	/**
	 * Submit button is pressed password reset request is sent to the backend
	 *
	 * @param {Event} e The even of the login button being pressed, username and password are captured
	 */
	const submitButton = async (e) => {
		e.preventDefault();
		if (
			validPasswordReset({
				newPassword,
				confirmPassword,
			})
		) {
			e.preventDefault();
			let response;
			try {
				response = await passwordReset({
					oldPassword,
					newPassword,
					confirmPassword,
				}, JWT);
			} catch (Error) {
				alert(`Error: ${Error?.response?.data}`);
			}
			console.log(response.data);
			if(response.data){
				alert(`Password Successfully changed!`)
				navigate("/user/profile/userinfo");
			}
			else {
				alert(`Unable to change your password`);
			}
		}
	};

	/**
	 * The change password page returned with React
	 */
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
			<form onSubmit={submitButton} className="form">
				<Paper
					elevation={10}
					sx={{
						paddingLeft: 10,
						paddingRight: 10,
						paddingTop: 5,
						paddingBottom: 5,
						borderRadius: 10,
					}}
				>
					<Grid item xs={1}>
						<h2>Login here</h2>
					</Grid>
					<Grid item xs={1}>
						<TextField
							id="oldPassword"
							label="oldPassword"
							type="password"
							required="true"
							variant="outlined"
							maxRows={1}
							onChange={(e) => setOldPassword(e.target.value)}
						/>
					</Grid>
					<br />
					<Grid item xs={1}>
						<TextField
							id="newPassword"
							label="newPassword"
							type="password"
							required="true"
							variant="outlined"
							maxRows={1}
							onChange={(e) => setNewPassword(e.target.value)}
						/>
					</Grid>
					<br />
					<Grid item xs={1}>
						<TextField
							id="confirmPassword"
							label="confirmPassword"
							type="password"
							required="true"
							variant="outlined"
							maxRows={1}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</Grid>
					<Grid item xs={1}>
						<Button color="inherit" type="submit" variant="h5">
							Submit Change
						</Button>
					</Grid>
				</Paper>
			</form>
		</Grid>
	);
}

export default ChangePassword;