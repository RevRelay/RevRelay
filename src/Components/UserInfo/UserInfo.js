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
import APIQuery from "../../API/APIQuery";
import UserAPI, { updateEmail, 
	updateBirthdate, 
	updateDisplayName, 
	updateFirstName, 
	updateLastName,
	updateUser,
} from "../../API/UserAPI";
// import	from "./UserInfoEntryElement";
import UserInfoEntryElement, { UserInfoElementUsername, 
	UserInfoEntryElementPassword,
	UserInfoEntryElementBirthDate, 
	UserInfoEntryElementDisplayName, 
	UserInfoEntryElementEmail 
} from "./UserInfoEntryElement";

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
	}

	function submitButton() {
		let count = 0;
		/**
		 * 
			private String username;
			private String email;
			private String firstName;
			private String lastName;
			private Date birthDate;
			private String displayName;
			private Page userPage;
			private int userID;
		 */
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
		// if (mostRecentUserInfo.firstName !== userInput.firstName) {
		// 	count++
		// 	updateFirstName(userInput.firstName, mostRecentUserInfo.userID, JWT)
		// 	setMostRecentUserInfo({firstName:userInput.firstName})
		// 	//setMostRecentUserInfo.firstName = null
		// }
		// if (mostRecentUserInfo.lastName !== userInput.lastName) {
		// 	count++
		// 	updateLastName(userInput.lastName, mostRecentUserInfo.userID, JWT)
		// 	setMostRecentUserInfo({lastName:userInput.lastName})
		// 	//setMostRecentUserInfo.lastName = null
		// }
		// if (mostRecentUserInfo.birthDate !== userInput.birthDate) {
		// 	count++
		// 	updateBirthdate(userInput.birthDate, mostRecentUserInfo.userID, JWT)
		// 	setMostRecentUserInfo({birthDate:userInput.birthDate})
		// 	//setMostRecentUserInfo.birthDate = null
		// }
		// if (mostRecentUserInfo.displayName !== userInput.displayName) {
		// 	count++
		// 	updateDisplayName(userInput.displayName, mostRecentUserInfo.userID, JWT)
		// 	setMostRecentUserInfo({displayName:userInput.displayName})
		// 	//setMostRecentUserInfo.displayName = null
		// }
		// if (mostRecentUserInfo.email !== userInput.email) {
		// 	count++
		// 	updateEmail(userInput.email, mostRecentUserInfo.userID, JWT)
		// 	setMostRecentUserInfo({email:userInput.email})
		// 	//setMostRecentUserInfo.email = null
		// }
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
									<UserInfoEntryElementDisplayName key={"displayNameEntryElement"} mostRecentUserInput = {mostRecentUserInfo} setUserInput = {setUserInput} toggleEdit = {toggleEdit} setToggleEdit = {setToggleEdit} setMostRecentUserInfo={setMostRecentUserInfo} />
									<UserInfoEntryElementEmail key={"emailEntryElement"} mostRecentUserInput = {mostRecentUserInfo} setUserInput = {setUserInput} toggleEdit = {toggleEdit} setToggleEdit = {setToggleEdit} setMostRecentUserInfo={setMostRecentUserInfo} />
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
								<UserInfoElementUsername key={"usernameElement"} mostRecentUserInput={mostRecentUserInfo}/>
								<UserInfoEntryElementPassword key={"passwordElemetn"} />
								{userInfoFields.map((x) => {
									return (
										<UserInfoEntryElement key = {x.varname+"EntryElement"} varname={x.varname} fieldName = {x.name} mostRecentUserInput = {mostRecentUserInfo} setUserInput = {setUserInput} toggleEdit = {toggleEdit} setToggleEdit = {setToggleEdit} setMostRecentUserInfo={setMostRecentUserInfo} />
									)
								})}
								<UserInfoEntryElementBirthDate key={"birthDateEntryElement"} mostRecentUserInput={mostRecentUserInfo} setUserInput={setUserInput} setMostRecentUserInfo={setMostRecentUserInfo} />
							</Box>
						</CardContent>
						<CardActions sx={{paddingLeft:"30%"}}>
							<Button onClick={(userInput) => {submitButton(userInput)}} sx={{bgcolor:"primary" }} variant="contained" >Save Changes</Button>
						</CardActions>
					</Card>
				</Box>
			</Box>
		</React.Fragment>
	)
}

export default UserInfo;