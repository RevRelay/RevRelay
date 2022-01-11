import { useState } from "react";
import { OutlinedInput, FormControl, InputLabel, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { styled } from '@mui/material/styles';
import { PasswordProp, LoginProp } from "../../typeDef";

const FormControlStd = styled(FormControl)({
	width: "26ch"
});

/**
 * Generic password entry TextField.
 * 
 * @param {PasswordProp}	passwordProp			Password Prop to show or not show the password in forms.
 * @param {String} 			passwordProp.id 		TextField Id.
 * @param {String} 			passwordProp.label 		TextField label.
 * @param {String} 			passwordProp.password 	State variable holding the password.
 * @param {Function} 		passwordProp.setter 	Setter function for the state variable holding the text field value. 
 * @returns ---
 */
export function PasswordField(passwordProp) {

	const passwordSetter = passwordProp.setter;
	
	const [showPassword, setShowPassword] = useState('');

	/**
	 * ---
	 */
	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	}

	/**
	 * ---
	 * @param {Event} event ---
	 */
	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};
	
	return (
		<FormControlStd variant="outlined">
			<InputLabel required={true} htmlFor="outlined-password">{passwordProp.label}</InputLabel>
			<OutlinedInput
				id = {passwordProp.id}
				label = {passwordProp.label+" *"}
				type = {showPassword ? 'text' : 'password'}
				value = {passwordProp.password}
				onChange = {(e) => passwordSetter(e.target.value)}
				maxRows = {1}
				endAdornment = {
					<InputAdornment position="end">
						<IconButton
							aria-label = "toggle password visibility"
							onClick = {handleClickShowPassword}
							onMouseDown = {handleMouseDownPassword}
							edge = "end"
						>
							{showPassword ? <VisibilityOff /> : <Visibility />}
						</IconButton>
					</InputAdornment>}
			/>
		</FormControlStd>
	)
}

/**
 * Generic TextField for Login, Register, etc. 
 * Formatting text box so that the password text box isn't a different length.
 * @param {LoginProp}	loginProp			An Array for Login Prop for Login so that the length of the hidden/unhidden password 
 * 											isn't a different lenght.
 * @param {String} 		loginProp.id 		TextField Id.
 * @param {String} 		loginProp.label 	TextField label.
 * @param {String} 		loginProp.value 	State variable holding the value.
 * @param {Function}	loginProp.setter 	Setter function for the state variable holding the text field value. 
 * @param {boolean} 	loginProp.required 	True if required, false otherwise.
 * @returns 
 */
export function LoginRegisterField(loginProp) {
	const setter = loginProp.setter;
	return (
		<FormControlStd variant="outlined">
			<InputLabel required={loginProp.required}>{loginProp.label}</InputLabel>
			<OutlinedInput
				id = {loginProp.id}
				label = {loginProp.label + ((loginProp.required) ? " *" : "")}
				type = {'text'}
				value = {loginProp.value}
				onChange = {(e) => setter(e.target.value)}
				maxRows = {1}
			/>
		</FormControlStd>
	)
}