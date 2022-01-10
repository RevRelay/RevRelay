import { useState } from "react";
import { OutlinedInput, FormControl, InputLabel, InputAdornment, IconButton, withStyles } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { styled } from '@mui/material/styles';
import { PasswordProp } from "../../typeDef";

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
 * @returns 
 */
export function PasswordField(passwordProp) {

	const passwordSetter = passwordProp.setter;
	
	const [showPassword, setShowPassword] = useState('');

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	}

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};
	
	return (
		<FormControlStd variant="outlined">
			<InputLabel required={true} htmlFor="outlined-password">{passwordProp.label}</InputLabel>
			<OutlinedInput
				id={passwordProp.id}
				label={passwordProp.label+" *"}
				type={showPassword ? 'text' : 'password'}
				value={passwordProp.password}
				onChange={(e) => passwordSetter(e.target.value)}
				maxRows={1}
				endAdornment = {
					<InputAdornment position="end">
						<IconButton
							aria-label="toggle password visibility"
							onClick={handleClickShowPassword}
							onMouseDown={handleMouseDownPassword}
							edge="end"
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
 * @param {String} props.id TextField Id.
 * @param {String} props.label TextField label.
 * @param {String} props.value State variable holding the value.
 * @param {Function} props.setter Setter function for the state variable holding the text field value. 
 * @param {boolean} props.required True if required, false otherwise.
 */
export function LoginRegisterField(props) {
	const setter = props.setter;
	return (
		<FormControlStd variant="outlined">
			<InputLabel required={props.required}>{props.label}</InputLabel>
			<OutlinedInput
				id={props.id}
				label={props.label + ((props.required) ? " *" : "")}
				type={'text'}
				value={props.value}
				onChange={(e) => setter(e.target.value)}
				maxRows={1}
			/>
		</FormControlStd>
	)
}