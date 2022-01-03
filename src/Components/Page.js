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
	TextField,
	Tooltip,
} from "@mui/material";

import { height, maxHeight, width } from "@mui/system";
import { current } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import APIQuery from "../API/APIQuery";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function Page({ theme, themes, JWT }) {
	let { userID } = useParams();
	console.log("param: ", userID);
	let path = useLocation();
	console.log("Path: ", path);
	const [page, updatePage] = useState({
		pageID: 0,
		pageTitle: "Test",
		description: "",
		bannerURL: "https://i.imgur.com/0EtPsQK.jpeg",
		private: false,
		groupPage: false,
		userOwnerID: 0,
		groupID: 0,
	});
	const [posts, updatePosts] = useState({
		content: [],
		pageable: "INSTANCE",
		totalPages: 1,
		totalElements: 0,
		last: true,
		size: 0,
		number: 0,
		sort: { empty: true, sorted: false, unsorted: true },
		numberOfElements: 0,
		first: true,
		empty: true,
	});
	const [tab, updateTab] = useState(0);
	const currnetUser = {
		userID: 0,
	};

	useEffect(() => GetPage, []);
	async function GetPage() {
		const apiRegisterUrl = "";
		if (path.pathname.includes("user")) apiRegisterUrl = "/user/";

		let axiosConfig = {
			headers: {
				Authorization: "Bearer " + JWT,
			},
		};
		var data = APIQuery.get(apiRegisterUrl, axiosConfig).then((data) => {
			return data;
		});
		console.log(data);
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
					height: "100%",

					maxWidth: "100%",
					minWidth: 500,
				}}
			>
				<div
					style={{
						maxHeight: "100%",
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
							{currnetUser.userID === page.userOwnerID ? (
								<Tab label="Settings" />
							) : (
								<></>
							)}
						</Tabs>
						<Divider sx={{ width: "100%" }} />
						<RenderTab />
					</div>
				</div>
			</Box>
		</Box>
	);

	function RenderTab() {
		switch (tab) {
			case 0:
				return <Posts />;
				break;
			case 1:
				return <About />;
				break;
			case 2:
				return <>{page.groupPage ? <Members /> : <Friends />} </>;
				break;
			case 3:
				return <Settings />;
				break;

			default:
				break;
		}
	}
	function Posts() {
		const [open, setOpen] = useState(false);
		const [newpost, updateNewPost] = useState({
			postType: null,
			postTitle: null,
			postContent: null,
			postLikes: 0,
			postTime: null,
			postOwnerID: 0,
			children: null,
		});
		const handleClickOpen = () => {
			setOpen(true);
		};

		const handleClose = () => {
			console.log(temppost);
			setOpen(false);
		};
		var temppost = {
			postType: null,
			postTitle: "New Post",
			postContent: "Hello World!",
			postLikes: 0,
			postTime: null,
			postOwnerID: 0,
			children: null,
		};

		return (
			<>
				<Dialog open={open} onClose={handleClose}>
					<DialogTitle>New Post</DialogTitle>
					<DialogContent>
						<DialogContentText>Create A New Post</DialogContentText>
						<TextField
							autoFocus
							margin="dense"
							id="title"
							label="Title"
							type="test"
							fullWidth
							variant="standard"
							defaultValue={temppost.postTitle}
							onChange={(x) => (temppost.postTitle = x.target.value)}
						/>
						<TextField
							sx={{ marginTop: 2 }}
							id="content"
							label="Content"
							multiline
							fullWidth
							rows={4}
							defaultValue={temppost.postContent}
							onChange={(x) => (temppost.postContent = x.target.value)}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose}>Cancel</Button>
						<Button onClick={handleClose}>Post!</Button>
					</DialogActions>
				</Dialog>
				<Grid
					container
					spacing={0}
					direction="column"
					alignItems="center"
					justifyContent="center"
					height={"100%"}
				>
					<Grid
						item
						xs={4}
						sx={{
							left: "5%",
							position: "absolute",
							bottom: 5,
							display: "inline-block",
						}}
					>
						{page.userOwnerID === currnetUser.userID ? (
							<Tooltip
								title="Add new post"
								placement="top"
								TransitionComponent={Fade}
								TransitionProps={{ timeout: 600 }}
							>
								<IconButton onClick={handleClickOpen}>
									<AddCircleIcon color="primary" fontSize="large" />
								</IconButton>
							</Tooltip>
						) : (
							<></>
						)}
					</Grid>
					<Grid
						item
						xs={4}
						sx={{
							position: "absolute",
							bottom: 5,
							display: "inline-block",
						}}
					>
						<Pagination count={posts.totalPages} color="primary" size="large" />
					</Grid>
				</Grid>
			</>
		);
	}
	function About() {
		return <></>;
	}
	function Members() {
		return <></>;
	}
	function Friends() {
		return <></>;
	}
	function Settings() {
		return <></>;
	}
}
