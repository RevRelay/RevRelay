import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Fade,
	Grid,
	IconButton,
	Pagination,
	Paper,
	Stack,
	TextField,
	Tooltip,
	Typography,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import APIQuery from "../API/APIQuery";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { User, Page, Post, Posting, PostSingle } from "../typeDef";
import AddCommentIcon from "@mui/icons-material/AddComment";
import ChatIcon from "@mui/icons-material/Chat";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { getUser, getUserGroups } from "../API/PageAPI";
import ContentComponent from "./postsUtils/ContentComponent";

/**
 * Render Posts Tab
 *
 * @param {Posting} postsProp						---
 * @param {Page}	postsProp.page					---
 * @param {Number}	postsProp.page.pageID			The ID for the Page.
 * @param {User}	postsProp.currentUser			The current User's info.
 * @param {Number}	postsProp.currentUser.userID	The curren't User's userID.
 * @param {String}	postsProp.JWT					JWT token determinig user and log in information.
 * @returns ---
 */
export default function Posts(postsProp) {
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
		postPage: { pageID: postsProp.page.pageID },
		postType: "ORIGINAL",
		postTitle: "New Post",
		postContent: "Hello World!",
		postLikes: 0,
		postTime: 0,
		postOwnerID: 0,
		children: null,
	});

	/**
	 * ---
	 * @param {Boolean} isOp	---
	 * @param {Number} 	postID 	The parent Post's postID.
	 */
	const handleClickOpen = (isOp, postID) => {
		if (!isOp) {
			let np = { ...newpost };
			np.parent = { postID: postID };
			np.postType = "REPLY";
			np.postOwnerID = postsProp.currentUser.userID;
			np.postTime = Date.now();
			updateNewPost(np);
			setOpen(true);
		} else {
			let np = { ...newpost };
			np.parent = null;
			np.postType = "ORIGINAL";
			np.postOwnerID = postsProp.currentUser.userID;
			np.postTime = Date.now();
			updateNewPost(np);
			setOpen(true);
		}
	};

	/**
	 * ---
	 */
	const handleClose = () => {
		setOpen(false);
	};

	/**
	 * ---
	 */
	const handlePost = () => {
		PostPosts();
		setOpen(false);
	};
	/**
	 * Gets posts from Server
	 * @async
	 */
	async function GetPosts() {
		var running = true;
		var apiRegisterUrl = "posts/page/" + postsProp.page.pageID;
		let axiosConfig = {
			headers: {
				Authorization: "Bearer " + postsProp.JWT,
			},
		};
		await APIQuery.get(apiRegisterUrl, axiosConfig).then((data) => {
			if (running) updatePosts(data.data);
		});
		return () => (running = false);
	}

	/**
	 * Save Posts
	 * @async
	 */
	async function PostPosts() {
		var apiRegisterUrl = "posts";
		let axiosConfig = {
			headers: {
				Authorization: "Bearer " + postsProp.JWT,
			},
		};
		await APIQuery.post(apiRegisterUrl, newpost, axiosConfig).then((data) => {
			GetPosts();
		});
	}

	/**
	 * ---
	 */
	// TODO: React Hook useEffect has a missing dependency: 'GetPosts'. Either include it or remove the dependency array
	useEffect((x) => {
		GetPosts();
	}, []);

	/**
	 * ---
	 * @param {String} 	postID 	---
	 * @param {---} 	up 		---
	 */
	async function onVote(postID, up) {
		let axiosConfig = {
			headers: {
				Authorization: "Bearer " + postsProp.JWT,
			},
			params: {
				upvote: up,
			},
		};
		await APIQuery.put("posts/" + postID + "/vote", null, axiosConfig).then(
			(data) => {
				GetPosts();
			}
		);
	}

	/**
	 * Generate Posts html
	 *
	 * @param {PostSingle} 	postElement						The Array for a prop object that just contains a post.
	 * @param {Post}		postElement.post				---
	 * @param {Number}		postElement.post.postID			The ID for the post.
	 * @param {String}		postElement.post.postType		---
	 * @param {Sting}		postElement.post.postTitle		The title for the post.
	 * @param {String}		postElement.post.postContent	The content contained in the post.
	 * @param {Number}		postElement.post.upVoters		The number of up Votes for the post.
	 * @param {Number}		postElement.post.downVoters		The number of down Votes for the post.
	 * @returns ---
	 */
	function PostElement(postElement) {
		const [isShowing, setIsShowing] = useState(true);
		let d = new Date(Date.parse(postElement.post.postTime));
		let auth = "DELETED";
		if (postElement.post.postAuthor) auth = postElement.post.postAuthor;

		return (
			<Box
				sx={{
					width: "99%",
					paddingTop: "1%",
					marginLeft: "1%",
				}}
			>

				<Paper elevation={5} sx={{ marginLeft: "1%", minWidth: "33%", pl: 2 }}>
					<Typography sx={{ fontSize: 12 }}>
						{auth +
							" @ " +
							d.toDateString() +
							" " +
							("" + d.getHours()).padStart(2, "0") +
							":" +
							("" + d.getMinutes()).padStart(2, "0")}
					</Typography>
					<Typography sx={{ fontWeight: "bold", pl: 2 }}>
						{postElement.post.postTitle}
					</Typography>
					<Typography sx={{ pl: 2 }}>
						<ContentComponent content={postElement.post.postContent} />
					</Typography>

					{postElement.post.children.length > 0 ? (
						<IconButton
							onClick={() =>
								isShowing ? setIsShowing(false) : setIsShowing(true)
							}
						>
							{isShowing ? (
								<ChatIcon color="primary" />
							) : (
								<ChatIcon color="disabled" />
							)}
						</IconButton>
					) : (
						""
					)}
					<IconButton onClick={(x) => onVote(postElement.post.postID, true)}>
						<KeyboardArrowUpIcon
							sx={{
								color: postElement.post.upVoters.includes(
									postsProp.currentUser.userID
								)
									? "orange"
									: "primary",
							}}
						/>
					</IconButton>
					{postElement.post.upVoters.length -
						postElement.post.downVoters.length}
					<IconButton onClick={(x) => onVote(postElement.post.postID, false)}>
						<KeyboardArrowDownIcon
							sx={{
								color: postElement.post.downVoters.includes(
									postsProp.currentUser.userID
								)
									? "limegreen"
									: "primary",
							}}
						/>
					</IconButton>
					<IconButton
						onClick={() => handleClickOpen(false, postElement.post.postID)}
					>
						<AddCommentIcon />
					</IconButton>
				</Paper>
				{isShowing
					? postElement.post.children.map((newPost) => {
						return <PostElement post={newPost} key={newPost.postID} />;
					})
					: ""}
			</Box>
		);
	}

	return (
		<Box sx={{ overflowY: "auto", maxHeight: "100%" }}>
			<Box sx={{ marginBottom: "5%" }}>
				{posts.content.map((newPost) => {
					return newPost.postType !== "ORIGINAL" ? (
						<></>
					) : (
						<PostElement post={newPost} key={newPost.postID} />
					);
				})}
			</Box>
			<br />
			<br />
			<Box>
				<Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
					<DialogTitle>
						New Post
						<Tooltip
							sx={{ position: "absolute", right: 10 }}
							placement="right"
							title={
								<>
									<Typography color="inherit" sx={{ fontWeight: "Bold" }}>
										Post Options
									</Typography>
									<Typography color="inherit">
										Use the following tags to add content to your post
									</Typography>
									<Typography color="inherit">
										{"<i="}
										<em>ImageURL</em>
										{">"}
									</Typography>
									<Typography color="inherit">
										{"<y="}
										<em>YoutubeURL</em>
										{">"}
									</Typography>
									<Typography color="inherit">
										{"<v="}
										<em>videoURL</em>
										{">"}
									</Typography>
								</>
							}
						>
							<IconButton>
								<InfoOutlinedIcon />
							</IconButton>
						</Tooltip>
					</DialogTitle>
					<DialogContent>
						<DialogContentText>Create A New Post </DialogContentText>
						<Stack direction="row">
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
						</Stack>
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
						}}
					>
						{postsProp.page.userID === postsProp.currentUser.userID ? (
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
				</Grid>
			</Box>
		</Box>
	);
}
