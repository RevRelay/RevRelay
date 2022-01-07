import React, { useState, useEffect } from "react";
import {
	Avatar,
	Button,
	Box,
	Card,
	IconButton,
	Typography,
	CardContent,
	CardActions,
	Stack
} from "@mui/material";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import SaveIcon from '@mui/icons-material/Save';
import APIQuery from "../../API/APIQuery";
import { updateUser } from "../../API/UserAPI";
import UserInfoEntryElement, { UserInfoElementUsername, 
	UserInfoEntryElementPassword,
	UserInfoEntryElementBirthDate, 
	UserInfoEntryElementDisplayName, 
	UserInfoEntryElementEmail 
} from "./UserInfoEntryElement";
import {
	User,
	Toggle,
	SetStateActionUser,
	SetStateActionTog, 
} from "../../typeDef"

/**
 * 
 * @param {object} prop
 * @param {string} prop.JWT token determinig user and log in information.
 * @returns 
 */
function UserInfo({JWT}) {

	/**
	 * @type {[User, SetStateActionUser]}
	 */
	const [mostRecentUserInfo, setMostRecentUserInfo] = useState({
		username:'',
		firstName:'',
		lastName:'',
		email:'',
		birthDate:'',
		displayName:'',
		userID:''
	});

	/**
	 * @type {[User, SetStateActionUser]}
	 */
	const [userInput, setUserInput] = useState({
		username:'',
		firstName:'',
		lastName:'',
		email:'',
		birthDate:'',
		displayName:''
	});

	/**
	 * @type {[Toggle, SetStateActionTog]}
	 */
	const [toggleEdit, setToggleEdit] = useState({
		username: false,
		firstName: false,
		lastName: false,
		email: false,
		birthDate: false,
		displayName: false
	})

	// Const used for mapping to UserInfoEntryElement
	const userInfoFields = [
		{name: "First Name", varname: "firstName"},
		{name: "Last Name", varname: "lastName"},
	]

	useEffect(()=>{ FetchUserInfo(); },[])

	/**
	 * @async
	 * @param {Event} e 
	 */
	const FetchUserInfo = async (e) => {		
		const response = await APIQuery.get("/users/current", {headers: {"Authorization":"Bearer " + JWT}}).then(resp => resp);
		setMostRecentUserInfo({
			username:response.data.username,
			firstName:response.data.firstName, 
			lastName:response.data.lastName,
			email:response.data.email,
			birthDate: new Date(response.data.birthDate),
			displayName:response.data.displayName,
			userID:response.data.userID
		});
	}

	/**
	 * 
	 */
	function submitButton() {
		let user = {"email":userInput.email,
					"firstName":userInput.firstName,
					"lastName":userInput.lastName,
					"birthDate":userInput.birthDate,
					"displayName":userInput.displayName,
		};
		if(user.email === "" && user.firstName === "" && user.lastName === "" && user.birthDate === "" && user.displayName === ""){
			alert("You cannot change nothing.");
		} else {
			updateUser(user, JWT);
		}
	};

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
									<br/><br/>
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
									<UserInfoEntryElementDisplayName key={"displayNameEntryElement"} mostRecentUserInfo = {mostRecentUserInfo} setUserInput = {setUserInput} toggleEdit = {toggleEdit} setToggleEdit = {setToggleEdit} setMostRecentUserInfo={setMostRecentUserInfo} />
									<UserInfoEntryElementEmail key={"emailEntryElement"} mostRecentUserInfo = {mostRecentUserInfo} setUserInput = {setUserInput} toggleEdit = {toggleEdit} setToggleEdit = {setToggleEdit} setMostRecentUserInfo={setMostRecentUserInfo} />
								</Box>
							</Stack>
						</CardContent>
					</Card>
					<Card sx={{ width: "65%"}} style={{ borderColor: "none", boxShadow: "none" }}>
						<CardContent sx={{ marginLeft: "2%", marginRight: "2%"}}>
							<br/><br/><br/><br/>
							<Typography variant="h4">
								Profile Settings
							</Typography>
							<br/>
							<Box>
								<UserInfoElementUsername key={"usernameElement"} mostRecentUserInfo={mostRecentUserInfo}/>
								<UserInfoEntryElementPassword key={"passwordElement"} />
								{userInfoFields.map((x) => {
									return (
										<UserInfoEntryElement key = {x.varname+"EntryElement"} varname={x.varname} fieldName = {x.name} mostRecentUserInfo = {mostRecentUserInfo} setUserInput = {setUserInput} toggleEdit = {toggleEdit} setToggleEdit = {setToggleEdit} setMostRecentUserInfo={setMostRecentUserInfo} />
									)
								})}
								<UserInfoEntryElementBirthDate key={"birthDateEntryElement"} mostRecentUserInfo={mostRecentUserInfo} setUserInput={setUserInput} setMostRecentUserInfo={setMostRecentUserInfo} toggleEdit = {toggleEdit} setToggleEdit = {setToggleEdit} />
							</Box>
						</CardContent>
						<CardActions sx={{paddingLeft:"30%"}}>
							<Button  variant="contained" endIcon={<SaveIcon />} onClick={(userInput) => {submitButton(userInput)}} sx={{bgcolor:"primary" }} >
								Save
							</Button>
						</CardActions>
					</Card>
				</Box>
			</Box>
		</React.Fragment>
	)
}

export default UserInfo;