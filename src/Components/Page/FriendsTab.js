import { useEffect, useState } from "react";
import APIQuery from "../../API/APIQuery";
import ListItemButton from "@mui/material/ListItemButton";
import { Box, ListItemText } from "@mui/material";
import { useNavigate} from "react-router-dom";
import { createBrowserHistory } from "history";
import { FriendsTabs, Friend, SetStateActionFriends } from "../../typeDef";

/**
 * renders all the friends of a user and provides links to their pages
 * @param {FriendsTabs}	tabProp						The Array for a prop object that just conatins the username for a user.
 * @param {String}		tabProp.currentUsername		The current username of a user.
 * @returns html friend
 */
const FriendsTab = (tabProp) => {
	let history = createBrowserHistory();

	/**
	 * @type {[Friend[], SetStateActionFriends]}
	 */
	const [friends, setFriends] = useState('');
	const [loading, setLoading] = useState(true)
	let navigate = useNavigate();

	/**
	 * ---
	 * 
	 * @async
	 * @returns ---
	 */
	const getAllFriends = async () => {
		const response = await APIQuery.get("/pages/friends/" + tabProp.currentUsername, {
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

	/**
	 * ---
	 */
	useEffect(() => {
		getAllFriends();
	}, []);

	/**
	 * ---
	 * @param {String} id ---
	 */
	const goToFriendsPage = (id) => {
		console.log("going to" + id);
		navigate(`/user/${id}`);
		history.go();
		setLoading(true);
	};

	return (
		<>
			{loading ? (
				<>
					<h3>Loading...</h3>
				</>
		) : (
			""
		)}
		{!loading && !friends ? <h3>You have no friends yet!</h3> : ''}
		{!loading 
			? friends.map((friend) => {
				return (
				<Box key={friend.userID}>
					<ListItemButton onClick={() => goToFriendsPage(friend.userID)}>
						<ListItemText primary={friend.displayName} />
					</ListItemButton>
				</Box>
				);
			})
			: ""}
		</>
	);
};

export default FriendsTab;
