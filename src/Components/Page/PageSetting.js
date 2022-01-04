import {
    Button,
    TextField

} from "@mui/material";

export default function PageSetting(props) {

    const [form, updateForm] = useState({
        description: "",
        bannerURL: "",
        private: false,
    });

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
        tempForm.private = e.target.value;
        updateForm(tempForm);
    }

    const changeURL = (e) => {
        let tempForm = { ...form };
        tempForm.bannerURL = e.target.value;
        updateForm(tempForm);
    }

    return (
        <>
            <Switch {...label} defaultChecked onChange={(e) => togglePrivacy(e)} />
            <TextField label="Description" variant="primary" onChange={(e) => changeDescription(e)} />
            <TextField label="URL of Banner" variant="primary" onChange={(e) => changeURL(e)} />
            <Button variant="contained" onClick={ }>
                Save Page Settings
            </Button>
        </>
    );
}
