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
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
 import {
	Routes, 
	Route, 
	useNavigate, 
} from "react-router-dom";
import parseJWT from "../../parseJWT";
import axios from "axios";
import APIQuery from "../../API/APIQuery";
// import  from "./UserInfoEntryElement";
import UserInfoEntryElement, { UserInfoEntryElementDisplayName, UserInfoEntryElementEmail } from "./UserInfoEntryElement";

function UserInfo({JWT}) {
	let mostRecentUserInfo = {
		username:'',
		firstName:'',
		lastName:'',
		email:'',
		birthDate:'',
		displayName:''
	};
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
	]

	useEffect(()=>{ FetchUserInfo(); },[])

	const FetchUserInfo = async (e) => {		
		// var uID = parseJWT(JWT).ID;
		const response = await APIQuery.get("/users/current", {headers: {"Authorization":"Bearer " + JWT}}).then(resp => resp);
		// const response = await APIQueryAuth.get("/users/" + uID).then(resp => resp);
		// const response = await axios.get("localhost:5000/users/" + uID, {headers:{"Authorization":"Bearer " + JWT}}).then(resp => resp);
		// console.log(response);
		{
			mostRecentUserInfo.username = response.data.username; 
			mostRecentUserInfo.firstName = response.data.firstName; 
			mostRecentUserInfo.lastName = response.data.lastName; 
			mostRecentUserInfo.email = response.data.email;
			mostRecentUserInfo.birthDate = response.data.birthDate;
			mostRecentUserInfo.displayName = response.data.displayName;
		};
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
				columns={12}
			>
				<Grid item xs={3} justifyContent="center" align="center">
					<img className="rounded-circle mt-5" width="150px" alt='' src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" />
					<IconButton>
						<AddAPhotoIcon />
					</IconButton>
					<br/>
					<Box width="50%">
						<UserInfoEntryElementDisplayName key={"displayNameEntryElement"} userInput = {userInput} setUserInput = {setUserInput} toggleEdit = {toggleEdit} setToggleEdit = {setToggleEdit} />
						<UserInfoEntryElementEmail key={"emailEntryElement"} userInput = {userInput} setUserInput = {setUserInput} toggleEdit = {toggleEdit} setToggleEdit = {setToggleEdit}/>
					</Box>
				</Grid>
				<Divider orientation="vertical" flexItem></Divider>
				<Grid item xs={7} align="left">
					<Box>
						<Typography variant="h4">
						Profile Settings
						</Typography>
						<br/>
						<Grid columns={12} container>
							{userInfoFields.map((x) => {
								return (
									<UserInfoEntryElement key = {x.varname+"EntryElement"} varname={x.varname} fieldName = {x.name} userInput = {userInput} setUserInput = {setUserInput} toggleEdit = {toggleEdit} setToggleEdit = {setToggleEdit}/>
								)
							})}
						</Grid>
					</Box>
				</Grid>
				{/* Attempts to make a save button that only apperas on change. Suspect it'll require an event listener. - NL */}
				{/* {mostRecentUserInfo.lastName === userInput.lastName ? (
					<React.Fragment/>
				) : (
				<Grid item xs={6}>
					<Button >Save Changes</Button>
				</Grid>
				)} */}
			</Grid>
		</React.Fragment>
	)
}

export default UserInfo;