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

/**
 * 
 * @param {object} param
 * @param {string} param.JWT token determinig user and log in information.
 */
function ChangePassword({JWT}) {

}

export default ChangePassword;