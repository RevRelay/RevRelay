import React, { useState } from "react";
import {
	Autocomplete,
	Button,
	Card,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import "./styles/themes.css";
//https://gridfiti.com/aesthetic-color-palettes/
//#461E52 | #DD517F | #E68E36 | #556DC8 | #7998EE.

//https://mui.com/components/autocomplete/
const themes = [
	"Vaporwave",
	"Synthwave",
	"Outrun",
	"Lofi",
	"Kawaii",
	"Cyberpunk",
	"Cloud",
	"80s",
	"90s",
];

function Color(cid, theme) {
	return "var( --" + cid + "-" + themes[theme] + ")";
}

function App() {
	const [theme, updateTheme] = useState(0);

	return (
		<>
			<div className="App">
				<InputLabel id="demo-simple-select-label">Age</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					label="Theme"
					defaultValue={0}
					onChange={(x) => {
						updateTheme(x.target.value);
					}}
				>
					{themes.map((x) => {
						return (
							<MenuItem key={themes.indexOf(x)} value={themes.indexOf(x)}>
								{x}
							</MenuItem>
						);
					})}
				</Select>
				<Button>hello</Button>
			</div>
			<div>
				<Card
					sx={{ minWidth: "20%", maxWidth: 300, minHeight: 500 }}
					style={{
						backgroundColor: Color(1, theme),
						display: "inline-block",
					}}
				>
					1
				</Card>
				<Card
					sx={{ minWidth: "20%", maxWidth: 300, minHeight: 500 }}
					style={{
						backgroundColor: Color(2, theme),
						display: "inline-block",
					}}
				>
					2
				</Card>
				<Card
					sx={{ minWidth: "20%", maxWidth: 300, minHeight: 500 }}
					style={{
						backgroundColor: Color(3, theme),
						display: "inline-block",
					}}
				>
					3
				</Card>
				<Card
					sx={{ minWidth: "20%", maxWidth: 300, minHeight: 500 }}
					style={{
						backgroundColor: Color(4, theme),
						display: "inline-block",
					}}
				>
					4
				</Card>
				<Card
					sx={{ minWidth: "20%", maxWidth: 300, minHeight: 500 }}
					style={{
						backgroundColor: Color(5, theme),
						display: "inline-block",
					}}
				>
					5
				</Card>
			</div>
		</>
	);
}

export default App;
