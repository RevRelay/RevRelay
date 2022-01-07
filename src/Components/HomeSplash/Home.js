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
    Stack,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LoginIcon from '@mui/icons-material/Login';
import React from "react";
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  
/**
 * 
 * @param {object} param
 * @param {string} param.JWT the current JWT
 * @returns 
 */
export default function Home({JWT}){
	let navigate = useNavigate();
    //navigate("/user/profile")
    return ( JWT? navigate("/user/profile") :
        <>
            <Stack direction="row" spacing={15} justifyContent="center" >
            </Stack>
            <br></br>
            <Stack direction="row" spacing={15} justifyContent="center" >
                <Item key="Login" >
                    <Typography  > Returning User</Typography>
                    <br></br>
                    <Button onClick={(x) => navigate("/login")} primary="login" startIcon={<LoginIcon />} > Login </Button>
                </Item>
                <Item key="Register" item>
                    <Typography  > New User </Typography>
                    <br></br>
                    <Button onClick={(x) => navigate("/register")} primary="register" startIcon={<HowToRegIcon />} > Register </Button>
                </Item>
            </Stack>
        </>
    )
}