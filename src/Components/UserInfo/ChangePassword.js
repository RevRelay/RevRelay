import React, { useState } from "react";
import {
	Button,
	Grid,
	Paper,
} from "@mui/material";
import { PasswordField } from "../Library/FormField";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "../../API/UserAPI";
import { passLen } from "../NoAuth/RegisterConfig.js"
import {
	JWTs,
	PasswordCheck,
	SetStateActionString 
} from "../../typeDef"

const apiChangePasswordUrl = "/users/password";

/**
 * Helper function to take 2 passwords as a passwordCheck object and checks if strings are a valid length and then if 
 * they are matching. Returns an alert if they dont match or if they arent valid.
 * 
 * @param {PasswordCheck} 	passwordCheck 				An object with 2 Strings.
 * @param {string} 			passwordCheck.newPassword 	The new password
 * @param {string} 			passwordCheck.checkPassword	New password repeated. Needs to be the same at the new password.
 * @returns returns the negation of message's truthy/falsy value. Also sends an alert if message is truthy.
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
 * Allows the user to change their password.
 * 
 * @param {JWTs} 	passwordChange 			Prop that just contains the JWT.
 * @param {string} 	passwordChange.token 	JWT Token determinig user and log in information.
 * @returns The change password page returned with React
 */
function ChangePassword(passwordChange) {
	/**
	 * @type {[string, SetStateActionString]}
	 */
	const [oldPassword, setOldPassword] = useState('');
	/**
	 * @type {[string, SetStateActionString]}
	 */
	const [newPassword, setNewPassword] = useState('');
	/**
	 * @type {[string, SetStateActionString]}
	 */
	const [confirmPassword, setConfirmPassword] = useState('');
	let navigate = useNavigate();

	/**
	 * Submit button is pressed password reset request is sent to the backend.
	 *
	 * @param {Event} e The event of the login button being pressed. Username and password are captured.
	 * @async
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
				response = await updatePassword({
					oldPassword,
					newPassword,
					confirmPassword,
				}, passwordChange.token);
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
						<PasswordField
							id="oldPassword"
							label="Old Password"
							password={oldPassword}
							setter={setOldPassword}
						/>
					</Grid>
					<br />
					<Grid item xs={1}>
						<PasswordField
							id="newPassword"
							label="New Password"
							password={newPassword}
							setter={setNewPassword}
						/>
					</Grid>
					<br />
					<Grid item xs={1}>
						<PasswordField
							id="confirmPassword"
							label="Confirm New Password"
							password={confirmPassword}
							setter={setConfirmPassword}
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