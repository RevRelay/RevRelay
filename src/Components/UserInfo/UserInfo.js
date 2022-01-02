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
import EditIcon from '@mui/icons-material/Edit';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
 import {
	Routes, 
	Route, 
	useNavigate, 
} from "react-router-dom";
import parseJWT from "../../parseJWT";
import axios from "axios";
import APIQuery from "../../API/APIQuery";
import UserInfoEntryElement from "./UserInfoEntryElement";

function UserInfo({JWT}) {
	let navigate = useNavigate; 
	const [userInput, setUserInput] = useState({
		username:'',
		firstName:'',
		lastName:'',
		email:'',
		birthDate:'',
		displayName:''
	});

	const [toggleEdit, setToggleEdit] = useState({
		username: false,
		firstName: false,
		lastName: false,
		email: false,
		birthDate: false,
		displayName: false
	})
/**
 * Const used for mapping to UserInfoEntryElement
 */
	const userInfoFields = [
		{name: "Username", varname: "username"},
		{name: "Password", varname: "password"},
		{name: "First Name", varname: "firstName"},
		{name: "Last Name", varname: "lastName"},
		{name: "Birth Date", varname: "birthDate"}
		// ,{name: "Display Name", varname: "displayName"}
	]

	useEffect(()=>{ FetchUserInfo(); },[])

	const FetchUserInfo = async (e) => {		
		// var uID = parseJWT(JWT).ID;
		const response = await APIQuery.get("/users/current", {headers: {"Authorization":"Bearer " + JWT}}).then(resp => resp);
		// const response = await APIQueryAuth.get("/users/" + uID).then(resp => resp);
		// const response = await axios.get("localhost:5000/users/" + uID, {headers:{"Authorization":"Bearer " + JWT}}).then(resp => resp);
		console.log(response);
		setUserInput({
			username:response.data.username, 
			firstName:response.data.firstName, 
			lastName:response.data.lastName, 
			email:response.data.email,
			birthDate:response.data.birthDate,
			displayName:response.data.displayName
		});
	}

	return(
		<React.Fragment>
			<br/><br/>
			<Grid 
				container
				spacing={2}
				direction="row"
				justifyContent="center"
				alignItems="center"
				align="center"
			>
				<Grid
					item
					xs={3}
					justifyContent="center"
					align="center"
				>
					<img className="rounded-circle mt-5" width="150px" alt='' src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" />
					<IconButton>
						<AddAPhotoIcon />
					</IconButton>
					<br/>
					<Box width="50%">
						<Typography variant="h5" align="right">
							{userInput.displayName}
							<IconButton size="small">
								<EditIcon  fontSize="inherit"/>
							</IconButton>
						</Typography>
						<Typography variant="subtitle1" align="right">
							{userInput.email}
							<IconButton size="small">
								<EditIcon  fontSize="inherit"/>
							</IconButton>
						</Typography>
					</Box>
				</Grid>
				<Divider orientation="vertical" flexItem></Divider>
				<Grid item xs={7} align="left">
					<Box>
						<Typography variant="h4">
						Profile Settings
						</Typography>
						<br/>
						<Grid container direction="row">
							{userInfoFields.map((x) => {
								return (
									<UserInfoEntryElement key = {x.varname} varname={x.varname} fieldName = {x.name} userInput = {userInput} setUserInput = {setUserInput} toggleEdit = {toggleEdit} setToggleEdit = {setToggleEdit}/>
								)
							})}
						</Grid>
					</Box>
				</Grid>
			</Grid>
		</React.Fragment>
	)
}

export default UserInfo;