import {
	Box,
	Card,
	CardHeader,
	CardMedia,
	Divider,
	Grid,
	Pagination,
	Paper,
	Tab,
	Tabs,
} from "@mui/material";

import { height, maxHeight, width } from "@mui/system";
import { current } from "@reduxjs/toolkit";
import { useState } from "react";
import Color from "./Color.js";

export default function Page({ theme, themes }) {
	const [page, updatePage] = useState({
		pageID: 0,
		pageTitle: "Test",
		description: "",
		bannerURL: "https://i.imgur.com/0EtPsQK.jpeg",
		private: false,
		groupPage: false,
		userOwnerID: 0,
		groupID: 0,
	});
	const [tab, updateTab] = useState(0);
	const currnetUser = {
		userID: 0,
	};

	return (
		<Box sx={{ height: "80%" }}>
			<Box
				sx={{
					border: 1,
					borderColor: "primary.main",
					borderRadius: 2,
					borderWidth: 2,
					marginLeft: "15%",
					marginRight: "15%",
					display: "flex",
					height: "100%",

					maxWidth: "100%",
					minWidth: 500,
				}}
			>
				<div
					style={{
						maxHeight: "100%",
						flexGrow: 1,
						display: "flex",
						flexFlow: "column",
					}}
				>
					<Card sx={{ minHeight: "10vh", maxHeight: "25vh", maxWidth: "100%" }}>
						<div
							style={{
								position: "absolute",
								marginLeft: 10,
								marginTop: 10,
								minWidth: 100,
								borderRadius: 25,
							}}
						>
							<CardHeader title={page.pageTitle} />
						</div>
						<CardMedia
							style={{ objectPosition: "0 0", zIndex: 0 }}
							component="img"
							image={page.bannerURL}
							alt="green iguana"
						/>
					</Card>
					<div
						style={{
							flexGrow: 1,
							position: "relative",
							width: "100%",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Tabs
							aria-label="basic tabs example"
							centered
							value={tab}
							onChange={(x, n) => {
								updateTab(n);
							}}
						>
							<Tab label="Posts" />
							<Tab label="About" />
							{page.groupPage ? (
								<Tab label="Members" />
							) : (
								<Tab label="Friends" />
							)}
							{currnetUser.userID === page.userOwnerID ? (
								<Tab label="Settings" />
							) : (
								<></>
							)}
						</Tabs>
						<Divider sx={{ width: "100%" }} />
						<RenderTab />
					</div>
				</div>
			</Box>
		</Box>
	);

	function RenderTab() {
		switch (tab) {
			case 0:
				return <Posts />;
				break;
			case 1:
				return <About />;
				break;
			case 2:
				return <>{page.groupPage ? <Members /> : <Friends />} </>;
				break;
			case 3:
				return <Settings />;
				break;

			default:
				break;
		}
	}
	function Posts() {
		return (
			<>
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
						xs={3}
						sx={{
							position: "absolute",
							bottom: 5,
						}}
					>
						<Pagination count={10} color="primary" size="large" />
					</Grid>
				</Grid>
			</>
		);
	}
	function About() {
		return <></>;
	}
	function Members() {
		return <></>;
	}
	function Friends() {
		return <></>;
	}
	function Settings() {
		return <></>;
	}
}
