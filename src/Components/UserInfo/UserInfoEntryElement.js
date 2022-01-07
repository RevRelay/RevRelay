import React from "react";
import {
	IconButton,
	TextField,
	Typography,
	Stack,
	Box
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

/**
 * Function for defining user info elements on UserInfo that are listed in the main body of the page 
 * (currently firstName and lastName).
 * The edit button allows the user to edit these fields and select if they want to keep that info or not.
 * 
 * @param {object} 		element 
 * @param {string} 		element.varname 				the variable name associated with the list element (i.e. username).
 * @param {string} 		element.fieldName 				the display name of the list element (i.e. Username).
 * @param {object} 		element.mostRecentUserInfo 		state variable holding user field information.
 * @param {function} 	element.setUserInput 			state variable setter for userInput field information.
 * @param {object} 		element.toggleEdit 				state variable for determining if a field is toggled to display (false) 
 * 														or edit (true). 
 * @param {function} 	element.setToggleEdit 			state variable setter for toggleEdit field information. 
 * @param {function} 	element.setMostRecentUserInfo 	state variable setter for mostRecentUserInfo field information.
 * @returns ReactFragment containing UserInfo data with toggles editing ability formatted for insertion into a grid. 
 */
export default function UserInfoEntryElement ({varname, fieldName, mostRecentUserInfo, setUserInput, toggleEdit, setToggleEdit, setMostRecentUserInfo}) {
	let userInfoFieldValue;
		
	return (
		<React.Fragment>
			<Stack direction="row" spacing={3}>
				<Box sx={{width:"20%"}}>
					<Typography style={{ fontWeight: 600 }}>
						{fieldName}
					</Typography>
				</Box>
				{toggleEdit[varname] ? (
					<React.Fragment>
						<Box sx={{width:"40%"}}>
							<TextField label={fieldName} sx={{width:"100%"}} onChange={(x) => userInfoFieldValue = x.target.value}/>
						</Box>
						<Box sx={{width:"40%"}}>
							<Stack>
								<Box>
									<IconButton size="small" color="primary" variant="contained" onClick={(x) => setToggleEdit({...toggleEdit, [varname] : false})}>
										<CancelIcon  fontSize="inherit"/>
									</IconButton>
								</Box>
								<Box>
									<IconButton size="small" color="primary" variant="contained"
										onClick={(x) => {
											//this if statement is a very weak check for good input value, needs reinforcing - NL
											if (userInfoFieldValue) {
												setUserInput({...mostRecentUserInfo, [varname] : userInfoFieldValue});
												setMostRecentUserInfo({...mostRecentUserInfo, [varname]: userInfoFieldValue});
											}
											setToggleEdit({...toggleEdit, [varname] : false});
										}}>
										<CheckCircleIcon  fontSize="inherit"/>
									</IconButton>
								</Box>
							</Stack>
						</Box>
					</React.Fragment>
				) : (
					<React.Fragment>
						<Box sx={{width:"40%"}}>
							<Typography>
								{mostRecentUserInfo[varname]}
							</Typography>
						</Box>
						<Box sx={{width:"40%", height:"2em"}}>
							<IconButton size="small" color="primary" variant="contained" onClick={(x) => setToggleEdit({...toggleEdit, [varname] : true})}>
								<EditIcon  fontSize="inherit"/>
							</IconButton>
						</Box>
					</React.Fragment> 
				)}
			</Stack>
		</React.Fragment>
	)
};

/**
 * Function for defining user info elements on UserInfo about their password.
 * The edit button redirects the user to the Change Password page.
 * 
 * @returns ReactFragment containing the user's "password" with redirection to change password page
 */
export function UserInfoEntryElementPassword () {
    let bulletString = '\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022';

	return (
		<React.Fragment>
			<Stack direction="row" spacing={3}>
				<Box sx={{width:"20%"}}>
					<Typography style={{ fontWeight: 600 }}>
						Password
					</Typography>
				</Box>
				<Box sx={{width:"40%"}}>
					<Typography>
						{bulletString}
					</Typography>
				</Box>
				<Box sx={{width:"40%", height:"2em"}}>
					<IconButton size="small" color="primary" variant="contained" onClick={(x) => navigate("/password/")}>
						<EditIcon  fontSize="inherit"/>
					</IconButton>
				</Box>
			</Stack>
		</React.Fragment>
	)
};

/**
 * Function for defining user info elements on UserInfo pretaining to their username. This is not editable.
 * 
 * @param {object} 	element 
 * @param {USER} 	element.mostRecentUserInfo state variable holding user field information.
 * @returns ReactFragment containing UserInfo data about their username with toggles editing ability formatted for 
 * 			insertion into a grid.
 */
export function UserInfoElementUsername ({mostRecentUserInfo}) {
	return(
		<React.Fragment>
			<Stack direction="row" spacing={3}>
				<Box sx={{width:"20%"}} >
					<Typography style={{ fontWeight: 600 }}>
						Username
					</Typography>
				</Box>
				<Box sx={{width:"40%"}}>
					<Typography>
						{mostRecentUserInfo.username}
					</Typography>
				</Box>
				<Box sx={{width:"40%", height:"2em"}}/>
			</Stack>
		</React.Fragment>
	)
}

/**
 * Function for defining user info elements on UserInfo pretaining to their birth date
 * The calendar button allows the user to select a date from a calendar.
 * 
 * @param {object} 		element 
 * @param {USER} 		element.mostRecentUserInfo		state variable holding user field information.
 * @param {function} 	element.setUserInput			state variable setter for UserInfo field information.
 * @param {function} 	element.setMostRecentUserInfo	state variable setter for mostRecentUserInfo field information.
 * @returns ReactFragment containing UserInfo data about their birth date with toggles editing ability formatted for 
 * 			insertion into a grid.
 */
export function UserInfoEntryElementBirthDate ({mostRecentUserInfo, setUserInput, setMostRecentUserInfo}) {
	{/*const [value, setValue] = useState(userInput.birthDate);*/}

	return(
		<React.Fragment>
			<Stack direction="row" spacing={3}>
				<Box sx={{width:"20%"}}>
					<Typography style={{ fontWeight: 600 }}>
						Birth Date
					</Typography>
				</Box>
				<Box sx={{width:"40%", textAlign:"left"}}>
					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<DesktopDatePicker
							label="Birth Date"
							value={mostRecentUserInfo.birthDate}
							views={['year', 'month', 'day']}
							onChange={(newValue) => {
								setUserInput({...mostRecentUserInfo, birthDate : newValue})
								setMostRecentUserInfo({...mostRecentUserInfo, birthDate: newValue})
							}}
							renderInput={(params) => <TextField {...params} />}
						/>
					</LocalizationProvider>
				</Box>
			</Stack>
		</React.Fragment>
	)
}

/**
 * Function for defining user info elements on UserInfo pretaining to their display name.
 * The edit button allows the user to edit these fields and select if they want to keep that info or not.
 * 
 * @param {object} 		element 
 * @param {USER} 		element.mostRecentUserInfo		state variable holding user field information.
 * @param {Function} 	element.setUserInput			state variable setter for userInfo field information.
 * @param {TOGGLE} 		element.toggleEdit				state variable for determining if a field is toggled to display (false) 
 * 														or edit (true). 
 * @param {Funtion} 	element.setToggleEdit			state variable setter for toggelEdit field information.
 * @param {Funtion} 	element.setMostRecentUserInfo	state variable setter for mostRecentUserInfo field information.
 * @returns ReactFragment containing UserInfo data about their display name with toggles editing ability formatted for 
 * 			insertion into a grid.
 */
export function UserInfoEntryElementDisplayName ({mostRecentUserInfo, setUserInput, toggleEdit, setToggleEdit,  setMostRecentUserInfo}) {
	let userInfoFieldValue;
	return(
		<React.Fragment>
			<Stack direction="row" spacing={1}>
				{toggleEdit.displayName ? (
					<React.Fragment>
						<Box sx={{width:"95%", textAlign:"right"}}>
							<TextField label={"Display Name"} sx={{width:"100%"}} onChange={(x) => userInfoFieldValue = x.target.value}/>
						</Box>
						<Box sx={{width:"5%"}}>
							<Stack>
								<Box>
									<IconButton size="small" color="primary" variant="contained" onClick={(x) => setToggleEdit({...toggleEdit, displayName : false})}>
										<CancelIcon  fontSize="inherit"/>
									</IconButton>
								</Box>
								<Box>
									<IconButton size="small" color="primary" variant="contained"
										onClick={(x) => {
											//this if statement is a very weak check for good input value, needs reinforcing - NL
											if (userInfoFieldValue) {
												setUserInput({...mostRecentUserInfo, displayName : userInfoFieldValue});
												setMostRecentUserInfo({...mostRecentUserInfo, displayName: userInfoFieldValue});
											}
											setToggleEdit({...toggleEdit, displayName : false});
										}}>
										<CheckCircleIcon fontSize="inherit"/>
									</IconButton>
								</Box>
							</Stack>
						</Box>
					</React.Fragment>
				):(
					<React.Fragment>
						<Box sx={{width:"95%", textAlign:"right"}}>
							<Typography variant="h5" sx={{textAlign:"right"}}>
								{mostRecentUserInfo.displayName}
							</Typography>
						</Box>
						<Box sx={{width:"5%"}}>
							<IconButton size="small" color="primary" variant="contained" onClick={(x) => setToggleEdit({...toggleEdit, displayName : true})}>
								<EditIcon fontSize="inherit"/>
							</IconButton>
						</Box>
					</React.Fragment>
				)}
			</Stack>
		</React.Fragment>
	)
}

/**
 * Function for defining user info elements on UserInfo pretaining to their email
 * The edit button allows the user to edit these fields and select if they want to keep that info or not.
 * 
 * @param {object} 		element 
 * @param {USER} 		element.mostRecentUserInfo		state variable holding user field information.
 * @param {Function} 	element.setUserInput			state variable setter for userInput field information.
 * @param {TOGGLE} 		element.toggleEdit				state variable for determining if a field is toggled to display (false) 
 * 														or edit (true). 
 * @param {Funtion} 	element.setToggleEdit			state variable setter for toggleEdit field information.
 * @param {Funtion} 	element.setMostRecentUserInfo	state variable setter for mostRecentUserInfo field information.
 * @returns ReactFragment containing UserInfo about their email data with toggles editing ability formatted for insertion 
 * 			into a grid.
 */
export function UserInfoEntryElementEmail ({mostRecentUserInfo, setUserInput, toggleEdit, setToggleEdit,  setMostRecentUserInfo}) {
	let userInfoFieldValue;
	return(
		<React.Fragment>
			<Stack direction="row" spacing={1}>
				{toggleEdit.email ? (
					<React.Fragment>
						<Box sx={{width:"95%", textAlign:"right"}}>
							<TextField label={"Email"} sx={{width:"100%"}} onChange={(x) => userInfoFieldValue = x.target.value}/>
						</Box>
						<Box sx={{width:"5%"}}>
							<IconButton size="small"  color="primary" variant="contained" onClick={(x) => setToggleEdit({...toggleEdit, email : false})}>
								<CancelIcon fontSize="inherit"/>
							</IconButton>
							<IconButton size="small" color="primary" variant="contained"
								onClick={(x) => {
									//this if statement is a very weak check for good input value, needs reinforcing - NL
									if (userInfoFieldValue) {
										setUserInput({...mostRecentUserInfo, email : userInfoFieldValue});
										setMostRecentUserInfo({...mostRecentUserInfo, email: userInfoFieldValue});
									}
									setToggleEdit({...toggleEdit, email : false});
								}}>
								<CheckCircleIcon fontSize="inherit"/>
							</IconButton>
						</Box>
					</React.Fragment>
				):(
					<React.Fragment>
						<Box sx={{width:"95%", textAlign:"right"}}>
							<Typography variant="subtitle1" align="right">
								{mostRecentUserInfo.email}
							</Typography>
						</Box>
						<Box sx={{width:"5%"}}>
							<IconButton size="small" color="primary" variant="contained" onClick={(x) => setToggleEdit({...toggleEdit, email : true})}>
								<EditIcon fontSize="inherit"/>
							</IconButton>
						</Box>
					</React.Fragment>
				)}
			</Stack>
		</React.Fragment>
	)
}