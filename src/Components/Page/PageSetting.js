import {
    Button,
    FormControlLabel,
    FormGroup,
    TextField,
    Switch,
    Grid,
} from "@mui/material";

import APIQuery from "../../API/APIQuery";
import { useState } from "react";
import { Box } from "@mui/system";

export default function PageSetting({page}) {

    const [form, updateForm] = useState({
        ...page,
        // bannerURL: page.bannerURL,
        // description: page.description,
        // isPrivate: page.private,
    });

    const {description,bannerURL,isPrivate} = form;    

    // stretch goal: page title (custom name of page)

    // privacy 
    // name of the page (default name of page)
    // description 
    // banner

    const changeDescription = (e) => {
        let tempForm = { ...form };
        tempForm.description = e.target.value;
        updateForm(tempForm);
    }

    const togglePrivacy = (e) => {
        let tempForm = { ...form };
        tempForm.isPrivate = e.target.value;
        updateForm(tempForm);
    }

    const changeURL = (e) => {
        let tempForm = { ...form };
        tempForm.bannerURL = e.target.value;
        updateForm(tempForm);
    }

    const saveChanges = async () => {
        //Axios:
        const response = await APIQuery.put("/pages",form,{
            Headers:{"Authorization":"Bearer "+localStorage.getItem("token")}
        }).then((data) => {console.log(data.data)});
        console.log(response);
    }

    return (
        <>
            <Grid container spacing = {4}>
                <Grid item>
                    <FormGroup>
                        <FormControlLabel control={<Switch onChange={(e) => togglePrivacy(e)} checked={isPrivate}/>} label="Private Page" />
                    </FormGroup>
                </Grid>
                <Grid item>
                    <TextField value={description} label="Description" onChange={(e) => changeDescription(e)} />
                </Grid>
                <Grid item>
                    <TextField value={bannerURL} label="URL of Banner" onChange={(e) => changeURL(e)} />
                </Grid>
                <Grid item>
                    <Button variant="contained" onClick={() => {saveChanges()}}>
                        Save Page Settings
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}
