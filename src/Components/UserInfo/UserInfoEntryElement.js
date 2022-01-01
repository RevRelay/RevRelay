import React, { useState, useEffect } from "react";
import {
	AppBar,
	Autocomplete,
	Button,
	Box,
	Card,
	ContainerTypeMap,
	Divider,
	Drawer,
	Grid,
	IconButton,
	InputLabel,
	Link,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	MenuItem,
	Select,
	TextField,
	Toolbar,
	Typography,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import EmailIcon from '@mui/icons-material/Email';
import EventIcon from '@mui/icons-material/Event';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
 import {
	Routes, 
	Route, 
	useNavigate, 
} from "react-router-dom";
import parseJWT from "../../parseJWT";
import axios from "axios";
import APIQuery from "../../API/APIQuery";

/**
 * Function for defining user info elements on UserInfo that are listed in the main body of the page (currently username, password, firstName, lastName, and birthDate).
 * @param {Object} props
 * @param {string} props.varname - the variable name associated with the list element (i.e. username).
 * @param {string} props.fieldName - the display name of the list element (i.e. Username).
 * @param {*} props.userInput - state variable holding user field information.
 * @param {*} props.setUserInput - state variable setter for user field information.
 * @param {*} props.toggleEdit - state variable for determining if a field is toggled to display (false) or edit (true). 
 * @param {*} props.setToggleEdit - state variable setter for field toggle state. 
 * @returns ReactFragment containing UserInfo data with toggles (and eventually editing ability) formatted for insertion into a grid. 
 */
export default function UserInfoEntryElement ({varname, fieldName, userInput, setUserInput, toggleEdit, setToggleEdit}) {
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
							<Typography>
								{(varname == 'password') ? '\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022' : userInput[varname]}
							</Typography>
						</Grid>
						<Grid item xs={1}>
							<IconButton size="small">
								<CancelIcon  fontSize="inherit" onClick={(x) => setToggleEdit({...toggleEdit, [varname] : false})}/>
							</IconButton>
							<IconButton size="small">
								<CheckCircleIcon  fontSize="inherit"/>
							</IconButton>
						</Grid>
						<Grid item xs={6}/>
					</React.Fragment>
					) : (
					<React.Fragment>
						<Grid item xs={2}>
							<Typography>
							{(varname == 'password') ? '\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022' : userInput[varname]}
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