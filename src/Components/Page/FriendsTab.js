import { useEffect, useState } from "react";
import APIQuery from "../../API/APIQuery";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { Box, ListItemText } from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import InboxIcon from "@mui/icons-material/Inbox";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { createBrowserHistory } from "history";

/**
 * renders all the friends of a user
 * @param {currentUsername} param0 the current username
 * @returns html friend
 */
const FriendsTab = ({ currentUsername }) => {
	let history = createBrowserHistory();
	const [friends, setFriends] = useState([]);
	const [loading, setLoading] = useState(true);
	let navigate = useNavigate();
	const getAllFriends = async () => {
		const response = await APIQuery.get("/pages/friends/" + currentUsername, {
			headers: {
				Authorization: "Bearer " + localStorage.getItem("token"),
			},
		}).then((response) => response.data);
		setFriends(response);
		setLoading(false);
		return () => {
			setFriends({}); // This worked for me
			setLoading(false);
		};
	};

	useEffect(() => {
		getAllFriends();
	}, []);

	const goToFriendsPage = (id) => {
		console.log("going to" + id);
		navigate(`/user/${id}`);
		history.go();
		setLoading(true);
	};

	return (
		<>
			<ListItemButton>
				<ListItemIcon>
					<InboxIcon />
					<ListItemText primary="Friends" />
				</ListItemIcon>
			</ListItemButton>
			{loading ? (
				<>
					<h3>Loading...</h3>
				</>
			) : (
				""
			)}
			{!loading
				? friends.map((friend) => {
						return (
							<Box key={friend.userID}>
								<ListItemButton onClick={() => goToFriendsPage(friend.userID)}>
									<ListItemText primary={friend.displayName} />
									<ListItemText primary={friend.email} />
								</ListItemButton>
							</Box>
						);
				  })
				: ""}
		</>
	);
};

export default FriendsTab;
