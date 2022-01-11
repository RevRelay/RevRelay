import React, {useState} from "react";
import {
	IconButton,
	TextField,
	Typography,
	Stack,
	Box
} from "@mui/material";
import {useNavigate} from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {
	User,
	UserProp,
	Toggle,
	VarEditInfo,
	EditInfo,
	SetStateActionUser,
	SetStateActionTog, 
	SetStateActionDate
} from "../../typeDef"

/**
 * Function for defining user info elements on UserInfo pretaining to their display name.
 * The edit button allows the user to edit these fields and select if they want to keep that info or not.
 * 
 * @param {EditInfo} 			diplayNameProp 									The Array for Editing user's display name. 
 * @param {User} 				diplayNameProp.mostRecentUserInfo				Array for a state variable holding user field information.
 * @param {String}				displayNameProp.mostRecentUserInfo.displayName	The logged in user's display name.
 * @param {SetStateActionUser} 	diplayNameProp.setUserInput						State variable setter for userInput field information.
 * @param {SetStateActionUser} 	diplayNameProp.setMostRecentUserInfo			State variable setter for mostRecentUserInfo field information.
 * @param {Toggle} 				diplayNameProp.toggleEdit						Array of the state variable for determining if a field is toggled to display 
 * 																				(false) or edit (true). 
 * @param {String}				displayNameProp.toggleEdit.displayName			Is the user's display name being edited?
 * @param {SetStateActionTog} 	diplayNameProp.setToggleEdit					State variable setter for toggelEdit field information.
 * @returns ReactFragment containing UserInfo data about their display name with toggles editing ability formatted for 
 * 			insertion into a grid.
 */
 export function UserInfoEntryElementDisplayName (diplayNameProp) {
	let userInfoFieldValue;
	return(
		<React.Fragment>
			<Stack direction="row" spacing={1}>
				{diplayNameProp.toggleEdit.displayName ? (
					<React.Fragment>
						<Box sx={{width:"95%", textAlign:"right"}}>
							<TextField label={"Display Name"} sx={{width:"100%"}} onChange={(x) => userInfoFieldValue = x.target.value}/>
						</Box>
						<Box sx={{width:"5%"}}>
							<Stack>
								<Box>
									<IconButton size="small" color="primary" variant="contained" onClick={(x) => diplayNameProp.setToggleEdit({...diplayNameProp.toggleEdit, displayName : false})}>
										<CancelIcon  fontSize="inherit"/>
									</IconButton>
								</Box>
								<Box>
									<IconButton size="small" color="primary" variant="contained"
										onClick={(x) => {
											//this if statement is a very weak check for good input value, needs reinforcing - NL
											if (userInfoFieldValue) {
												diplayNameProp.setUserInput({...diplayNameProp.mostRecentUserInfo, displayName : userInfoFieldValue});
												diplayNameProp.setMostRecentUserInfo({...diplayNameProp.mostRecentUserInfo, displayName: userInfoFieldValue});
											}
											diplayNameProp.setToggleEdit({...diplayNameProp.toggleEdit, displayName : false});
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
								{diplayNameProp.mostRecentUserInfo.displayName}
							</Typography>
						</Box>
						<Box sx={{width:"5%"}}>
							<IconButton size="small" color="primary" variant="contained" onClick={(x) => diplayNameProp.setToggleEdit({...diplayNameProp.toggleEdit, displayName : true})}>
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
 * @param {EditInfo} 			emailProp 							The Array for Editing user's email. 
 * @param {User} 				emailProp.mostRecentUserInfo		Array for a state variable holding user field information.
 * @param {String}				emailProp.mostRecentUserInfo.email	The logged in user's email.
 * @param {SetStateActionUser} 	emailProp.setMostRecentUserInfo		State variable setter for mostRecentUserInfo field information.
 * @param {SetStateActionUser} 	emailProp.setUserInput				State variable setter for userInput field information.
 * @param {Toggle} 				emailProp.toggleEdit				Array of the state variable for determining if a field is toggled to display 
 * 																	(false) or edit (true). 
 * @param {String}				emailProp.toggleEdit.email			Is the user's email being edited?
 * @param {SetStateActionTog} 	emailProp.setToggleEdit				State variable setter for toggelEdit field information.
 * @returns ReactFragment containing UserInfo about their email data with toggles editing ability formatted for insertion 
 * 			into a grid.
 */
export function UserInfoEntryElementEmail (emailProp) {
	let userInfoFieldValue;
	return(
		<React.Fragment>
			<Stack direction="row" spacing={1}>
				{emailProp.toggleEdit.email ? (
					<React.Fragment>
						<Box sx={{width:"95%", textAlign:"right"}}>
							<TextField label={"Email"} sx={{width:"100%"}} onChange={(x) => userInfoFieldValue = x.target.value}/>
						</Box>
						<Box sx={{width:"5%"}}>
							<IconButton size="small"  color="primary" variant="contained" onClick={(x) => emailProp.setToggleEdit({...emailProp.toggleEdit, email : false})}>
								<CancelIcon fontSize="inherit"/>
							</IconButton>
							<IconButton size="small" color="primary" variant="contained"
								onClick={(x) => {
									//this if statement is a very weak check for good input value, needs reinforcing - NL
									if (userInfoFieldValue) {
										emailProp.setUserInput({...emailProp.mostRecentUserInfo, email : userInfoFieldValue});
										emailProp.setMostRecentUserInfo({...emailProp.mostRecentUserInfo, email: userInfoFieldValue});
									}
									emailProp.setToggleEdit({...emailProp.toggleEdit, email : false});
								}}>
								<CheckCircleIcon fontSize="inherit"/>
							</IconButton>
						</Box>
					</React.Fragment>
				):(
					<React.Fragment>
						<Box sx={{width:"95%", textAlign:"right"}}>
							<Typography variant="subtitle1" align="right">
								{emailProp.mostRecentUserInfo.email}
							</Typography>
						</Box>
						<Box sx={{width:"5%"}}>
							<IconButton size="small" color="primary" variant="contained" onClick={(x) => emailProp.setToggleEdit({...emailProp.toggleEdit, email : true})}>
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
 * Function for defining user info elements on UserInfo that are listed in the main body of the page 
 * (currently firstName and lastName).
 * The edit button allows the user to edit these fields and select if they want to keep that info or not.
 * 
 * @param {VarEditInfo} 		varElement 
 * @param {string} 				varElement.varname 					The variable name associated with the list element (i.e. username).
 * @param {string} 				varElement.fieldName 				The display name of the list element (i.e. Username).
 * @param {User} 				varElement.mostRecentUserInfo 		Array for a state variable holding user field information.
 * @param {SetStateActionUser} 	varElement.setUserInput 			State variable setter for update field information.
 * @param {SetStateActionUser} 	varElement.setMostRecentUserInfo 	State variable setter for user field information.
 * @param {Toggle} 				varElement.toggleEdit 				Array of a state variable for determining if a field is toggled to display 
 * 																	(false) or edit (true). 
 * @param {SetStateActionTog}	varElement.setToggleEdit			State variable setter for toggleEdit field information. 
 * @returns ReactFragment containing UserInfo data with toggles editing ability formatted for insertion into a grid. 
 */
export default function UserInfoEntryElement (varElement) {
	/**
	 * @type {string}
	 */
	let userInfoFieldValue;
		
	return (
		<React.Fragment>
			<Stack direction="row" spacing={3}>
				<Box sx={{width:"20%"}}>
					<Typography style={{ fontWeight: 600 }}>
						{varElement.fieldName}
					</Typography>
				</Box>
				{varElement.toggleEdit[varElement.varname] ? (
					<React.Fragment>
						<Box sx={{width:"40%"}}>
							<TextField label={varElement.fieldName} sx={{width:"100%"}} onChange={(x) => userInfoFieldValue = x.target.value}/>
						</Box>
						<Box sx={{width:"40%"}}>
							<Stack>
								<Box>
									<IconButton size="small" color="primary" variant="contained" onClick={(x) => varElement.setToggleEdit({...varElement.toggleEdit, [varElement.varname] : false})}>
										<CancelIcon  fontSize="inherit"/>
									</IconButton>
								</Box>
								<Box>
									<IconButton size="small" color="primary" variant="contained"
										onClick={(x) => {
											//this if statement is a very weak check for good input value, needs reinforcing - NL
											if (userInfoFieldValue) {
												varElement.setUserInput({...varElement.mostRecentUserInfo, [varElement.varname] : userInfoFieldValue});
												varElement.setMostRecentUserInfo({...varElement.mostRecentUserInfo, [varElement.varname]: userInfoFieldValue});
											}
											varElement.setToggleEdit({...varElement.toggleEdit, [varElement.varname] : false});
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
								{varElement.mostRecentUserInfo[varElement.varname]}
							</Typography>
						</Box>
						<Box sx={{width:"40%", height:"2em"}}>
							<IconButton size="small" color="primary" variant="contained" onClick={(x) => varElement.setToggleEdit({...varElement.toggleEdit, [varElement.varname] : true})}>
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
	let navigate = useNavigate();

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
					<IconButton size="small" color="primary" variant="contained" onClick={(x) => navigate("/user/profile/userInfo/changePassword")}>
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
 * @param {UserProp}	usernameProp								The Array for an object that just contains a User.
 * @param {User} 		usernameProp.mostRecentUserInfo 			Array for a state variable holding user field information.
 * @param {string} 		usernameProp.mostRecentUserInfo.username	The logged in user's username.
 * @returns ReactFragment containing UserInfo data about their username with toggles editing ability formatted for 
 * 			insertion into a grid.
 */
export function UserInfoElementUsername (usernameProp) {
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
						{usernameProp.mostRecentUserInfo.username}
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
 * @param {EditInfo} 			birthDateProp 
 * @param {User} 				birthDateProp.mostRecentUserInfo			Array for a state variable holding user field information.
 * @param {String}				birthDateProp.mostRecentUserInfo.birthDate	The logged in user's birth date.
 * @param {SetStateActionUser} 	birthDateProp.setUserInput					State variable setter for userInput field information.
 * @param {SetStateActionUser} 	birthDateProp.setMostRecentUserInfo			State variable setter for mostRecentUserInfo field information.
 * @param {Toggle} 				birthDateProp.toggleEdit 					Array for a state variable for determining if a field is toggled to display(false) or edit (true). 
 * @param {String}				birthDateProp.toggle.birthDate				Is the user's birth date being edited?
 * @param {SetStateActionTog} 	birthDateProp.setToggleEdit					State variable setter for toggleEdit field information. 
 * @returns ReactFragment containing UserInfo data about their birth date with toggles editing ability formatted for 
 * 			insertion into a grid.
 */
export function UserInfoEntryElementBirthDate (birthDateProp) {
	/**
	 * @type {[Date, SetStateActionDate]}
	 */
	const [userInfoFieldValue, setUserInfoFieldValue] = useState('');

	return(
		<React.Fragment>
			<Stack direction="row" spacing={3}>
				<Box sx={{width:"20%"}}>
					<Typography style={{ fontWeight: 600 }}>
						Birth Date
					</Typography>
				</Box>
				{birthDateProp.toggleEdit.birthDate ? (
					<React.Fragment>
						<Box sx={{width:"40%"}}>
							<LocalizationProvider dateAdapter={AdapterDateFns}>
								<DesktopDatePicker
									sx={{width:"100%"}}
									label="Birth Date"
									value={(userInfoFieldValue) ? userInfoFieldValue : birthDateProp.mostRecentUserInfo.birthDate}
									views={['year', 'month', 'day']}
									onChange={(newValue) => {
										setUserInfoFieldValue(newValue);
									}}
									renderInput={(params) => <TextField {...params} />}
								/>
							</LocalizationProvider>
						</Box>
						<Box sx={{width:"40%"}}>
							<Box>
								<IconButton size="small" color="primary" variant="contained" onClick={(x) => birthDateProp.setToggleEdit({...birthDateProp.toggleEdit, birthDate : false})}>
									<CancelIcon  fontSize="inherit"/>
								</IconButton>
							</Box>
							<Box>
								<IconButton size="small" color="primary" variant="contained"
									onClick={(x) => {
										if (userInfoFieldValue) {
											birthDateProp.setUserInput({...birthDateProp.mostRecentUserInfo, birthDate : userInfoFieldValue});
											birthDateProp.setMostRecentUserInfo({...birthDateProp.mostRecentUserInfo, birthDate : userInfoFieldValue});
										}
										birthDateProp.setToggleEdit({...birthDateProp.toggleEdit, birthDate : false});
									}}>
									<CheckCircleIcon  fontSize="inherit"/>
								</IconButton>
							</Box>
						</Box>
					</React.Fragment>
				) : (
					<React.Fragment>
						<Box sx={{width:"40%"}}>
							<Typography>
								{ (birthDateProp.mostRecentUserInfo.birthDate) ? (birthDateProp.mostRecentUserInfo.birthDate.toDateString()) : ("")}
							</Typography>
						</Box>
						<Box sx={{width:"40%", height:"2em"}}>
							<IconButton size="small" color="primary" onClick={(x) => birthDateProp.setToggleEdit({...birthDateProp.toggleEdit, birthDate : true})}>
								<EditIcon  fontSize="inherit"/>
							</IconButton>
						</Box>
					</React.Fragment> 
				)}
			</Stack>
		</React.Fragment>
	)
}
