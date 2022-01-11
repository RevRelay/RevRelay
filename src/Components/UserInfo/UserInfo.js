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
	Stack,
} from "@mui/material";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import SaveIcon from '@mui/icons-material/Save';
import APIQuery from "../../API/APIQuery";
import { updateUser, uploadImage, getProfilePic } from "../../API/UserAPI";
import UserInfoEntryElement, { UserInfoElementUsername, 
	UserInfoEntryElementPassword,
	UserInfoEntryElementBirthDate, 
	UserInfoEntryElementDisplayName, 
	UserInfoEntryElementEmail 
} from "./UserInfoEntryElement";
import { JWTs } from "../../typeDef"

/**
 * Shows the user their user info and allows them to change their information on the page.
 * If they want to change their password it redirects them to the Change Password page.
 * 
 * @param {JWTs} 	infoProp		The Array for an object that just contains a JWT
 * @param {String}	infoProp.token 	JWT Token determinig user and log in information.
 * @returns The user info page returned with React
 */
function UserInfo(infoProp) {

	// used for choosing an image
	const inputRef = React.useRef();

	/**
	 * ---
	 */
	const filePopup = () => inputRef.current.click();

	// state for setting image
	const [image, setImage] = React.useState(null);
	
	/**
	 * Makes sure that file is valid, sets selected file to profile picture.
	 * 
	 * @param {event} event ---
	 */
	const onSelectFile = (event) => {
		if(event.target.files && event.target.files.length > 0) {
			const reader = new FileReader();
			reader.readAsDataURL(event.target.files[0]);
			reader.addEventListener('load', ()=> {
				setImage(reader.result);
			})
		}
	};

	const [mostRecentUserInfo, setMostRecentUserInfo] = useState({
		username: '',
		firstName: '',
		lastName: '',
		email: '',
		birthDate: '',
		displayName: '',
		userID: ''
	});

	const [userInput, setUserInput] = useState({
		username: '',
		firstName: '',
		lastName: '',
		email: '',
		birthDate: '',
		displayName: ''
	});

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

	/**
	 * ---
	 */
	// TODO:  React Hook useEffect has a missing dependency: 'FetchUserInfo'. Either include it or remove the dependency array
	useEffect(()=>{ FetchUserInfo(); },[])

	/**
	 * ---
	 * 
	 * @async
	 * @param {Event} e ---
	 */
	const FetchUserInfo = async (e) => {	
		const response = await APIQuery.get("/users/current", {headers: {"Authorization":"Bearer " + infoProp.token}}).then(resp => resp);
		setMostRecentUserInfo({
			username: response.data.username,
			firstName: response.data.firstName, 
			lastName: response.data.lastName,
			email: response.data.email,
			birthDate: new Date(response.data.birthDate),
			displayName: response.data.displayName,
			userID: response.data.userID
		});

		// get user profile picture from s3 using userId, clear previous profile picture if changed
		sessionStorage.clear();
		if(!image) {
			setImage(getProfilePic(response.data.userID));
		}
	}

	/**
	 * ---
	 */
	function submitButton() {
		let user = {
			"email": userInput.email,
			"firstName": userInput.firstName,
			"lastName": userInput.lastName,
			"birthDate": userInput.birthDate,
			"displayName": userInput.displayName,
		};
		if(user.email === "" && user.firstName === "" && user.lastName === "" && user.birthDate === "" && user.displayName === "" && !image){
			alert("You cannot change nothing.");
		} else {
			updateUser(user, infoProp.token);
		}
		// need to check if image changed, save to s3 bucket
		if(image) {
			uploadImage(image, mostRecentUserInfo.userID);
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
										alt="Pidgeon"
										src={image}
										sx={{ width: 150, height: 150}}							
									/>
									<input type='file' accept='image/*' ref={inputRef} onChange={onSelectFile} hidden={true} />
									<IconButton color="primary" variant="contained" onClick={filePopup}> 
										<AddAPhotoIcon />
									</IconButton>
								</Box>
								<br/>
								<Box width="95%">
									<UserInfoEntryElementDisplayName 
										key = {"displayNameEntryElement"}
										mostRecentUserInfo = {mostRecentUserInfo}
										setMostRecentUserInfo = {setMostRecentUserInfo}
										setUserInput = {setUserInput}
										toggleEdit = {toggleEdit}
										setToggleEdit = {setToggleEdit}
									/>
									<UserInfoEntryElementEmail 
										key = {"emailEntryElement"}
										mostRecentUserInfo = {mostRecentUserInfo}
										setMostRecentUserInfo = {setMostRecentUserInfo}
										setUserInput = {setUserInput}
										toggleEdit = {toggleEdit}
										setToggleEdit = {setToggleEdit}
									/>
								</Box>
							</Stack>
						</CardContent>
					</Card>
					<Card sx={{ width: "65%"}} style={{ borderColor: "none", boxShadow: "none" }}>
						<CardContent sx={{ marginLeft: "2%", marginRight: "2%"}}>
							<br/><br/><br/><br/>
							<Typography variant = "h4">
								Profile Settings
							</Typography>
							<br/>
							<Box>
								<UserInfoElementUsername key = {"usernameElement"} user = {mostRecentUserInfo}/>
								<UserInfoEntryElementPassword key = {"passwordElement"} />
								{userInfoFields.map((x) => {
									return (
										<UserInfoEntryElement 
											key = {x.varname+"EntryElement"}
											varname={x.varname}
											fieldName = {x.name}
											mostRecentUserInfo = {mostRecentUserInfo}
											setMostRecentUserInfo = {setMostRecentUserInfo}
											setUserInput = {setUserInput}
											toggleEdit = {toggleEdit}
											setToggleEdit = {setToggleEdit}
										/>
									)
								})}
								<UserInfoEntryElementBirthDate 
									key = {"birthDateEntryElement"} 
									mostRecentUserInfo = {mostRecentUserInfo}
									setMostRecentUserInfo = {setMostRecentUserInfo}
									setUserInput = {setUserInput}
									toggleEdit = {toggleEdit}
									setToggleEdit = {setToggleEdit}
								/>
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