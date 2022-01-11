import {
	IconButton,
	FormControl,
	OutlinedInput,
	InputAdornment
} from "@mui/material";
import React, { useState } from "react";
import { styled, alpha } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import { SearchBar, SetStateActionBool } from "../../typeDef";

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

/**
 * Component for rendering the search bar portion of the NavBar. 
 * 
 * @param {SearchBar}			searchProp					---
 * @param {Boolean}				searchProp.sendSearch		State variable managing searching status. true is being sent, false for not.
 * @param {SetStateActionBool}	searchProp.setIsSendSearch	Setter function for the sendSearch.
 * @returns Search Bar with text entry, startAdornment, and endAdornment.
 */
export default function NavSearchBar(searchProp) {

	const [searchInput, setSearchInput] = useState({ searchTerm: '' })

	/**
	 * ---
	 * 
	 * @param {Event} event ---
	 */
	const handleChangeSearchBar = (event) => {
		setSearchInput({ searchTerm: event.target.value });
	}

	/**
	 * ---
	 */
	const handleClearSearchBar = () => {
		setSearchInput({ ...searchInput, searchTerm: '' });
	}

	let navigate = useNavigate();

	/**
	 * ---
	 * @param {Event} event	---
	 */
	const handleSearchSubmit = (event) => {
		if (searchInput.searchTerm != '') {
			navigate(`/search/${searchInput.searchTerm}`);
			handleClearSearchBar();
			searchProp.setIsSendSearch(!searchProp.sendSearch);
		}
	};

	return (
		<Search>
			<FormControl variant="outlined" sx={{ width: '100%' }}>
				<OutlinedInput
					id = "searchbar-text-field"
					sx = {{ display: 'flex' }}
					value = {searchInput.searchTerm}
					onChange = {handleChangeSearchBar}
					startAdornment = {
						<InputAdornment position="start">
							<IconButton onClick={handleSearchSubmit} edge="end" >
								<SearchIcon />
							</IconButton>
						</InputAdornment>
					}
					endAdornment = {
						<InputAdornment position="end">
							<IconButton onClick={handleClearSearchBar} edge="end" >
								<CancelIcon />
							</IconButton>
						</InputAdornment>
					}>
				</OutlinedInput>
			</FormControl>
		</Search>
	)
}