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
} from "@mui/material";
import Posts from "./Posts";
import { height, maxHeight, width } from "@mui/system";
import { current } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import APIQuery from "../API/APIQuery";
import { useLocation, useNavigate, useParams } from "react-router-dom";

/**
 * Renders a generic page with condintional rendering
 * @param {object} param
 * @param {string} param.JWT token determining user and log in information.
 * @returns HTML for default page
 */
export default function Page({ JWT }) {
	let { userID } = useParams();
	let path = useLocation();

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

	const [tab, updateTab] = useState(0);
	const currentUser = {
		page: { userOwnerID: 0 },
	};

	useEffect(() => {
		GetPage();
	}, []);

	/**
	 * Gets Page from back server
	 * @async
	 */
	async function GetPage() {
		var apiRegisterUrl = "";
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
		await APIQuery.get(apiRegisterUrl, axiosConfig).then((data) => {
			if (path.pathname.includes("user")) {
				data.data.userPage.pageTitle = data.data.displayName + "'s Page";
				updatePage(data.data.userPage);
			}
		});
	}
	return (
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
							{currentUser.page.userOwnerID === page.userOwnerID || (
								<Tab label="Settings" />
							)}
						</Tabs>
						<Divider sx={{ width: "100%" }} />
						<RenderTab />
					</div>
				</div>
			</Box>
		</Box>
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
		return <div></div>;
	}
	/**
	 * Placeholder for Friends
	 * 
	 * @returns
	 */
	function Friends() {
		return <div></div>;
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
		return <div></div>;
	}
}
