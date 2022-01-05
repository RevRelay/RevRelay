import React, { useState } from "react";
import {
	IconButton,
	Button,
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
    let bulletString = '\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022';
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
												setUserInput({...userInput, [varname] : userInfoFieldValue});
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
								{(varname === 'password') ? bulletString : userInput[varname]}
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

export function UserInfoElementUsername ({userInput}) {
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
						{userInput.username}
					</Typography>
				</Box>
				<Box sx={{width:"40%", height:"2em"}}/>
			</Stack>
		</React.Fragment>
	)
}

export function UserInfoEntryElementBirthDate ({userInput, setUserInput}) {
	const [value, setValue] = useState(new Date());

	if(userInput.birthDate){
		setValue(userInput.birthDate)
	}

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
							color="secondary"
							label="Birth Date"
							value={value}
							views={['year', 'month', 'day']}
							onChange={(newValue) => setValue(newValue)}
							renderInput={(params) => <TextField {...params} />}
						/>
					</LocalizationProvider>
				</Box>
				<Box sx={{width:"40%", height:"2em"}}>
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
				{/*{toggleEdit.birthDate ? (
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

export function UserInfoEntryElementDisplayName ({userInput, setUserInput, toggleEdit, setToggleEdit}) {
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
												setUserInput({...userInput, displayName : userInfoFieldValue});
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
								{userInput.displayName}
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

export function UserInfoEntryElementEmail ({userInput, setUserInput, toggleEdit, setToggleEdit}) {
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
										setUserInput({...userInput, email : userInfoFieldValue});
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
								{userInput.email}
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