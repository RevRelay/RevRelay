import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
} from "@mui/material";
import APIQuery, { groupCreate } from "../../app/api";
import { useState } from "react";
import {
	CreateGroups,
	Group,
	SetStateActionGroups,
} from "../../typeDef";

/**
 * Creates a group owned by the creating user.
 * 
 * @param {CreateGroups}			createGroupProp				---
 * @param {Group[]}					createGroupProp.groups		The list of groups the user you are looking at is in.
 * @param {SetStateActionGroups}	createGroupProp.setGroups	Setter function for the state variable groups.
 * @returns adds a group to the list the user owns and reflect the change by adding it a visual list
 */
export default function CreateGroup(createGroupProp) {

	const [open, setOpen] = useState(false);
	const [newGroup, updateNewGroup] = useState({
		groupName: "New Group",
		isPrivate: false,
		members: null
	});

	/**
	 * ---
	 */
	const toggleOpen = () => {
		setOpen(!open);
	};

	/**
	 * ---
	 * @async
	 */
	const createGroup = async () => {
		toggleOpen();

		await groupCreate(newGroup).then(async (response) => {
			let tempGroups = createGroupProp.groups;
			tempGroups.content.push(response.data);
			createGroupProp.setGroups({ ...tempGroups });
		}).catch((e) => {
		});
	}

	return (
		<>
			<Box textAlign={"center"}>
				<Button variant="contained" onClick={toggleOpen}>Create Group</Button>
			</Box>
			<Dialog open={open} onClose={toggleOpen}>
				<DialogTitle>New Group</DialogTitle>
				<DialogContent>
					<DialogContentText>Create A New Group</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="title"
						label="Title"
						type="test"
						fullWidth
						variant="standard"
						defaultValue="New Group"
						onChange={(e) => {
							let tempGroup = { ...newGroup };
							tempGroup.groupName = e.target.value;
							updateNewGroup(tempGroup);
						}}
					/>
				</DialogContent>
				<DialogActions>
					<Button
						sx={{
							color: "palette.secondary.dark",
						}}
						onClick={toggleOpen}
					>
						Cancel
					</Button>
					<Button onClick={createGroup}>Create Group!</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
