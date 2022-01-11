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
import { ToastContainer, toast } from "react-toastify";
import { PageSingle } from "../../typeDef";

/**
 * Renders the page settings tabs. Can set three attributes: private, description, and banner
 * @param {PageSingle} 	pageSetting			The Array for a prop object that just contains a page.
 * @param {Page}		pageSetting.page 	The Page that the users is currently on
 * @param {setIsReload}	pageSetting.setIsReload 	Set true to reload current page
 * @returns page html ---
 */
export default function PageSetting(pageSetting) {
	const [loading, setLoading] = useState(false);
	let tempPage = { ...pageSetting.page };
	tempPage.posts = null;
	const [form, updateForm] = useState({ ...tempPage });

	const { description, bannerURL, isPrivate } = form;
	// stretch goal: page title (custom name of page)

	/**
	 * ---
	 * @param {Event} e ---
	 */
	const changeDescription = (e) => {
		let tempForm = { ...form };
		tempForm.description = e.target.value;
		updateForm(tempForm);
	};

	/**
	 * ---
	 * @param {Event} e ---
	 */
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
		setLoading(true);
		//Axios:
		const response = await APIQuery.put("/pages", form, {
			headers: { Authorization: "Bearer " + localStorage.getItem("token") },
		}).then((data) => {
			pageSetting.setIsReload(true);
			toast.success("Successfully updated group!");
			return data;
		});
		console.log(response);
		setLoading(false);
	};

	return (
		<>
			<ToastContainer />
			<Box
				sx={{
					marginTop: "5%",
					marginLeft: "5%",
					marginRight: "5%",
					maxWidth: "100%",
				}}
			>
				{!loading ? (
					<Grid container spacing={2}>
						<Grid item xs={4}>
							<FormGroup>
								<FormControlLabel
									control={
										<Switch onChange={togglePrivacy} checked={form.private} />
									}
                  sx={{
                    color: "text.secondary"
                  }}
									label="Private Page"
								/>
							</FormGroup>
						</Grid>
						<Grid item xs={4}>
							<TextField
								value={description}
								label="Description"
								onChange={(e) => changeDescription(e)}
                sx={{
                  color: "text.secondary"
                }}
							/>
						</Grid>
						<Grid item xs={4}>
							<TextField
								value={bannerURL}
								label="URL of Banner"
								onChange={(e) => changeURL(e)}
                sx={{
                  color: "text.secondary"
                }}
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
				) : (
					<h3>Loading...</h3>
				)}
			</Box>
		</>
	);
}
