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
	Typography

} from "@mui/material";
import PageSetting from "./Page/PageSetting";
import Posts from "./Posts";
import CreateGroup from "./Group/CreateGroup";
import { useEffect, useState } from "react";
import APIQuery from "../API/APIQuery";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import FriendsTab from "./Page/FriendsTab";
import { ToastContainer, toast } from "react-toastify";
import { getProfilePic } from "../API/UserAPI";
import PublicIcon from '@mui/icons-material/Public';
import PublicOffIcon from '@mui/icons-material/PublicOff';
import SendIcon from '@mui/icons-material/Send';
import "react-toastify/dist/ReactToastify.css";
import getCurrentUser, {
	getGroupsByID,
	getPageAxios,
	getUserGroups,
} from "../API/PageAPI";
import { JWTs } from "../typeDef";
import { alpha } from "@mui/material";
import { styled } from "@mui/material/styles";


/**
 * Renders a generic page with condintional rendering.
 *
 * @param {JWTs} 	pageProp		The Array for an object that just contains a JWT
 * @param {string} 	pageProp.token 	Token determining user and log in information.
 * @returns The default page for a user or group returned with React.
 */
export default function Page(pageProp) {
	/**
	 * ---
	 */
	// TODO: React Hook useEffect has a missing dependency: 'page.username'. Either include it or remove the dependency array
	useEffect(getAllFriends, []);

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
	const [currentUser, setCurrentUser] = useState(null);
	const [selectedGroup, setSelectedGroup] = useState(null);
	const [isReload, setIsReload] = useState(false);
	const [tab, updateTab] = useState("");
	const [friends, setFriends] = useState([]);
	const [group, setGroup] = useState(null);
	const { pageParam } = useParams();
	const [image, setImage] = useState(null);

	const path = useLocation();

	const Title = styled(CardHeader)(({ theme }) => ({
		backgroundColor: alpha(theme.palette.background.paper, 0.5),
	}));

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
		const response = await APIQuery.post("/groups/addmember", null, {
			headers: {
				Authorization: "Bearer " + pageProp.token,
			},
			params: {
				GroupID: userGroups.content.filter((x) => {
					return x.groupName === selectedGroup;
				})[0].groupID,
				UserID: page.userID,
			},
		}).then((response) => response.data);
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
		const response = await APIQuery.post("/users/friend", null, {
			headers: {
				Authorization: "Bearer " + pageProp.token,
			},
			params: {
				username: page.username,
			},
		}).then((response) => response.data);
		//toast.success("Friend added!");
		setAnchorEl(null);
	};

	/**
	 * ---
	 * @async
	 */
	const handleCloseJoinGroup = async () => {
		const response = await APIQuery.post("/groups/addmember", null, {
			headers: {
				Authorization: "Bearer " + pageProp.token,
			},
			params: {
				GroupID: page.groupID,
				UserID: currentUser.userID,
			},
		}).then((response) => response.data);
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
	async function getCurrentGroup() { }

	/**
	 * Gets Page from back server
	 * @async
	 */
	async function GetPage() {
		getCurrentUser(pageProp.token).then(async (data) => {
			let user = data.data;
			setCurrentUser(user);
			setImage(getProfilePic(user.userID));
			let apiRegisterUrl = "";
			if (path.pathname.includes("user/profile"))
				apiRegisterUrl = "/users/current";
			else if (path.pathname.includes("user"))
				apiRegisterUrl = "/users/" + pageParam;
			else apiRegisterUrl = "/groups/" + pageParam;

			getUserGroups(pageProp.token, data.data.userID).then((data) => {
				setUserGroups(data.data);
			});

			getPageAxios(pageProp.token, apiRegisterUrl).then(async (data) => {
				let id = -1;
				if (path.pathname.includes("user")) {
					id = data.data.userID;
					data.data.userPage.pageTitle = data.data.displayName + "'s Page!";
					data.data.userPage.userID = data.data.userID;
					data.data.userPage.username = data.data.username;
					data.data.userPage.displayName = data.data.displayName;
					updatePage(data.data.userPage);
					getGroupsByID(pageProp.token, id).then((data) => {
						setGroups(data.data);
						setIsBusy(false);
					});
				} else {
					id = data.data.userOwnerID;
					data.data.groupPage.pageTitle = data.data.groupName;
					data.data.groupPage.userID = data.data.userOwnerID;
					data.data.groupPage.groupID = data.data.groupID;
					data.data.groupPage.isGroupPage = true;
					updatePage(data.data.groupPage);

					apiRegisterUrl = "/groups/" + pageParam;

					getPageAxios(pageProp.token, apiRegisterUrl).then(async (data) => {
						setGroup(data.data);
						setIsBusy(false);
					});
				}
			});
		});
	}

	/**
	 * ---
	 * @async
	 * @returns ---
	 */
	// TODO: Effect callbacks are synchronous to prevent race conditions. Put the async function inside:
	async function getAllFriends() {
		if (!page.username) return;
		const response = await APIQuery.get("/pages/friends/" + page.username, {
			headers: {
				Authorization: "Bearer " + localStorage.getItem("token"),
			},
		}).then((response) => response.data);
		let arr = response.map((f) => f.userID);
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
	console.log(page.isGroupPage);
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
						<Box
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
								<Box
									style={{
										position: "absolute",
										marginLeft: 10,
										marginTop: 10,
										minWidth: 100,
										borderRadius: 25,
									}}
								>
									<Title
										titleTypographyProps={{ variant: "h4" }}
										title={page.pageTitle}
										sx={{ borderRadius: 2 }}
									/>
									<Avatar
										alt="Pidgeon"
										src={image}
										sx={{ width: 190, height: 190 }}
									/>

								</Box >
								<CardMedia
									style={{ objectPosition: "0 0", zIndex: 0 }}
									component="img"
									image={page.bannerURL}
									alt="green iguana"
								/>
							</Card >

							<Box >

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
										{page.isGroupPage ? (
											<Tab label="Members" />
										) : (
											<Tab label="Friends" />
										)}
										{!page.isGroupPage && <Tab label="Groups" />}

										{currentUser.userID === page.userID ? (
											<Tab label="Settings" />
										) : (
											""
										)}

									</Tabs>

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
												{page.isGroupPage ? (
													<MenuItem onClick={handleCloseJoinGroup}>
														Join Group
													</MenuItem>
												) : (
													<MenuItem onClick={handleCloseToggleFriend}>
														Add Friend
													</MenuItem>
												)}
												{page.isGroupPage ? (
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
								</Stack>
							</Box>
							<Divider sx={{ width: "100%" }} />
							<RenderTab />


						</Box >
					</Box >
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
				</Box >
			)
			}
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
					<Posts page={page} currentUser={currentUser} JWT={pageProp.token} />
				);
			case 1:
				return <About />
			case 2:
				return (
					<>
						{page.isGroupPage ? (
							<Members />
						) : (
							<FriendsTab currentUsername={page.username} />
						)}{" "}
					</>
				);
			case 3:
				return (
					<>
						{page.isGroupPage ? (
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
						{page.isGroupPage ? (
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
		return (
			<Box sx={{ width: "100%", pt: "2%" }}>
				<Card sx={{ mx: "auto", width: "40%", minWidth: 300 }}>
					{page.isGroupPage ? (
						<CardHeader
							title="About this group"
						/>
					) : (
						<CardHeader
							title={"About " + page.displayName}
						/>
					)}

					<Divider sx={{ mx: "auto", width: "95%" }} />

					<CardContent>

						<Typography>
							{page.description}
							{page.private}
						</Typography>
						<br />
						{page.private ? (
							<Stack direction="row">
								<PublicOffIcon sx={{ mt: "3px", mr: "8px" }} />
								<Typography sx={{ fontWeight: "bold", fontSize: 22 }}>
									Private
								</Typography>
							</Stack>
						) : (
							<Stack direction="row">
								<PublicIcon sx={{ mt: "3px", mr: "8px" }} />
								<Typography sx={{ fontWeight: "bold", fontSize: 22 }}>
									Public
								</Typography>
							</Stack>
						)}
					</CardContent>
				</Card>
			</Box>
		)
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
		return <Box></Box>;
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
				Authorization: "Bearer " + pageProp.token,
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
			await APIQuery.delete("/groups/" + groupID, axiosConfig).catch((e) => { }); //since this is attached to a group component, we're guaranteed that it exists to delete it
			//update front end
			let tempGroups = groups;
			tempGroups.content = groups.content.filter((e) => {
				return e.groupID !== groupID;
			});
			setGroups({ ...tempGroups });
		};

		console.log(groups.content);
		return (
			<>
				<Box sx={{ width: "100%", pt: "2%" }}>
					<Card sx={{ mx: "auto", width: "40%", minWidth: 300 }}>
						<CardHeader
							title={page.displayName + "'s Groups"}
						/>
						<Divider sx={{ mx: "auto", width: "95%" }} />

						<CardContent>
							{groups.content.map((group) => {
								return (
									<Box  >
										<Button sx={{ mt: 1, mb: 1 }} variant="outlined" onClick={goToGroup(group.groupID)} endIcon={<SendIcon />}>
											<Typography>
												{group.groupName}
											</Typography>
										</Button>
									</Box>
								);
							})
							}
						</CardContent>
					</Card>
				</Box>
				<br />
				<br />
				{
					page.userID === currentUser.userID ? (
						<CreateGroup
							JWT={pageProp.token}
							groups={groups}
							setGroups={setGroups}
						/>
					) : (
						""
					)
				}
			</>
		);
	}
}
