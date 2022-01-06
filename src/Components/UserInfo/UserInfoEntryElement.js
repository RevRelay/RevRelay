import React, { useState } from "react";
import {
	IconButton,
	TextField,
	Typography,
	Stack,
	Box
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

/**
 * Function for defining user info elements on UserInfo that are listed in the main body of the page (currently username, password, firstName, lastName, and birthDate).
 * @param {Object} props
 * @param {string} props.varname - the variable name associated with the list element (i.e. username).
 * @param {string} props.fieldName - the display name of the list element (i.e. Username).
 * @param {Object} props.mostRecentUserInput - state variable holding user field information.
 * @param {Function} props.setUserInput - state variable setter for user field information.
 * @param {Object} props.toggleEdit - state variable for determining if a field is toggled to display (false) or edit (true). 
 * @param {Function} props.setToggleEdit - state variable setter for field toggle state. 
 * @returns ReactFragment containing UserInfo data with toggles (and eventually editing ability) formatted for insertion into a grid. 
 */
export default function UserInfoEntryElement ({varname, fieldName, mostRecentUserInput, setUserInput, toggleEdit, setToggleEdit,  setMostRecentUserInfo}) {
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
												setUserInput({...mostRecentUserInput, [varname] : userInfoFieldValue});
												setMostRecentUserInfo({...mostRecentUserInput, [varname]: userInfoFieldValue});
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
								{mostRecentUserInput[varname]}
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

export function UserInfoEntryElementPassword ({}) {
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
					<IconButton size="small" color="primary" variant="contained" onClick={(x) => navigate("/password/")}>
						<EditIcon  fontSize="inherit"/>
					</IconButton>
				</Box>
			</Stack>
		</React.Fragment>
	)
};

export function UserInfoElementUsername ({mostRecentUserInput}) {
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
						{mostRecentUserInput.username}
					</Typography>
				</Box>
				<Box sx={{width:"40%", height:"2em"}}/>
			</Stack>
		</React.Fragment>
	)
}

export function UserInfoEntryElementBirthDate ({mostRecentUserInput, setUserInput,  setMostRecentUserInfo}) {
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
							value={mostRecentUserInput.birthDate}
							views={['year', 'month', 'day']}
							onChange={(newValue) => {
								setUserInput({...mostRecentUserInput, birthDate : newValue})
								setMostRecentUserInfo({...mostRecentUserInput, birthDate: newValue})
							}}
							renderInput={(params) => <TextField {...params} />}
						/>
					</LocalizationProvider>
				</Box>
			{/*	<Box sx={{width:"40%", height:"2em"}}>
					<IconButton size="small" color="primary" variant="contained"
						onClick={(x) => {
							//this if statement is a very weak check for good input value, needs reinforcing - NL
							if (value) {
								setUserInput({...userInput, birthDate : value});
							}
						}}>
						<CheckCircleIcon  fontSize="inherit"/>
					</IconButton>
				</Box>
				   {toggleEdit.birthDate ? (
					<React.Fragment>
						<Box sx={{width:"40%", textAlign:"left"}}>
									<LocalizationProvider dateAdapter={AdapterDateFns}>
										<DesktopDatePicker
											label="Birth Date"
											value={date}
											views={['year', 'month', 'day']}
											onChange={(newValue) => {
												setDate({...date, birthDate : newValue});
											}}
											renderInput={(params) => <TextField {...params} />}
										/>
									</LocalizationProvider>
						</Box>
						<Box sx={{width:"40%"}}>
							<Stack>
								<Box>
									<IconButton size="small" color="primary" variant="contained" onClick={(x) => setToggleEdit({...toggleEdit, birthDate : false})}>
										<CancelIcon  fontSize="inherit"/>
									</IconButton>
								</Box>
								<Box>
									<IconButton size="small" color="primary" variant="contained"
										onClick={(x) => {
											//this if statement is a very weak check for good input value, needs reinforcing - NL
											if (date) {
												setUserInput({...userInput, birthDate : date.birthDate});
											}
											setToggleEdit({...toggleEdit, birthDate : false});
										}}>
										<CheckCircleIcon  fontSize="inherit"/>
									</IconButton>
								</Box>
							</Stack>
						</Box>
					</React.Fragment>
				):(
					<React.Fragment>
						<Box sx={{width:"40%", textAlign:"left"}}>
								<React.Fragment>
									<LocalizationProvider dateAdapter={AdapterDateFns}>
										<DesktopDatePicker
											label="Birth Date"
											readOnly
											value={(userInput.birthDate) ? userInput.birthDate : date}
											views={['year', 'month', 'day']}
											onChange={(newValue) => {
												setDate({...date, birthDate : newValue});
											}}
											renderInput={(params) => <TextField {...params} />}
										/>
									</LocalizationProvider>
								</React.Fragment>
						</Box>
						<Box sx={{width:"40%", height:"2em"}}>
							<IconButton size="small" color="primary" variant="contained" onClick={(x) => setToggleEdit({...toggleEdit, birthDate : true})}>
								<EditIcon  fontSize="inherit"/>
							</IconButton>
						</Box>
					</React.Fragment>
				)}*/}
			</Stack>
		</React.Fragment>
	)
}

export function UserInfoEntryElementDisplayName ({mostRecentUserInput, setUserInput, toggleEdit, setToggleEdit,  setMostRecentUserInfo}) {
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
												setUserInput({...mostRecentUserInput, displayName : userInfoFieldValue});
												setMostRecentUserInfo({...mostRecentUserInput, displayName: userInfoFieldValue});
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
								{mostRecentUserInput.displayName}
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

export function UserInfoEntryElementEmail ({mostRecentUserInput, setUserInput, toggleEdit, setToggleEdit,  setMostRecentUserInfo}) {
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
										setUserInput({...mostRecentUserInput, email : userInfoFieldValue});
										setMostRecentUserInfo({...mostRecentUserInput, email: userInfoFieldValue});
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
								{mostRecentUserInput.email}
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