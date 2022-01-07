import React, { useState, useEffect } from "react";
import {
	Avatar,
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
	CardContent,
	CardActions,
	Stack
} from "@mui/material";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
 import {
	Routes, 
	Route, 
	useNavigate, 
} from "react-router-dom";
import APIQuery from "../../API/APIQuery";
import UserAPI, { updateEmail, updateBirthdate, updateDisplayName, updateFirstName, updateLastName } from "../../API/UserAPI";
// import	from "./UserInfoEntryElement";
import UserInfoEntryElement, { UserInfoElementUsername, UserInfoEntryElementBirthDate, UserInfoEntryElementDisplayName, UserInfoEntryElementEmail } from "./UserInfoEntryElement";

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
		console.log("Birthdate");
		console.log(userInput.birthDate);
		updateFirstName(userInput.firstName, mostRecentUserInfo.userID, JWT);
		updateLastName(userInput.lastName, mostRecentUserInfo.userID, JWT);
		updateBirthdate(userInput.birthDate, mostRecentUserInfo.userID, JWT);
		updateDisplayName(userInput.displayName, mostRecentUserInfo.userID, JWT);
		updateEmail(userInput.email, mostRecentUserInfo.userID, JWT);
	}

	return(
		<React.Fragment>
			<Box sx={{ height: "80%" }}>
				<Box
					sx={{
						border: 1,
						borderColor: "primary.main",
						borderRadius: 2,
						borderWidth: 2,
						marginLeft: "15%",
						marginRight: "15%",
						display: "flex",
						height: "100%",

						maxWidth: "100%",
						minWidth: 500,
					}}
				>
					<br/><br/>
					<Card sx={{ width: "35%"}} style={{ borderColor: "none", boxShadow: "none" }}>
						<CardContent sx={{ marginLeft: "1%", marginRight: "1%"}}>
							<Stack direction="column" sx={{textAlign:"center", justifyContent:"center"}}>
								<Box  width="95%" sx={{paddingLeft:"30%"}}>
									<Avatar
										alt="Remy Sharp"
										src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
										sx={{ width: 150, height: 150 }}
									/>
									<IconButton color="primary" variant="contained">
										<AddAPhotoIcon />
									</IconButton>
								</Box>
								<br/>
								<Box width="95%">
									<UserInfoEntryElementDisplayName key={"displayNameEntryElement"} userInput = {userInput} setUserInput = {setUserInput} toggleEdit = {toggleEdit} setToggleEdit = {setToggleEdit} />
									<UserInfoEntryElementEmail key={"emailEntryElement"} userInput = {userInput} setUserInput = {setUserInput} toggleEdit = {toggleEdit} setToggleEdit = {setToggleEdit}/>
								</Box>
							</Stack>
						</CardContent>
					</Card>
					<Card sx={{ width: "65%"}} style={{ borderColor: "none", boxShadow: "none" }}>
						<CardContent sx={{ marginLeft: "2%", marginRight: "2%"}}>
							<Typography variant="h4">
								Profile Settings
							</Typography>
							<br/>
							<Box>
								<UserInfoElementUsername key={"usernameElement"} userInput={userInput}/>
								{userInfoFields.map((x) => {
									return (
										<UserInfoEntryElement key = {x.varname+"EntryElement"} varname={x.varname} fieldName = {x.name} userInput = {userInput} setUserInput = {setUserInput} toggleEdit = {toggleEdit} setToggleEdit = {setToggleEdit}/>
									)
								})}
								<UserInfoEntryElementBirthDate key={"birthDateEntryElement"} userInput={userInput} setUserInput={setUserInput} />
							</Box>
						</CardContent>
						<CardActions sx={{paddingLeft:"30%"}}>
							<Button onClick={(userInput) => {saveChanges(userInput)}} sx={{bgcolor:"primary" }} variant="contained" >Save Changes</Button>
						</CardActions>
					</Card>
				</Box>
			</Box>
		</React.Fragment>
	)
}

export default UserInfo;