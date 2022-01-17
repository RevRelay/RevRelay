import {
	Autocomplete,
	Avatar,
	Box,
	Button,
	Card,
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
} from "@mui/material";
import PageSetting from "./Page/PageSetting";
import Posts from "./Posts";
import CreateGroup from "./Group/CreateGroup";
import { useEffect, useState } from "react";
import APIQuery from "../app/api";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import FriendsTab from "./Page/FriendsTab";
import { ToastContainer, toast } from "react-toastify";
import { getProfilePic } from "../app/api";
import "react-toastify/dist/ReactToastify.css";
import getCurrentUser, {
	getGroupsByID,
	getPageAxios,
	getUserGroups,
} from "../API/PageAPI";
import { JWTs } from "../typeDef";
import { useSelector } from "react-redux";
import { selectToken, selectUserInfo } from "../app/userSlice";
import * as api from '../app/api';

/**
 * Renders a generic page with condintional rendering.
 *
 * @returns The default page for a user or group returned with React.
 */
export default function Page() {
	/**
	 * ---
	 */
	// TODO: React Hook useEffect has a missing dependency: 'page.username'. Either include it or remove the dependency array
	useEffect(getAllFriends, []);

	const currentUser = useSelector(selectUserInfo);

	const token = useSelector(selectToken);
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const [open2, setOpen2] = useState(false);
	const [page, updatePage] = useState({
		bannerURL: "https://i.imgur.com/0EtPsQK.jpeg",
		description: "You description here",
		groupPage: false,
		pageID: 1,
		posts: [],
		private: true,
		pageTitle: "Title Not Found",
	});
	const [isBusy, setIsBusy] = useState(true);
	const [groups, setGroups] = useState("");
	const [userGroups, setUserGroups] = useState({ content: [] });
	//const [currentUser, setCurrentUser] = useState(null);
	const [selectedGroup, setSelectedGroup] = useState(null);
	const [isReload, setIsReload] = useState(false);
	const [tab, updateTab] = useState("");
	const [friends, setFriends] = useState([]);
	const [group, setGroup] = useState(null);
	const { pageParam } = useParams();
	const [image, setImage] = useState(null);

	const path = useLocation();

	/**
	 * ---
	 */
	// TODO: React Hook useEffect has a missing dependency: 'GetPage'. Either include it or remove the dependency array
	useEffect(() => {
		setIsReload(false);
		GetPage();
		updateTab(0);
	}, [isReload]);

	/**
	 * ---
	 */
	const handleClose2 = () => {
		setOpen2(false);
	};

	/**
	 * ---
	 * @async
	 */
	const handleInvite = async () => {
		let currentSelectedGroup = userGroups.content.filter((x) => {
			return x.groupName == selectedGroup;
		})[0];
		let params = 
		{
			GroupID: userGroups.content.filter((x) => {
				return x.groupName === selectedGroup;
			})[0].groupID,
			UserID: page.userID,
		}
		await api.groupAddMember(params);
		//const response = await APIQuery.post("/groups/addmember", null, {
		//	headers: {
		//		Authorization: "Bearer " + token,
		//	},
		//	params: {
		//		GroupID: userGroups.content.filter((x) => {
		//			return x.groupName === selectedGroup;
		//		})[0].groupID,
		//		UserID: page.userID,
		//	},
		//}).then((response) => response.data);
		toast.success("Added User to Group!");

		GetPage();
		let tempGroups = [...groups];
		tempGroups.push(currentSelectedGroup);
		setGroups(tempGroups);
		setOpen2(false);
	};

	/**
	 * ---
	 * @param {Event} event ---
	 */
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	/**
	 * ---
	 */
	const handleClose = () => {
		setAnchorEl(null);
	};

	/**
	 * ---
	 * @async
	 */
	const handleCloseInviteToGroup = async () => {
		setOpen2(true);
	};

	/**
	 * ---
	 * @async
	 */
	const handleCloseToggleFriend = async () => {
		await api.friendToggle({params: {username: page.username}});
		//const response = await APIQuery.post("/users/friend", null, {
		//	headers: {
		//		Authorization: "Bearer " + token,
		//	},
		//	params: {
		//		username: page.username,
		//	},
		//}).then((response) => response.data);
		//toast.success("Friend added!");
		setAnchorEl(null);
	};

	/**
	 * ---
	 * @async
	 */
	const handleCloseJoinGroup = async () => {
		await api.groupJoin({params: {GroupID: page.groupID, UserID: currentUser.userID}});
		//const response = await APIQuery.post("/groups/addmember", null, {
		//	headers: {
		//		Authorization: "Bearer " + token,
		//	},
		//	params: {
		//		GroupID: page.groupID,
		//		UserID: currentUser.userID,
		//	},
		//}).then((response) => response.data);
		toast.success("Group Joined!");
		setAnchorEl(null);
	};

	/**
	 * ---
	 */
	const handleCloseStartChat = () => {
		setAnchorEl(null);
	};

	/**
	 * ---
	 * @async
	 */
	async function getCurrentGroup() {}

	/**
	 * Gets Page from back server
	 * @async
	 */
	async function GetPage() {
		setImage(getProfilePic(currentUser.userID));
		let apiPageUrl = "";
		if (path.pathname.includes("user/profile"))
			apiPageUrl = "/users/current";
		else if (path.pathname.includes("user"))
			apiPageUrl = "/users/" + pageParam;
		else apiPageUrl = "/groups/" + pageParam;

		getUserGroups(token, currentUser.userID).then((response) => {
			setUserGroups(response.data);
		});
		api.getPage(apiPageUrl).then(async (response) => {
			let id = -1;
			if (path.pathname.includes("user")) {
				id = response.data.userID;
				response.data.userPage.pageTitle = response.data.displayName + "'s Page!";
				response.data.userPage.userID = response.data.userID;
				response.data.userPage.username = response.data.username;
				response.data.userPage.displayName = response.data.displayName;
				updatePage(response.data.userPage);
				getGroupsByID(token, id).then((data) => {
					setGroups(data.data);
					setIsBusy(false);
				});
			} else {
				id = response.data.userOwnerID;
				response.data.groupPage.pageTitle =
				response.data.groupName + " is almost certainly a group page!";
				response.data.groupPage.userID = response.data.userOwnerID;
				response.data.groupPage.groupID = response.data.groupID;
				updatePage(response.data.groupPage);

				apiPageUrl = "/groups/" + pageParam;

				getPageAxios(token, apiPageUrl).then(async (data) => {
					setGroup(data.data);
					setIsBusy(false);
				});
			}
		});
		;
	}

	/**
	 * ---
	 * @async
	 * @returns ---
	 */
	// TODO: Effect callbacks are synchronous to prevent race conditions. Put the async function inside:
	async function getAllFriends() {
		if (!page.username) return;
		const response = await api.friendGetAllByUsername(page.username);
		let arr = response.data.map((f) => f.userID);
		setFriends(arr);
		return () => {
			setFriends({}); // This worked for me
		};
	}
	if (isBusy) return <LoadingPage />;
	if (page.groupPage) {
		if (page.private && page.userID != currentUser.userID) {
			if (!group.members.map((m) => m.userID).includes(currentUser.userID))
				return <Private />;
		}
	} else {
		if (page.private && page.userID != currentUser.userID) {
			if (!friends.includes(currentUser.userID)) return <Private />;
		}
	}

	return (
		<>
			{isBusy ? (
				<LoadingPage />
			) : (
				<Box sx={{ height: "80%" }}>
					<Box
						sx={{
							border: 1,
							borderColor: "primary.main",
							borderRadius: 2,
							borderWidth: 2,
							marginLeft: "15%",
							marginRight: "15%",
							display: "flex",
							minHeight: "75vh",
							maxHeight: "80vh",

							maxWidth: "100%",
							minWidth: 500,
						}}
					>
						<div
							style={{
								minHeight: "100%",
								flexGrow: 1,
								display: "flex",
								flexFlow: "column",
							}}
						>
							<Card
								sx={{
									minHeight: "10vh",
									maxHeight: "25vh",
									maxWidth: "100%",
								}}
							>
								<div
									style={{
										position: "absolute",
										marginLeft: 10,
										marginTop: 10,
										minWidth: 100,
										borderRadius: 25,
									}}
								>
									<CardHeader
										title={page.pageTitle}
										sx={{
											color: "palette.text.primary",
										}}
									/>
									<Avatar
										alt="Pidgeon"
										src={image}
										sx={{ width: 190, height: 190 }}
									/>
								</div>
								<CardMedia
									style={{ objectPosition: "0 0", zIndex: 0 }}
									component="img"
									image={page.bannerURL}
									alt="green iguana"
								/>
							</Card>
							<div
								style={{
									flexGrow: 1,
									position: "relative",
									width: "100%",
									alignItems: "center",
									justifyContent: "center",
									overflow: "hidden",
								}}
							>
								<Stack
									direction="row"
									sx={{
										flexGrow: 1,
										position: "relative",
										width: "100%",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<Tabs
										aria-label="basic tabs example"
										centered
										value={tab}
										onChange={(x, n) => {
											updateTab(n);
										}}
									>
										<Tab label="Posts" />
										<Tab label="About" />
										{page.groupPage ? (
											<Tab label="Members" />
										) : (
											<Tab label="Friends" />
										)}
										{!page.groupPage && <Tab label="Groups" />}
										{currentUser.userID === page.userID ? (
											<Tab label="Settings" />
										) : (
											""
										)}
									</Tabs>

									<div>
										{currentUser.userID !== page.userID ? (
											<>
												<Button
													id="basic-button"
													aria-controls={open ? "basic-menu" : undefined}
													aria-haspopup="true"
													aria-expanded={open ? "true" : undefined}
													onClick={handleClick}
												>
													Options
												</Button>
												<Menu
													id="basic-menu"
													anchorEl={anchorEl}
													open={open}
													onClose={handleClose}
													MenuListProps={{
														"aria-labelledby": "basic-button",
													}}
												>
													{page.groupPage ? (
														<MenuItem onClick={handleCloseJoinGroup}>
															Join Group
														</MenuItem>
													) : (
														<MenuItem onClick={handleCloseToggleFriend}>
															Add Friend
														</MenuItem>
													)}
													{page.groupPage ? (
														""
													) : (
														<MenuItem onClick={handleCloseInviteToGroup}>
															Invite to group
														</MenuItem>
													)}
													<MenuItem onClick={handleClose}>Chat</MenuItem>
												</Menu>
											</>
										) : (
											""
										)}
									</div>
								</Stack>
								<Divider sx={{ width: "100%" }} />
								<RenderTab />
							</div>
						</div>
					</Box>
					<Dialog open={open2} onClose={handleClose2}>
						<DialogTitle>Send a Group Invite</DialogTitle>
						<DialogContent>
							<Autocomplete
								disablePortal
								id="combo-box-demo"
								options={[
									...userGroups.content
										.filter((group) => {
											if (groups.content) {
												for (let currentGroup of groups.content) {
													if (group.groupID === currentGroup.groupID) {
														return false;
													}
												}
												return true;
											}
										})
										.map((group) => {
											return group.groupName + "";
										}),
								]}
								onChange={(e, val) => {
									setSelectedGroup(val);
								}}
								sx={{ margin: 5, width: 300, height: 200 }}
								ListboxProps={{ style: { maxHeight: "150px" } }}
								renderInput={(params) => (
									<TextField {...params} label="Your Groups" />
								)}
							/>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleClose2}>Cancel</Button>
							<Button onClick={handleInvite}>Send</Button>
						</DialogActions>
					</Dialog>
					<ToastContainer />
				</Box>
			)}
		</>
	);

	/**
	 * Gets tab from state and renders current tab
	 *
	 * @returns Current Tab
	 */
	function RenderTab() {
		switch (tab) {
			case 0:
				return (
					<Posts page={page} currentUser={currentUser} JWT={token} />
				);
			case 1:
				return <About />;
			case 2:
				return (
					<>
						{page.groupPage ? (
							<Members />
						) : (
							<FriendsTab username={page.username} displayName={page.displayName} />
						)}{" "}
					</>
				);
			case 3:
				return (
					<>
						{page.groupPage ? (
							<PageSetting
								page={page}
								updatePage={updatePage}
								setIsReload={setIsReload}
							/>
						) : (
							<Groups />
						)}{" "}
					</>
				);
			case 4:
				return (
					<>
						{page.groupPage ? (
							<></>
						) : (
							<PageSetting
								page={page}
								updatePage={updatePage}
								setIsReload={setIsReload}
							/>
						)}{" "}
					</>
				);
			default:
				break;
		}
	}
	function LoadingPage() {
		return (
			<>
				<Grid
					container
					spacing={0}
					direction="column"
					alignItems="center"
					justifyContent="center"
					style={{ minHeight: "80vh" }}
				>
					<Grid item xs={3}>
						<Typography>Loading...</Typography>
					</Grid>
					<Grid item xs={3}>
						<CircularProgress />
					</Grid>
				</Grid>
			</>
		);
	}

	/**
	 * Placeholder for About
	 *
	 * @returns ---
	 */
	function About() {
		return <Typography>{page.description}</Typography>;
	}

	/**
	 * ---
	 *
	 * @returns ---
	 */
	function Private() {
		return <Typography>This page is private!</Typography>;
	}

	/**
	 * Placeholder for Members
	 *
	 * @returns ---
	 */
	function Members() {
		let nav = useNavigate();
		return (
			<>
				{group.members.map((member) => (
					<Button
						key={"member"+member.userID}
						onKeyUp={member.userID}
						onClick={() => {
							nav("/user/" + member.userID);
						}}
					>
						{member.displayName}
					</Button>
				))}
			</>
		);
	}

	/**
	 * Placeholder for Settings
	 *
	 * @returns ---
	 */
	function Settings() {
		return <div></div>;
	}

	/**
	 * Placeholder for Groups
	 *
	 * @returns ---
	 */
	function Groups() {
		let navigate = useNavigate();

		let axiosConfig = {
			headers: {
				Authorization: "Bearer " + token,
			},
		};

		/**
		 * ---
		 * @param {String} groupID ---
		 */
		const goToGroup = (groupID) => {
			navigate("/group/" + groupID);
		};

		/**
		 * ---
		 * @async
		 * @param {String} groupID ---
		 */
		const deleteGroup = async (groupID) => {
			await APIQuery.delete("/groups/" + groupID, axiosConfig).catch((e) => {}); //since this is attached to a group component, we're guaranteed that it exists to delete it
			//update front end
			let tempGroups = groups;
			tempGroups.content = groups.content.filter((e) => {
				return e.groupID !== groupID;
			});
			setGroups({ ...tempGroups });
		};

		return (
			<>
				{groups.content.map((group) => {
					return (
						<Paper key={group.groupID} sx={{ marginBottom: 3 }} elevation={3}>
							<Typography>{group.groupName}</Typography>
							<Button
								onClick={() => goToGroup(group.groupID)}
								variant="outlined"
							>
								Go to Group
							</Button>
							{group.userOwnerID === currentUser.userID ? (
								<Button
									onClick={() => deleteGroup(group.groupID)}
									variant="outlined"
								>
									Delete Group
								</Button>
							) : (
								""
							)}
						</Paper>
					);
				})}
				<br />
				<br />
				{page.userID === currentUser.userID ? (
					<CreateGroup
						JWT={token}
						groups={groups}
						setGroups={setGroups}
					/>
				) : (
					""
				)}
			</>
		);
	}
}
