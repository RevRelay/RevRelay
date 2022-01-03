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
    TextField
} from "@mui/material";
import React, { useState } from "react";
import { styled, alpha } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import ClearIcon from '@mui/icons-material/Clear';
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import APIQuery from '../../API/APIQuery.js';

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
//     color: 'inherit',
//     '& .MuiInputBase-input': {
//         padding: theme.spacing(1, 1, 1, 0),
//         // vertical padding + font size from searchIcon
//         paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//         transition: theme.transitions.create('width'),
//         width: '100%',
//         [theme.breakpoints.up('md')]: {
//         width: '20ch',
//         },
//     },
// }));

export default function NavSearchBar () {
    const [searchInput, setSearchInput] = useState('')
    const handleChangeSearchBar = (event) => {
        setSearchInput({searchInputTerm: event.target.value});
    }

    const handleClearSearchBar = (event) => {
        event.target.value = '';
        setSearchInput(event.target.value);
    }

    const handleSearchSubmit = (event) => {
        //do search submission, redirect to results page.
    };

    let searchOptions = ['test'];
    
    return (
        <Search>
            <Autocomplete 
                // freeSolo
                id='search-bar-autocomplete'
                options={searchOptions.map((option) => option)}
                renderInput={(params) => 
                    <TextField 
                        {...params}
                        id="searchbar-text-field"
                        sx={{display:'flex'}} onChange={handleChangeSearchBar}
                        filterOptions={(x) => x}
                        InputProps={{
                            ...params.InputProps,
                            startAdornment:
                                <InputAdornment position="start">
                                    <IconButton onClick={handleSearchSubmit} edge="end" >
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            }
                        }
                    />
                }
            />
        </Search>
    )
    
}