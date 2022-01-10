import {
	Autocomplete,
	Box,
	Button,
	Card,
	CardHeader,
	CardMedia,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Divider,
	Fade,
	Grid,
	IconButton,
	Menu,
	MenuItem,
	Pagination,
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
import { height, maxHeight, width } from "@mui/system";
import { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import APIQuery from "../API/APIQuery";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import FriendsTab from "./Page/FriendsTab";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getCurrentUser, {
	getGroupsByID,
	getPageAxios,
	getUserGroups,
} from "../API/PageAPI";
import { ComponentsProps } from "@mui/material/styles";

/**
 * Renders a generic page with condintional rendering
 *
 * @param {object} param
 * @param {string} param.JWT token determining user and log in information.
 * @returns HTML for default page
 */
export default function Page({ JWT }) {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const [open2, setOpen2] = useState(false);

	const [isBusy, setIsBusy] = useState(true);
	const [groups, setGroups] = useState(true);
	const [userGroups, setUserGroups] = useState({ content: [] });
	const [currentUser, setCurrentUser] = useState(null);
	const [selectedGroup, setSelectedGroup] = useState(null);
	const [reload, setReload] = useState(false);
	const [tab, updateTab] = useState(0);

	const handleClose2 = () => {
		setOpen2(false);
	};

	const handleInvite = async () => {
		console.log("Sending Invite");
		const response = await APIQuery.post("/groups/addmember", null, {
			headers: {
				Authorization: "Bearer " + JWT,
			},
			params: {
				GroupID: userGroups.content.filter((x) => {
					return x.groupName == selectedGroup;
				})[0].groupID,
				UserID: page.userID,
			},
		}).then((response) => response.data);
		toast.success("Added User to Group!");
		let currentSelectedGroup = userGroups.content.filter((x) => {
			return x.groupName == selectedGroup;
		})[0];

		GetPage();
		// let tempGroups = { ...groups };
		// tempGroups.push(currentSelectedGroup);
		// console.log(tempGroups);
		// setGroups(tempGroups);
		setOpen2(false);
	};

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleCloseInviteToGroup = async () => {
		setOpen2(true);
	};
	//ADD add friend logic here

	const handleCloseAddFriend = async () => {
		const response = await APIQuery.post(
			"/users/addFriend/" + currentUser.userID,
			null,
			{
				headers: {
					Authorization: "Bearer " + JWT,
				},
				params: {
					username: page.username,
				},
			}
		).then((response) => response.data);
		toast.success("Friend added!");
		console.log(response);
		setAnchorEl(null);
	};

	//ADD add join group logic here
	const handleCloseJoinGroup = async () => {
		const response = await APIQuery.post("/groups/addmember", null, {
			headers: {
				Authorization: "Bearer " + JWT,
			},
			params: {
				GroupID: page.groupID,
				UserID: currentUser.userID,
			},
		}).then((response) => response.data);
		toast.success("Group Joined!");
		console.log(response);
		setAnchorEl(null);
	};
	//ADD start Chat Logic Here
	const handleCloseStartChat = () => {
		setAnchorEl(null);
	};

	let { pageParam } = useParams();
	let path = useLocation();

	const [page, updatePage] = useState({
		bannerURL: "https://i.imgur.com/0EtPsQK.jpeg",
		description: "You description here",
		groupPage: false,
		pageID: 1,
		posts: [],
		private: true,
		pageTitle: "Title Not Found",
	});

	// const currnetUser = {
	// 	page: { userOwnerID: 0 },
	// };

	useEffect(() => {
		setReload(false);
		GetPage();
		//updateTab(0);
	}, [reload]);

	/**
	 * Gets Page from back server
	 * @async
	 */
	const [group, setGroup] = useState(null);

	/**
	 * @async
	 */
	async function getCurrentGroup() { }

	/**
	 * Gets Page from back server
	 * @async
	 */
	async function GetPage() {
		getCurrentUser(JWT).then(async (data) => {
			let user = data.data;
			setCurrentUser(user);

			let apiRegisterUrl = "";
			if (path.pathname.includes("user/profile"))
				apiRegisterUrl = "/users/current";
			else if (path.pathname.includes("user"))
				apiRegisterUrl = "/users/" + pageParam;
			else apiRegisterUrl = "/groups/" + pageParam;

			getUserGroups(JWT, data.data.userID).then((data) => {
				setUserGroups(data.data);
			});

			getPageAxios(JWT, apiRegisterUrl).then(async (data) => {
				let id = -1;
				if (path.pathname.includes("user")) {
					id = data.data.userID;
					data.data.userPage.pageTitle = data.data.displayName + "'s Page!";
					data.data.userPage.userID = data.data.userID;
					data.data.userPage.username = data.data.username;
					data.data.userPage.displayName = data.data.displayName;
					updatePage(data.data.userPage);
					getGroupsByID(JWT, id).then((data) => {
						setGroups(data.data);
						setIsBusy(false);
					});
				} else {
					id = data.data.userOwnerID;
					data.data.groupPage.pageTitle =
						data.data.groupName + " is almost certianly a group page!";
					data.data.groupPage.userID = data.data.userOwnerID;
					data.data.groupPage.groupID = data.data.groupID;
					updatePage(data.data.groupPage);

					apiRegisterUrl = "/groups/" + pageParam;

					getPageAxios(JWT, apiRegisterUrl).then(async (data) => {
						setGroup(data.data);
						console.log(data.data);
					});
					setIsBusy(false);
				}
			});
		});
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
									<CardHeader title={page.pageTitle} />
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
														<MenuItem onClick={handleCloseAddFriend}>
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
												console.log(groups.content);
												for (let currentGroup of groups.content) {
													console.log(currentGroup);
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
									console.log(val);
								}}
								sx={{ margin: 5, width: 300, height: 200 }}
								ListboxProps={{ style: { maxHeight: '150px' } }}
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
				return <Posts page={page} currentUser={currentUser} JWT={JWT} />;
				break;
			case 1:
				return <About />;
				break;
			case 2:
				return (
					<>
						{page.groupPage ? (
							<Members />
						) : (
							<FriendsTab currentUsername={page.username} />
						)}{" "}
					</>
				);
				break;
			case 3:
				return (
					<>
						{page.groupPage ? (
							<PageSetting
								page={page}
								updatePage={updatePage}
								setReload={setReload}
							/>
						) : (
							<Groups />
						)}{" "}
					</>
				);
				break;
			case 4:
				return (
					<>
						{page.groupPage ? (
							<></>
						) : (
							<PageSetting
								page={page}
								updatePage={updatePage}
								setReload={setReload}
							/>
						)}{" "}
					</>
				);
				break;
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
	 * @returns
	 */
	function About() {
		return <div>{page.description}</div>;
	}

	/**
	 * Placeholder for Members
	 *
	 * @returns
	 */
	function Members() {
		let nav = useNavigate();
		return (
			<>
				{group.members.map((member) => (
					<Button
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
	 * @returns
	 */
	function Settings() {
		return <div></div>;
	}

	/**
	 * Placeholder for Groups
	 *
	 * @returns
	 */
	function Groups() {
		let navigate = useNavigate();

		let axiosConfig = {
			headers: {
				Authorization: "Bearer " + JWT,
			},
		};

		const goToGroup = (groupID) => {
			navigate("/group/" + groupID);
		};

		const deleteGroup = async (groupID) => {
			await APIQuery.delete("/groups/" + groupID, axiosConfig).catch((e) => {
				console.log(e);
			}); //since this is attached to a group component, we're guaranteed that it exists to delete it
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
					console.log("SOMETHING HERE");
					console.log(group);
					return (
						<div key={group.groupID}>
							<Typography>{group.groupName}</Typography>
							<Button onClick={() => goToGroup(group.groupID)}>
								Go to Group
							</Button>
							{page.userID === currentUser.userID &&
								currentUser.userID === group.userOwnerID ? (
								<Button onClick={() => deleteGroup(group.groupID)}>
									Delete Group
								</Button>
							) : (
								""
							)}
						</div>
					);
				})}
				<br />
				<br />
				{page.userID === currentUser.userID ? (
					<CreateGroup JWT={JWT} groups={groups} setGroups={setGroups} />
				) : (
					""
				)}
			</>
		);
	}
}
