import { Button, Typography, Stack, CardHeader } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LoginIcon from "@mui/icons-material/Login";
import React from "react";
import { useNavigate } from "react-router-dom";
import { JWTs } from "../../typeDef";
import { useSelector } from "react-redux";
import { selectJWT } from "../NoAuth/jwtSlice";

/**
 * ---
 */
const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: "center",
	color: theme.palette.text.secondary,
}));

/**
 * ---
 *
 * @returns ---
 */
export default function Home() {
	let navigate = useNavigate();
	const token = useSelector(selectJWT)

	return token ? (
		<>{navigate("/user/profile")}</>
	) : (
		<>

			<Stack direction="row" spacing={15} justifyContent="center">
				<Typography variant="h1"> Welcome to RevRelay</Typography>
			</Stack>

			<br></br>
			<Stack direction="row" spacing={15} justifyContent="center">


				<Item key="Login">
					<Typography> Returning User</Typography>
					<br></br>
					<Button
						onClick={(x) => navigate("/login")}
						primary="login"
						startIcon={<LoginIcon />}
					>
						{" "}
						Login{" "}
					</Button>
				</Item>
				<Item key="Register">
					<Typography> New User </Typography>
					<br></br>
					<Button
						onClick={(x) => navigate("/register")}
						primary="register"
						startIcon={<HowToRegIcon />}
					>
						{" "}
						Register{" "}
					</Button>
				</Item>
			</Stack>
		</>
	);
}
