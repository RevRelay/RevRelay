import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import APIQuery from "../../API/APIQuery";
import { Button, Grid, TextField, Paper } from "@mui/material";
import { userLen, passLen, displayNameLen } from "./RegisterConfig";
import "./Auth.css";

/**
 * The url of the appended register url
 */
const apiRegisterUrl = "/public/users/register";

/**
 * Axios query to create a user
 *
 * @param {*} user The user to be created
 * @returns The JWT of the created user in the form data{jwt{*KEY*}}
 */
async function registerUser(user) {
	return await APIQuery.post(apiRegisterUrl, JSON.stringify(user)).then(
		(data) => data
	);
}

/**
 * Takes a user and checks if the user is valid, then returns negation of truthy or falsy of the message
 *
 * @param {} user The object to check for validity
 * @returns returns negation of truthy or falsy of the image
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
		message += "A valid email is required";
	}
	if (!(user.displayName && user.displayName.length >= displayNameLen)) {
		message += `Minimum display name length ${displayNameLen} \n`;
	}
	if (message) {
		alert(message);
	}
	return !message;
}

/**
 * Registering a user
 *
 * @param {*} param0 The token to return the JWT to the parent function
 * @returns returns the React webpage for registering
 */
export default function Register({ setToken, token }) {
	/**
	 * React useState to watch for userName and password
	 */
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();
	const [email, setEmail] = useState();
	const [displayName, setDisplayName] = useState();
	let navigate = useNavigate();

	//Submission of the user's information and returning of a jwt
	const submitButton = async (e) => {
		e.preventDefault();
		if (
			validInputRegister({
				username,
				password,
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
				setToken(response.data.jwt);
				navigate("/user/profile");
			} catch (Error) {
				alert(`Error: ${Error?.response?.data}`);
			}
		}
	};

	const registerSize = 19;

	/**
	 * The register page returned with react
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
                        <TextField
                            id="username"
                            label="Username"
							required="true"
                            variant="outlined"
                            maxRows={1}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Grid>
                    <br />
                    <Grid item xs={1}>
                        <TextField
                            id="password"
                            label="Password"
							type="password"
							required="true"
                            variant="outlined"
                            maxRows={1}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Grid>
                    <br />
                    <Grid item xs={1}>
                        <TextField
                            id="email"
                            label="Email"
							required="true"
                            variant="outlined"
                            maxRows={1}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Grid>
                    <br />
                    <Grid item xs={1}>
                        <TextField
                            id="displayName"
                            label="Display Name"
							required="true"
                            variant="outlined"
                            maxRows={1}
                            onChange={(e) => setDisplayName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <Button color="inherit" type="submit">
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
//<LoginSplash /> Used for background for register page

Register.propTypes = {
	setToken: PropTypes.func.isRequired,
};
