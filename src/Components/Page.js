import {
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
	Pagination,
	Paper,
	Tab,
	Tabs,
	Typography
} from "@mui/material";
import Posts from "./Posts";
import CreateGroup from "./Group/CreateGroup";
import { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import APIQuery from "../API/APIQuery";
import { useLocation, useNavigate, useParams } from "react-router-dom";

/**
 * Renders a generic page with condintional rendering
 * @param {*} param0 JWT
 * @returns HTML for default page
 */
export default function Page({ JWT }) {
	let { pageParam } = useParams();
	let path = useLocation();
	const [tab, updateTab] = useState(0);

	const [page, updatePage] = useState({
		bannerURL: "https://i.imgur.com/0EtPsQK.jpeg",
		description: "You description here",
		groupPage: false,
		pageID: 1,
		posts: [],
		private: true,
		pageTitle: "Title Not Found"
	});
	const [isBusy, setIsBusy] = useState(true);
	const [groups, setGroups] = useState(true);
	const [currentUser, setCurrentUser] = useState(null);


	useEffect(() => {
		GetPage();
	}, []);

	/**
	 * Gets Page from back server
	 */
	const getCurrentUser = async () => {
		let axiosConfig = {
			headers: {
				Authorization: "Bearer " + JWT,
			},
		};
		return await APIQuery.get("users/current", axiosConfig)
	};


	/**
	 * Gets Page from back server
	 */
	async function GetPage() {

		getCurrentUser().then(async (data) => {
			let user = data.data
			setCurrentUser(user);

			let apiRegisterUrl = "";
			if (path.pathname.includes("user/profile"))
				apiRegisterUrl = "/users/current";
			else if (path.pathname.includes("user"))
				apiRegisterUrl = "/users/" + pageParam;
			else apiRegisterUrl = "/groups/" + pageParam;

			let axiosConfig = {
				headers: {
					Authorization: "Bearer " + JWT,
				},
			};

			await APIQuery.get(apiRegisterUrl, axiosConfig).then(async (data) => {

				if (path.pathname.includes("user")) {
					data.data.userPage.pageTitle = data.data.username + "'s Page!";
					updatePage(data.data.userPage);


				} else {
					data.data.groupPage.pageTitle = data.data.groupName + " is almost certianly a group page!";
					updatePage(data.data.groupPage);
				}

				await APIQuery.get("groups/getgroups/" + user.userID, axiosConfig).then((data) => {
					setGroups(data.data);
					setIsBusy(false);

				});

			});
		});

	}

	return (
		<>
			{
				isBusy ? (
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
								minHeight: "80vh",

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
								<Card sx={{ minHeight: "10vh", maxHeight: "25vh", maxWidth: "100%" }}>
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
										{currentUser.userID === page.userOwnerID || (
											<Tab label="Settings" />
										)}
									</Tabs>
									<Divider sx={{ width: "100%" }} />
									<RenderTab />
								</div>
							</div>
						</Box>
					</Box>
				)
			}
		</>
	);
	/**
	 * Gets tab from state and renders current tab
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
				return <>{page.groupPage ? <Members /> : <Friends />} </>;
				break;
			case 3:
				return <>{page.groupPage ? <Settings /> : <Groups />} </>;
				break;
			case 4:
				return <>{page.groupPage ? <></> : <Settings />} </>;
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
					style={{ minHeight: '80vh' }}
				>

					<Grid item xs={3}>
						<Typography>Loading...</Typography>
					</Grid>
					<Grid item xs={3}>
						<CircularProgress />
					</Grid>
				</Grid>
			</>
		)
	}
	/**
	 * Placeholder for About
	 * @returns
	 */
	function About() {
		return <div>{page.description}</div>;
	}
	/**
	 * Placeholder for Members
	 * @returns
	 */
	function Members() {
		return <div></div>;
	}
	/**
	 * Placeholder for Friends
	 * @returns
	 */
	function Friends() {
		return <div></div>;
	}
	/**
	 * Placeholder for Settings
	 * @returns
	 */
	function Settings() {
		return <div></div>;
	}
	/**
	 * Placeholder for Groups
	 * @returns
	 */
	function Groups() {
		let navigate = useNavigate();

		let axiosConfig = {
			headers: {
				Authorization: "Bearer " + JWT,
			}
		};

		const goToGroup = (groupID) => {
			navigate("/group/" + groupID);
		}

		const deleteGroup = async (groupID) => {
			await APIQuery.delete("/groups/" + groupID, axiosConfig)
				.catch((e) => { console.log(e) });//since this is attached to a group component, we're guaranteed that it exists to delete it
			//update front end
			let tempGroups = groups;
			tempGroups.content = groups.content.filter(
				e => { return e.groupID !== groupID; }
			);
			setGroups({ ...tempGroups });
		}

		return (
			<>
				{groups.content.map((group) => {
					return (
						<div key={group.groupID}>
							<Typography>{group.groupName}</Typography>
							<Typography>{group.groupID}</Typography>
							<Button onClick={() => goToGroup(group.groupID)}>Go to Group</Button>
							<Button onClick={() => deleteGroup(group.groupID)}>Delete Group</Button>
						</div>
					);
				})
				}
				<br />
				<br />
				<CreateGroup JWT={JWT} groups={groups} setGroups={setGroups} />
			</>
		);
	}
}