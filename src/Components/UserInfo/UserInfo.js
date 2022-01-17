import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import APIQuery from "../../app/api";
import { updateUser, uploadImage, getProfilePic } from "../../API/UserAPI";
import UserInfoEntryElement, {
	UserInfoElementUsername,
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
 * @param {JWTs} 	infoProp		The Array for an object that just contains a JWT.
 * @param {String}	infoProp.token 	JWT Token determinig user and log in information.
 * @returns The user info page returned with React.
 */
function UserInfo(infoProp) {

	// used for choosing an image
	const inputRef = React.useRef();
	let navigate = useNavigate();

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
		if (event.target.files && event.target.files.length > 0) {
			const reader = new FileReader();
			reader.readAsDataURL(event.target.files[0]);
			reader.addEventListener('load', () => {
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
		{ name: "First Name", varname: "firstName" },
		{ name: "Last Name", varname: "lastName" },
	]

	/**
	 * ---
	 */
	// TODO:  React Hook useEffect has a missing dependency: 'FetchUserInfo'. Either include it or remove the dependency array
	useEffect(() => { FetchUserInfo(); }, [])

	/**
	 * ---
	 * 
	 * @async
	 * @param {Event} e ---
	 */
	const FetchUserInfo = async (e) => {
		const response = await APIQuery.get("/users/current", { headers: { "Authorization": "Bearer " + infoProp.token } }).then(resp => resp);
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
		if (!image) {
			setImage(getProfilePic(response.data.userID));
		}
	}

	/**
	 * ---
	 * @async
	 * @param {Event} e The event of the submit button being pressed. The user's info, with changes, is captured.
	 */
	async function submitButton(e) {
		e.preventDefault();
		let user = {
			"email": userInput.email,
			"firstName": userInput.firstName,
			"lastName": userInput.lastName,
			"birthDate": userInput.birthDate,
			"displayName": userInput.displayName,
		};
		if (user.email === "" && user.firstName === "" && user.lastName === "" && user.birthDate === "" && user.displayName === "" && !image) {
			alert("You cannot change nothing.");
		} else {
			e.preventDefault();
			let response;
			try {
				response = await updateUser(user, infoProp.token);
			} catch (Error) {
				alert(`Error: ${Error?.response?.data}`);
			}
			if (response.data) {
				alert(`Information Successfully changed!`)
				navigate("/user/profile/userinfo");
			}
			else {
				alert(`Unable to change info`);
			}
		}
		// need to check if image changed, save to s3 bucket
		if (image) {
			uploadImage(image, mostRecentUserInfo.userID);
		}
	};

	return (
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
					<br /><br />
					<Card sx={{ width: "35%" }} style={{ borderColor: "none", boxShadow: "none" }}>
						<CardContent sx={{ marginLeft: "1%", marginRight: "1%" }}>
							<Stack direction="column" sx={{ textAlign: "center", justifyContent: "center" }}>
								<Box width="95%" sx={{ paddingLeft: "30%" }}>
									<br /><br />
									<Avatar
										alt="Pidgeon"
										src={image}
										sx={{ width: 150, height: 150 }}
									/>
								</Box>
								<br />
								<Box width="95%">
									<UserInfoEntryElementDisplayName
										key={"displayNameEntryElement"}
										mostRecentUserInfo={mostRecentUserInfo}
										setMostRecentUserInfo={setMostRecentUserInfo}
										setUserInput={setUserInput}
										toggleEdit={toggleEdit}
										setToggleEdit={setToggleEdit}
									/>
									<UserInfoEntryElementEmail
										key={"emailEntryElement"}
										mostRecentUserInfo={mostRecentUserInfo}
										setMostRecentUserInfo={setMostRecentUserInfo}
										setUserInput={setUserInput}
										toggleEdit={toggleEdit}
										setToggleEdit={setToggleEdit}
									/>
								</Box>
							</Stack>
						</CardContent>
					</Card>
					<Card sx={{ width: "65%" }} style={{ borderColor: "none", boxShadow: "none" }}>
						<CardContent sx={{ marginLeft: "2%", marginRight: "2%" }}>
							<br /><br /><br /><br />
							<Typography variant="h4">
								Profile Settings
							</Typography>
							<br />
							<Box>
								<UserInfoElementUsername key={"usernameElement"} mostRecentUserInfo={mostRecentUserInfo} />
								<UserInfoEntryElementPassword key={"passwordElement"} />
								{userInfoFields.map((x) => {
									return (
										<UserInfoEntryElement
											key={x.varname + "EntryElement"}
											varname={x.varname}
											fieldName={x.name}
											mostRecentUserInfo={mostRecentUserInfo}
											setMostRecentUserInfo={setMostRecentUserInfo}
											setUserInput={setUserInput}
											toggleEdit={toggleEdit}
											setToggleEdit={setToggleEdit}
										/>
									)
								})}
								<UserInfoEntryElementBirthDate
									key={"birthDateEntryElement"}
									mostRecentUserInfo={mostRecentUserInfo}
									setMostRecentUserInfo={setMostRecentUserInfo}
									setUserInput={setUserInput}
									toggleEdit={toggleEdit}
									setToggleEdit={setToggleEdit}
								/>
							</Box>
						</CardContent>
						<CardActions sx={{ paddingLeft: "30%" }}>
							<Button variant="contained" endIcon={<SaveIcon />} onClick={(userInput) => { submitButton(userInput) }} >
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