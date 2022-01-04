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
import APIQuery from "../../API/APIQuery";
import UserAPI, { updateEmail, updateBirthdate, updateDisplayName, updateFirstName, updateLastName } from "../../API/UserAPI";
// import  from "./UserInfoEntryElement";
import UserInfoEntryElement, { UserInfoEntryElementDisplayName, UserInfoEntryElementEmail } from "./UserInfoEntryElement";

function UserInfo({JWT}) {
	const [mostRecentUserInfo, setMostRecentUserInfo] = useState({
		username:'',
		firstName:'',
		lastName:'',
		email:'',
		birthDate:'',
		displayName:'',
		userID:''
	});

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
		{name: "Password", varname: "password"},
		{name: "First Name", varname: "firstName"},
		{name: "Last Name", varname: "lastName"},
		{name: "Birth Date", varname: "birthDate"}
	]

	useEffect(()=>{ FetchUserInfo(); },[])

	const FetchUserInfo = async (e) => {		
		const response = await APIQuery.get("/users/current", {headers: {"Authorization":"Bearer " + JWT}}).then(resp => resp);
		// const response = await APIQueryAuth.get("/users/" + uID).then(resp => resp);
		// const response = await axios.get("localhost:5000/users/" + uID, {headers:{"Authorization":"Bearer " + JWT}}).then(resp => resp);
		// console.log(response);
		// eslint-disable-next-line no-lone-blocks
		setMostRecentUserInfo({
			username:response.data.username,
			firstName:response.data.firstName, 
			lastName:response.data.lastName,
			email:response.data.email,
			birthDate:response.data.birthDate,
			displayName:response.data.displayName,
			userID:response.data.userID
		});
		setUserInput({
			username:response.data.username, 
			firstName:response.data.firstName, 
			lastName:response.data.lastName, 
			email:response.data.email,
			birthDate:response.data.birthDate,
			displayName:response.data.displayName
		});
	}

	function saveChanges() {
		console.log(userInput.email);
		updateFirstName(userInput.firstName, mostRecentUserInfo.userID, JWT);
		updateLastName(userInput.lastName, mostRecentUserInfo.userID, JWT);
		updateBirthdate(userInput.birthDate, mostRecentUserInfo.userID, JWT);
		updateDisplayName(userInput.displayName, mostRecentUserInfo.userID, JWT);
		updateEmail(userInput.email, mostRecentUserInfo.userID, JWT);
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
							<Grid item xs={3}>
								<Typography style={{ fontWeight: 600 }}>
									Username
								</Typography>
							</Grid>
							<React.Fragment>
								<Grid item xs={2}>
									<Typography>
										{userInput.username}
									</Typography>
								</Grid>
								<Grid item xs={7}>
								</Grid>
							</React.Fragment>
							{userInfoFields.map((x) => {
								return (
									<UserInfoEntryElement key = {x.varname+"EntryElement"} varname={x.varname} fieldName = {x.name} userInput = {userInput} setUserInput = {setUserInput} toggleEdit = {toggleEdit} setToggleEdit = {setToggleEdit}/>
								)
							})}
						</Grid>
					</Box>
					<Button onClick={saveChanges()}>Save Changes</Button>
				</Grid>
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