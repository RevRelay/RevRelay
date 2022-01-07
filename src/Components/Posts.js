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
	Typography,
} from "@mui/material";
import { height, maxHeight, width } from "@mui/system";
import { current } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import APIQuery from "../API/APIQuery";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function Posts({ page, currentUser, JWT }) {
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

	const [open, setOpen] = useState(false);
	const [newpost, updateNewPost] = useState({
		postPage: { pageID: page.pageID },
		postType: "ORIGINAL",
		postTitle: "New Post",
		postContent: "Hello World!",
		postLikes: 0,
		postTime: 0,
		postOwnerID: 0,
		children: null,
	});
	const handleClickOpen = (isOp) => {
		if (!isOp) {
			let np = { ...newpost };

			updateNewPost(np);
		}
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const handlePost = () => {
		console.log("Sending Post", newpost);
		PostPosts();
		setOpen(false);
	};

	async function GetPosts() {
		var apiRegisterUrl = "posts/page/" + page.pageID;
		let axiosConfig = {
			headers: {
				Authorization: "Bearer " + JWT,
			},
		};
		await APIQuery.get(apiRegisterUrl, axiosConfig).then((data) => {
			updatePosts(data.data);
		});
	}

	async function PostPosts() {
		var apiRegisterUrl = "posts";
		let axiosConfig = {
			headers: {
				Authorization: "Bearer " + JWT,
			},
		};
		await APIQuery.post(apiRegisterUrl, newpost, axiosConfig).then((data) => {
			GetPosts();
		});
	}

	useEffect((x) => {
		GetPosts();
	}, []);
	return (
		<div>
			{posts.content.map((post) => {
				return (
					<>
						<Paper elevation={5} key={post.postID}>
							<Typography>{post.postTitle}</Typography>
							<Typography>{post.postContent}</Typography>
							<IconButton>
								<KeyboardArrowUpIcon color="primary" />
							</IconButton>
							{post.postLikes}
							<IconButton>
								<KeyboardArrowDownIcon color="primary" />
							</IconButton>
							<Button onClick={() => handleClickOpen(false)}>Reply</Button>
						</Paper>
						<br />
					</>
				);
			})}
			<br />
			<br />
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
						defaultValue={newpost.postTitle}
						onChange={(x) => {
							let np = { ...newpost };
							np.postTitle = x.target.value;
							updateNewPost(np);
						}}
					/>
					<TextField
						sx={{ marginTop: 2 }}
						id="content"
						label="Content"
						multiline
						fullWidth
						rows={4}
						defaultValue={newpost.postContent}
						onChange={(x) => {
							let np = { ...newpost };
							np.postContent = x.target.value;
							updateNewPost(np);
						}}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handlePost}>Post!</Button>
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
					{page.userID === currentUser.userID ? (
						<Tooltip
							title="Add new post"
							placement="top"
							TransitionComponent={Fade}
							TransitionProps={{ timeout: 600 }}
						>
							<IconButton onClick={() => handleClickOpen(true)}>
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
		</div>
	);
}
