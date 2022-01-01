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
import EmailIcon from '@mui/icons-material/Email';
import EventIcon from '@mui/icons-material/Event';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
 import {
	Routes, 
	Route, 
	useNavigate, 
} from "react-router-dom";
import parseJWT from "../parseJWT";
import axios from "axios";
import APIQuery from "../API/APIQuery";

function UserInfo({JWT}){
	const [userInput, setUserInput] = useState({
		username:'jlecl903',
		firstName:'Jennica',
		lastName:'LeClerc',
		email:'email@email.com',
		birthDate:'12/12/1212',
		displayName:'userName'
	});

	useEffect(()=>{ FetchUserInfo(); },[])

	const FetchUserInfo = async (e) => {		
		// var uID = parseJWT(JWT).ID;
		const response = await APIQuery.get("/users/current", {headers: {"Authorization":"Bearer " + JWT}}).then(resp => resp);
		// const response = await APIQueryAuth.get("/users/" + uID).then(resp => resp);
		// const response = await axios.get("localhost:5000/users/" + uID, {headers:{"Authorization":"Bearer " + JWT}}).then(resp => resp);
		console.log(response);
		setUserInput({username:response.data.username, 
			firstName:response.data.firstName, 
			lastName:response.data.lastName, 
			email:response.data.email,
			birthDate:response.data.birthDate,
			displayName:response.data.displayName
		});
	}

	return(
		<>
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
					<img className="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" />
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
						<Grid
							container
							direction="row"
						>
							<Grid item xs={3}>
								<Typography style={{ fontWeight: 600 }}>
									Username
								</Typography>
							</Grid>
							<Grid item xs={2}>
								<Typography>
									{userInput.username}
								</Typography>
							</Grid>
							<Grid item xs={7}>
								<IconButton size="small">
									<EditIcon  fontSize="inherit"/>
								</IconButton>
							</Grid>
							<Grid item xs={3}>
								<Typography style={{ fontWeight: 600 }}>
									Password
								</Typography>
							</Grid>
							<Grid item xs={2}>
								<Typography>
									{'\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022'}
								</Typography>
							</Grid>
							<Grid item xs={7}>
								<IconButton size="small">
									<EditIcon  fontSize="inherit"/>
								</IconButton>
							</Grid>
							<Grid item xs={3}>
								<Typography style={{ fontWeight: 600 }}>
									First Name
								</Typography>
							</Grid>
							<Grid item xs={2}>
								<Typography>
									{userInput.firstName}
								</Typography>
							</Grid>
							<Grid item xs={7}>
								<IconButton size="small">
									<EditIcon  fontSize="inherit"/>
								</IconButton>
							</Grid>
							<Grid item xs={3}>
								<Typography style={{ fontWeight: 600 }}>
									Last Name
								</Typography>
							</Grid>
							<Grid item xs={2}>
								<Typography>
									{userInput.lastName}
								</Typography>
							</Grid>
							<Grid item xs={7}>
								<IconButton size="small">
									<EditIcon  fontSize="inherit"/>
								</IconButton>
							</Grid>
							<Grid item xs={3}>
								<Typography style={{ fontWeight: 600 }}>
									Birth Date
								</Typography>
							</Grid>
							<Grid item xs={2}>
								<Typography>
									{userInput.birthDate}
								</Typography>
							</Grid>
							<Grid item xs={7}>
								<IconButton size="small">
									<EditIcon  fontSize="inherit"/>
								</IconButton>
							</Grid>
						</Grid>
					</Box>
				</Grid>
			</Grid>
		</>
	)
}

export default UserInfo;