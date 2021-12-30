import { Card, CardHeader, CardMedia, Divider, Tab, Tabs } from "@mui/material";
import { maxHeight, width } from "@mui/system";
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
		groupPage: true,
		userOwnerID: 0,
		groupID: 0,
	});
	const currnetUser = {
		userID: 0,
	};
	return (
		<div style={{ backgroundColor: Color(3, theme, themes), height: "100vh" }}>
			<div
				style={{
					marginLeft: "15%",
					marginRight: "15%",
					display: "flex",
					height: "100%",
				}}
			>
				<div style={{ flexGrow: 1 }}>
					<Card
						sx={{ minWidth: "100vh", minHeight: "10vh", maxHeight: "25vh" }}
					>
						<div
							style={{
								backgroundColor: Color(3, theme, themes),
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
					<div style={{ flexGrow: 1 }}>
						<Tabs
							aria-label="basic tabs example"
							centered
							value={0}
							style={{ backgroundColor: Color(1, theme, themes) }}
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
					</div>
				</div>
			</div>
		</div>
	);
}
