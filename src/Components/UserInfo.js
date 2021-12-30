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

function UserInfo({JWT}){
	const [userInput, setUserInput] = useState({
		username:'jlecl903',
		firstName:'Jennica',
		lastName:'LeClerc',
		email:'email@email.com',
		birthDate:'12/12/1212',
		displayName:'userName'
	});

	useEffect(()=>{ Submit(); },[])

	const Submit = async (e) => {		
		var uID = parseJWT(JWT).ID;
		const response = await axios.get("localhost:5000/users/" + uID, {headers:{"Authorization":"Bearer " + JWT}}).then(resp => resp);
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
			>
				<Grid
					item
					xs={2}
					justifyContent="center"
					align="center"
				>
					<img className="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" />
					<IconButton>
						<AddAPhotoIcon />
					</IconButton>
					<br/>
					<Typography variant="h5">
						{userInput.displayName}
						<IconButton>
							<EditIcon />
						</IconButton>
					</Typography>
					<Typography variant="subtitle1">
						{userInput.email}
						<IconButton>
							<EditIcon />
						</IconButton>
					</Typography>
				</Grid>
				<Divider orientation="vertical" flexItem></Divider>
				<Grid item xs={8}>
					<Box>
						<Typography variant="h4">
						Profile Settings
						</Typography>
						<br/>
						<Grid
							container
							direction="row"
						>
							<Grid item xs={2}>
								<Typography style={{ fontWeight: 600 }}>
									Username
								</Typography>
							</Grid>
							<Grid item xs={2}>
								<Typography>
									{userInput.username}
								</Typography>
							</Grid>
							<Grid item xs={8}>
								<IconButton>
									<EditIcon />
								</IconButton>
							</Grid>
							<Grid item xs={2}>
								<Typography style={{ fontWeight: 600 }}>
									Password
								</Typography>
							</Grid>
							<Grid item xs={2}>
								<Typography>
									{'\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022'}
								</Typography>
							</Grid>
							<Grid item xs={8}>
								<IconButton>
									<EditIcon />
								</IconButton>
							</Grid>
							<Grid item xs={2}>
								<Typography style={{ fontWeight: 600 }}>
									First Name
								</Typography>
							</Grid>
							<Grid item xs={2}>
								<Typography>
									{userInput.firstName}
								</Typography>
							</Grid>
							<Grid item xs={8}>
								<IconButton>
									<EditIcon />
								</IconButton>
							</Grid>
							<Grid item xs={2}>
								<Typography style={{ fontWeight: 600 }}>
									Last Name
								</Typography>
							</Grid>
							<Grid item xs={2}>
								<Typography>
									{userInput.lastName}
								</Typography>
							</Grid>
							<Grid item xs={8}>
								<IconButton>
									<EditIcon />
								</IconButton>
							</Grid>
							<Grid item xs={2}>
								<Typography style={{ fontWeight: 600 }}>
									Birth Date
								</Typography>
							</Grid>
							<Grid item xs={2}>
								<Typography>
									{userInput.birthDate}
								</Typography>
							</Grid>
							<Grid item xs={8}>
								<IconButton>
									<EditIcon />
								</IconButton>
							</Grid>
						</Grid>
					</Box>
					<br/>
					<Button variant="contained">
						Save Profile
					</Button>
				</Grid>
			</Grid>
		</>
	)
}

export default UserInfo;