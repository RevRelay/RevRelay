import { useState } from "react";
import { OutlinedInput, FormControl, InputLabel, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "./Auth.css";

/**
 * Generic password entry TextField.
 * @param {String} props.id TextField Id.
 * @param {String} props.label TextField label.
 * @param {String} props.password State variable holding the password.
 * @param {Function} props.setter Setter function for the state variable holding the text field value. 
 * @returns 
 */
export default function PasswordField(props) {

	const passwordSetter = props.setter;
	
	const [showPassword, setShowPassword] = useState('');

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	}

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};
	
	return (
		<FormControl variant="outlined" maxRows={1}>
			<InputLabel required="true" htmlFor="outlined-password">{props.label}</InputLabel>
			<OutlinedInput
				id={props.id}
				label={props.label+" *"}
				type={showPassword ? 'text' : 'password'}
				value={props.password}
				onChange={(e) => passwordSetter(e.target.value)}
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
		</FormControl>
	)
}