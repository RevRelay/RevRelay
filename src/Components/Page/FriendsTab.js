import {
	Autocomplete,
	Avatar,
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	CardMedia,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	Grid,
	Menu,
	MenuItem,
	Paper,
	Stack,
	Tab,
	Tabs,
	TextField,
	Typography,
	ListItemText,
} from "@mui/material";
import { useEffect, useState } from "react";
import APIQuery from "../../API/APIQuery";
import ListItemButton from "@mui/material/ListItemButton";
import { useNavigate } from "react-router-dom";
import { createBrowserHistory } from "history";
import { FriendsTabs, Friend, SetStateActionFriends } from "../../typeDef";

/**
 * renders all the friends of a user and provides links to their pages
 * @param {FriendsTabs}	tabProp						The Array for a prop object that just conatins the username for a user.
 * @param {String}		tabProp.page.username		The current username of a user.
 * @returns html friend
 */
const FriendsTab = (tabProp) => {
	let history = createBrowserHistory();

	/**
	 * @type {[Friend[], SetStateActionFriends]}
	 */
	const [friends, setFriends] = useState("");
	const [loading, setLoading] = useState(true);
	let navigate = useNavigate();

	/**
	 * ---
	 *
	 * @async
	 * @returns ---
	 */
	const getAllFriends = async () => {
		let running = true;
		const response = await APIQuery.get(
			"/pages/friends/" + tabProp.page.username,
			{
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			}
		).then((response) => response.data);
		if (!running) return;
		setFriends(response);
		setLoading(false);
		return () => {
			running = false;
		};
	};

	/**
	 * ---
	 */
	// TODO: React Hook useEffect has a missing dependency: 'getAllFriends'. Either include it or remove the dependency array
	useEffect(() => {
		getAllFriends();
	}, []);

	/**
	 * ---
	 * @param {String} id ---
	 */
	const goToFriendsPage = (id) => {
		//console.log("going to" + id);
		navigate(`/user/${id}`);
		history.go();
		setLoading(true);
	};

	return (
		<Box sx={{ width: "100%", mt: 2 }}>
			<Card sx={{ mx: "auto", width: "50%", minWidth: 300 }}>
				<CardHeader
					title={tabProp.page.displayName + "'s Friends · " + friends.length}
				/>
				<Divider sx={{ mx: "auto", width: "95%" }} />

				<CardContent>
					{loading ? (
						<>
							<h3>Loading...</h3>
						</>
					) : (
						""
					)}
					{!loading && !friends ? <h3>You have no friends yet!</h3> : ""}
					{!loading
						? friends.map((friend) => {
								return (
									<Box key={friend.userID}>
										<ListItemButton
											onClick={() => goToFriendsPage(friend.userID)}
										>
											<Typography sx={{ fontSize: 18 }}>
												{friend.displayName + ""}
											</Typography>
										</ListItemButton>
									</Box>
								);
						  })
						: ""}
				</CardContent>
			</Card>
		</Box>
	);
};

export default FriendsTab;
