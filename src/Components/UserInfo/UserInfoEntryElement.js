import React, {  } from "react";
import {
	Grid,
	IconButton,
	TextField,
	Typography,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

/**
 * Function for defining user info elements on UserInfo that are listed in the main body of the page (currently username, password, firstName, lastName, and birthDate).
 * @param {Object} props
 * @param {string} props.varname - the variable name associated with the list element (i.e. username).
 * @param {string} props.fieldName - the display name of the list element (i.e. Username).
 * @param {Object} props.userInput - state variable holding user field information.
 * @param {Function} props.setUserInput - state variable setter for user field information.
 * @param {Object} props.toggleEdit - state variable for determining if a field is toggled to display (false) or edit (true). 
 * @param {Function} props.setToggleEdit - state variable setter for field toggle state. 
 * @returns ReactFragment containing UserInfo data with toggles (and eventually editing ability) formatted for insertion into a grid. 
 */
export default function UserInfoEntryElement ({varname, fieldName, userInput, setUserInput, toggleEdit, setToggleEdit}) {
    let userInfoFieldValue;
		
	return (
		<React.Fragment>
			<Grid item xs={3}>
				<Typography style={{ fontWeight: 600 }}>
					{fieldName}
				</Typography>
			</Grid>
			{toggleEdit[varname] ? (
				<React.Fragment>
					<Grid item xs={2}>
						<TextField label={fieldName} onChange={(x) => userInfoFieldValue = x.target.value}/>
					</Grid>
					<Grid item xs={1}>
						<IconButton size="small">
							<CancelIcon  fontSize="inherit" onClick={(x) => setToggleEdit({...toggleEdit, [varname] : false})}/>
						</IconButton>
						<IconButton size="small">
							<CheckCircleIcon  fontSize="inherit" 
								onClick={(x) => {
									//this if statement is a very weak check for good input value, needs reinforcing - NL
									if (userInfoFieldValue) {
										setUserInput({...userInput, [varname] : userInfoFieldValue});
									}
									setToggleEdit({...toggleEdit, [varname] : false});
									}}
							/>
						</IconButton>
					</Grid>
					<Grid item xs={6}/>
				</React.Fragment>
				) : (
				<React.Fragment>
					<Grid item xs={2}>
						<Typography>
						{(varname === 'password') ? '\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022' : userInput[varname]}
						</Typography>
					</Grid>
					<Grid item xs={7}>
						<IconButton size="small">
							<EditIcon  fontSize="inherit" onClick={(x) => setToggleEdit({...toggleEdit, [varname] : true})}/>
						</IconButton>
					</Grid>
				</React.Fragment> 
					)
			}
		</React.Fragment>
	)
};