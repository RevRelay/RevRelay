import {
	AppBar,
	Autocomplete,
	Box,
	Button,
	Card,
	Drawer,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
	List,
	ListItem,
	Divider,
	ListItemText,
	Toolbar,
	ListItemIcon,
	Typography,
    Grid,
    LoginIcon,
    HowToRegIcon,
} from "@mui/material";
import React, { useState } from "react";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import { Logout } from "@mui/icons-material";
import SidebarList from "./SidebarList.js";
import NavSearchBar from "./NavSearchBar.js";

export default function Home({JWT}){
  
    const handleChange = (event) => {
      setSpacing(Number(event.target.value));
    };
    //navigate("/user/profile")
    return (
        <Grid sx={{ flexGrow: 1 }} container spacing={2}>
          <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={8}>
                <Grid key="Login" item>
                    <Button to="/login" primary="login" icon={<LoginIcon />} />
                </Grid>
                <Grid key="Register" item>
                    <Button to="/register" primary="register" icon={<HowToRegIcon />} />
                </Grid>
            </Grid>
          </Grid>
        </Grid>
}