import { createTheme } from "@mui/material";
import { Theme } from "@mui/system";
//import getCurrentUser from "./API/PageAPI.js";
//import getAllFriends from "./API/friendsAPI.js";

/**
 * Array of all possible themes.
 * @param {String} 	name 	Name to call the theme.
 * @param {Theme}	theme	The palate for the theme.
 * 		- Palate:
 * 			- Mode: 			Dark - Sets theme to the dark mode color palate (https://mui.com/customization/dark-mode/)
 * 			- Primary:			Used to represent primary interface elements for a user. It's the color displayed most frequently across your app's screens and components.
 * 				- Main: 		Navbar
 * 			- Secondary:		Used to represent secondary interface elements for a user. It provides more ways to accent and distinguish your product.
 * 				- Main:
 * 			- Backgroud:
 * 				- Paper:		SideBar background, and User Settings background
 * 				- Default:		Overall Page Background
 * 			- Text:
 * 				- Primary:
 * 				- Secondary:
 * 				- Disabled:
 * 				- Hint:
 */
 const themes = [
	{
		name: "Default",
		theme: createTheme({}),
	},
	{
		name: "Dark",
		theme: createTheme({
			palette: { mode: "dark" },
			typography: {
				allVariants: {
					color: "lightgrey",
				},
			},
		}),
	},
	{
		name: "RevRelay",
		theme: createTheme({
			palette: {
				primary: {
					main: "#E55C18",
				},
				secondary: {
					main: "#72A4C2",
				},
				background: {
					paper: "#FCB414",
					default: "#72A4C2",
				},
			},
		}),
	},
	{
		name: "Vaporwave",
		theme: createTheme({
			palette: {
				primary: {
					main: "#E93479",
				},
				secondary: {
					main: "#b5179e",
				},
				background: {
					paper: "#65B8BF",
					default: "#4A1D6A",
				},
				text: {
					primary: "#FFFFFF",
					secondary: "#F9ac53",
					disabled: "#FFFFFF",
					hint: "#FFFFFF",
				},
			},
			typography: {
				allVariants: {
					color: "palette.text.secondary",
				},
			},
		}),
	},
	{
		name: "80s",
		theme: createTheme({
			palette: {
				primary: {
					main: "#A6206A",
				},
				secondary: {
					main: "#EC1C4B",
				},
				background: {
					paper: "#F16A43",
					default: "#379B9D",
				},
				text: {
					primary: "#FFFFFF",
					secondary: "#FFFFFF",
					disabled: "#FFFFFF",
					hint: "#FFFFFF",
				},
			},
			typography: {
				allVariants: {
					color: "palette.text.secondary",
				},
			},
		}),
	},
	// Hex Codes: #F08D7E | #EFA18A | #E2BAB1 | #DDA6B9 | #ACAEC5.
	{
		name: "Cloud",
		theme: createTheme({
			palette: {
				primary: {
					main: "#FEC7BC",
				},
				secondary: {
					main: "#7b7ea3",
				},
				background: {
					paper: "#C5AFC1",
					default: "#84A6D6",
				},
				text: {
					primary: "#FFFFFF",
					secondary: "#FFFFFF",
					disabled: "#FFFFFF",
					hint: "#FFFFFF",
				},
			},
			typography: {
				allVariants: {
					color: "palette.text.secondary",
				},
			},
		}),
	},
	{
		name: "Kawaii",
		theme: createTheme({
			palette: {
				primary: {
					main: "#E6C6FF",
				},
				secondary: {
					main: "#97C8E6",
				},
				background: {
					paper: "#DEFFFA",
					default: "#B0E1FF",
				},
				text: {
					primary: "#000000",
					secondary: "#708aa3",
					disabled: "#000000",
					hint: "#000000",
				},
			},
			typography: {
				allVariants: {
					color: "palette.text.secondary",
				},
			},
		}),
	},
	{
		name: "Cyberpunk",
		theme: createTheme({
			palette: {
				primary: {
					main: "#E68E36",
				},
				secondary: {
					main: "#556DC8",
				},
				background: {
					paper: "#DD517F",
					default: "#461E52",
				},
				text: {
					primary: "#D3D3D3",
					secondary: "#D3D3D3",
					disabled: "#ffffff",
					hint: "#ffffff",
				},
			},
			typography: {
				allVariants: {
					color: "palette.text.secondary",
				},
			},
		}),
	},
	//Hex Codes: #674AB3 | #A348A6 | #9F63C4 | #9075D8 | #CEA2D7.
	{
		name: "Lofi",
		theme: createTheme({
			palette: {
				primary: {
					main: "#DD9999",
				},
				secondary: {
					main: "#cea2d7",
				},
				background: {
					paper: "#556696",
					default: "#332244",
				},
				text: {
					primary: "#FFFFFF",
					secondary: "#FFFFFF",
					disabled: "#FFFFFF",
					hint: "#FFFFFF",
				},
			},
			typography: {
				allVariants: {
					color: "palette.text.secondary",
				},
			},
		}),
	},
	{
		name: "Outrun",
		theme: createTheme({
			palette: {
				primary: {
					main: "#EA6789",
				},
				secondary: {
					main: "#362fbb",
				},
				background: {
					paper: "#FFB845",
					default: "#453ECA",
				},
				text: {
					primary: "#000000",
					secondary: "#000000",
					disabled: "#000000",
					hint: "#000000",
				},
			},
			typography: {
				allVariants: {
					color: "palette.text.secondary",
				},
			},
		}),
	},
];

export default themes;