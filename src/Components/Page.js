import {
	Box,
	Button,
	Card,
	CardHeader,
	CardMedia,
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
	let { userID } = useParams();
	let path = useLocation();
	const [tab, updateTab] = useState(0);

	const [page, updatePage] = useState({
		bannerURL: "https://i.imgur.com/0EtPsQK.jpeg",
		description: "You description here",
		groupPage: false,
		pageID: 1,
		pageTitle: "test",
		posts: [],
		private: true,
		pageTitle: "Test",
	});
	const [currentUser, setCurrentUser] = useState(null);
	const [isBusy, setIsBusy] = useState(true);
	const [groups, setGroups] = useState(true);

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
				apiRegisterUrl = "/users/" + userID;
			else apiRegisterUrl = "/groups/" + userID;

			let axiosConfig = {
				headers: {
					Authorization: "Bearer " + JWT,
				},
			};
			await APIQuery.get(apiRegisterUrl, axiosConfig).then(async (data) => {
				data.data.userPage.pageTitle = data.data.displayName + "'s Page";
				updatePage(data.data.userPage);

				await APIQuery.get("groups/all/" + user.userID, axiosConfig).then((data) => {
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
					<>test</>
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

		const goToGroup = (pageID) => {
			navigate("/group/" + pageID);
		}

		const getPageIDByGroupID = async (groupID) => {
			let axiosConfig = {
				headers: {
					Authorization: "Bearer " + JWT,
				},
			};
			await APIQuery.get("/pages/groups/" + groupID, axiosConfig).then(async (data) => {
				goToGroup(data.data.pageID)
			});
		}


		console.log(groups);
		return (
			<>
				{groups.content.map((group) => {
					return (
						<>
							<Typography>{group.groupName}</Typography>
							<Typography>{group.groupID}</Typography>
							<Button onClick={() => getPageIDByGroupID(group.groupID)}>Go to Group</Button>
						</>
					);
				})
				}
				<br />
				<br />
				<CreateGroup JWT={JWT} currentUser={currentUser} />
			</>
		);
	}
}