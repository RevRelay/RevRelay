import {
    Button,
    Typography,
    TextField,
} from "@mui/material";
import APIQuery from "../../API/APIQuery";
import { useState } from "react";

/**
 * Adds a Member to a group
 * @param {*} param0 the entire group model
 * @returns the same group with an added User via their ID
 */
export default function AddMember({ group }) {

    const [memberID, updateMemberID] = useState();

    const addMember = async () => {
        let tempGroup = { ...group };
        tempGroup.members.push(memberID);
        const response = await APIQuery.put("/groups", tempGroup, {
            Headers: { "Authorization": "Bearer " + localStorage.getItem("token") }
        }).then((data) => { console.log(data.data) });
    }

    return (
        <>
            <Typography>Add User to Group:</Typography>
            <TextField value="" label="User ID" onChange={(e) => updateMemberID(e.target.value)} />
            <Button variant="contained" onClick={addMember}>
                Add to Group
            </Button>
        </>
    );
}
