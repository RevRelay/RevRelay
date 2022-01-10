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

/**
 * Renders the page settings tabs. Can set three attributes: private, description, and banner
 * @param {*} param0 page that the users is currently on, update state on updatePage, setReload reloads the page on true
 * @returns page html
 */
export default function PageSetting({ page, updatePage, setReload }) {
	let tempPage = { ...page };
	tempPage.posts = null;
	const [form, updateForm] = useState({
		...tempPage,
		// bannerURL: page.bannerURL,
		// description: page.description,
		// isPrivate: page.private,
	});

	const { description, bannerURL, isPrivate } = form;
	// stretch goal: page title (custom name of page)

	// privacy
	// name of the page (default name of page)
	// description
	// banner

	const changeDescription = (e) => {
		let tempForm = { ...form };
		tempForm.description = e.target.value;
		updateForm(tempForm);
	};

	const togglePrivacy = (e) => {
		let tempForm = { ...form };

		tempForm.private = e.target.checked;
		updateForm(tempForm);
	};

	const changeURL = (e) => {
		let tempForm = { ...form };
		tempForm.bannerURL = e.target.value;
		updateForm(tempForm);
	};

	const saveChanges = async () => {
		//Axios:
		const response = await APIQuery.put("/pages", form, {
			headers: { Authorization: "Bearer " + localStorage.getItem("token") },
		}).then((data) => {
			setReload(true);
			return data;
		});
		console.log(response);
	};

	return (
		<>
			<Box
				sx={{
					marginTop: "5%",
					marginLeft: "5%",
					marginRight: "5%",
					maxWidth: "100%",
				}}
			>
				<Grid container spacing={2}>
					<Grid item xs={4}>
						<FormGroup>
							<FormControlLabel
								control={
									<Switch onChange={togglePrivacy} checked={form.private} />
								}
								label="Private Page"
							/>
						</FormGroup>
					</Grid>
					<Grid item xs={4}>
						<TextField
							value={description}
							label="Description"
							onChange={(e) => changeDescription(e)}
						/>
					</Grid>
					<Grid item xs={4}>
						<TextField
							value={bannerURL}
							label="URL of Banner"
							onChange={(e) => changeURL(e)}
						/>
					</Grid>
					<Grid item xs={12}>
						<Button
							variant="contained"
							onClick={() => {
								saveChanges();
							}}
						>
							Save Page Settings
						</Button>
					</Grid>
				</Grid>
			</Box>
		</>
	);
}
