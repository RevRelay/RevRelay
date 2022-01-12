import {
	Button,
	FormControlLabel,
	FormGroup,
	TextField,
	Switch,
	Card,
	CardHeader,
	Stack,
} from "@mui/material";
import APIQuery from "../../API/APIQuery";
import { useState } from "react";
import { Box } from "@mui/system";
import { ToastContainer, toast } from "react-toastify";
import { PageSingle } from "../../typeDef";
import { useNavigate } from "react-router-dom";

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
	const navigate = useNavigate();

	console.log(pageSetting.token);
	let axiosConfig = {
		headers: {
			Authorization: "Bearer " + pageSetting.token,
		},
	};

	console.log(pageSetting.token);

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

	/**
 * ---
 * @async
 * @param {String} groupID ---
 */
	const deleteGroup = async () => {
		await APIQuery.delete("/groups/" + pageSetting.page.groupID, axiosConfig).catch((e) => { }); //since this is attached to a group component, we're guaranteed that it exists to delete it
		//update front end
		navigate("/user/profile");
	};


	return (
		<>
			<ToastContainer />
			<Box
				sx={{
					marginLeft: "5%",
					marginRight: "5%",
					maxWidth: "100%",
				}}
			>
				{!loading ? (
					<>
						<Box sx={{ width: "100%", mt: 2 }}>
							<Card sx={{ mx: 'auto', width: "75%", pl: 5, pr: 5, pb: 2 }}>
								<CardHeader title="Settings" />
								<Stack spacing={2}>
									<TextField
										value={description}
										label="Description"
										fullWidth
										multiline
										rows={4}
										onChange={(e) => changeDescription(e)}
									/>

									<TextField
										value={bannerURL}
										label="URL of Banner"
										onChange={(e) => changeURL(e)}
									/>

									<FormGroup>
										<FormControlLabel
											control={
												<Switch onChange={togglePrivacy} checked={form.private} />
											}
											label="Private Page"
										/>
									</FormGroup>

								</Stack>

							</Card>

							<center>
								<Box sx={{ pt: '2%' }}>
									<Button
										variant="contained"
										onClick={() => {
											saveChanges();
										}}
									>
										Save Page Settings
									</Button>
									{pageSetting.page.isGroupPage ? (
										<Button
											variant="contained"
											color="error"
											onClick={() => {
												deleteGroup();
											}}
										>
											Delete Group
										</Button>
									) : (<></>)}
								</Box>
							</center>

						</Box>
					</>
				) : (
					<h3>Loading...</h3>
				)}
			</Box>
		</>
	);
}
