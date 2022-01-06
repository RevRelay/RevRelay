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
    Typography
} from "@mui/material";

import APIQuery from "../../API/APIQuery";
import { useState } from "react";

export default function CreateGroup({ currentUser, JWT }) {

    const [open, setOpen] = useState(false);
    const [newGroup, updateNewGroup] = useState({
        groupName: "New Group",
        isPrivate: false,
        members: null

    });
    const toggleOpen = () => {
        setOpen(!open);
    };
    console.log(currentUser);

    const createGroup = async () => {

        let axiosConfig = {
            headers: {
                Authorization: "Bearer " + JWT,
            }
        };
        await APIQuery.post("/groups", newGroup, axiosConfig).then(async (data) => {
            console.log(data.data);
        });

    }

    return (
        <>
            <Button onClick={toggleOpen}>Create Group</Button>
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
                    <Button onClick={toggleOpen}>Cancel</Button>
                    <Button onClick={createGroup}>Create Group!</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}