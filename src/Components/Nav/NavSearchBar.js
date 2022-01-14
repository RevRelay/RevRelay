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
	TextField,
	FormControl,
	OutlinedInput,
} from "@mui/material";
import React, { useState } from "react";
import { styled, alpha } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import ClearIcon from '@mui/icons-material/Clear';
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import APIQuery from '../../API/APIQuery.js';
import { SetStateActionString } from "../../typeDef";

// From https://mui.com/components/app-bar/
const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(3),
		width: 'auto',
	},
}));

// From https://mui.com/components/app-bar/
const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

// From https://mui.com/components/app-bar/
// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//	 color: 'inherit',
//	 '& .MuiInputBase-input': {
//		 padding: theme.spacing(1, 1, 1, 0),
//		 // vertical padding + font size from searchIcon
//		 paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//		 transition: theme.transitions.create('width'),
//		 width: '100%',
//		 [theme.breakpoints.up('md')]: {
//		 width: '20ch',
//		 },
//	 },
// }));

/**
 * Component for rendering the search bar portion of the NavBar. 
 * 
 * @param {boolean}					param.sendSearch		boolean state managing searching status
 * @param {SetStateActionBool}		param.setSendSearch		setter for the above
 * @returns Search Bar with text entry, startAdornment, and endAdornment.
 */
export default function NavSearchBar({sendSearch, setSendSearch}) {
	/**
	 * @type {[string, SetStateActionString]}
	 */
	const [searchInput, setSearchInput] = useState({ searchTerm: '' })

	/**
	 * 
	 * @param {event} event 
	 */
	const handleChangeSearchBar = (event) => {
		setSearchInput({ searchTerm: event.target.value });
	}

	/**
	 * 
	 */
	const handleClearSearchBar = () => {
		setSearchInput({ ...searchInput, searchTerm: '' });
	}

	let navigate = useNavigate();

	/**
	 * 
	 * @param {event} event 
	 */
	const handleSearchSubmit = (event) => {
		if (searchInput.searchTerm != '') {
			navigate(`/search/${searchInput.searchTerm}`);
			handleClearSearchBar();
			console.log(sendSearch)
			setSendSearch(!sendSearch);
			console.log(sendSearch)
		}
	};

	return (
		<Search>
			<FormControl variant="outlined" sx={{ width: '100%' }}>
				<OutlinedInput
					id="searchbar-text-field"
					sx={{ display: 'flex' }}
					value={searchInput.searchTerm}
					onChange={handleChangeSearchBar}
					startAdornment={
						<InputAdornment position="start">
							<IconButton onClick={handleSearchSubmit} edge="end" >
								<SearchIcon />
							</IconButton>
						</InputAdornment>
					}
					endAdornment={
						<InputAdornment position="end">
							<IconButton onClick={handleClearSearchBar} edge="end" >
								<CancelIcon />
							</IconButton>
						</InputAdornment>
					}>
				</OutlinedInput>
			</FormControl>
		</Search>

		// This was an early attempt at a search bar with autocomplete, which was shelved pending MVP - NL.
		// <Search>
		//	 <Autocomplete 
		//		 // freeSolo
		//		 id='search-bar-autocomplete'
		//		 options={searchOptions.map((option) => option)}
		//		 renderInput={(params) => 
		//			 <TextField 
		//				 {...params}
		//				 id="searchbar-text-field"
		//				 sx={{display:'flex'}} onChange={handleChangeSearchBar}
		//				 // filteroptions={(x) => x}
		//				 InputProps={{
		//					 ...params.InputProps,
		//					 startAdornment:
		//						 <InputAdornment position="start">
		//							 <IconButton onClick={handleSearchSubmit} edge="end" >
		//								 <SearchIcon />
		//							 </IconButton>
		//						 </InputAdornment>
		//					 }
		//				 }
		//			 />
		//		 }
		//	 />
		// </Search>
	)
}