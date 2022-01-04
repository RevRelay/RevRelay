import { useEffect, useState } from "react";
import {
	Box,
	Card,
	CardContent,
	Typography,
	Button,
	Grid,
	TextField
} from "@mui/material";
import APIQuery from "../API/APIQuery";
import { useNavigate, useParams } from 'react-router-dom'

export default function Search({ token }) {
	let navigate = useNavigate();
	let { searchTerm } = useParams();
	const [searchComplete, setSearchComplete] = useState('');
	const [searchResults, setSearchResults] = useState();
	useEffect(() => { FetchSearchResults(); }, []);
	/**
	 * Submits an API call searching user and group names for the search term. 
	 */
	const FetchSearchResults = async () => {
		setSearchComplete('');
		const response = await APIQuery.get(
			`/search/name/${searchTerm}`,
			{ headers: { "Authorization": "Bearer " + token } }
		).then(resp => resp);
		setSearchResults(response.data);
		setSearchComplete('true');
	}
	return (
		<Box>
			{(searchResults && searchResults[0]) ? (
				searchResults.map((x) => {
					return (SearchResultCard(x, navigate))
				})
			) : (
				searchComplete ? (
					<div>No Results Found</div>
				) : (
					<div>Loading Results</div>
				)
			)}
		</Box>
	)
}

function SearchResultCard(x, navigate) {
	function handleClickSearchResult() {
		if (x.type == "USER") {
			navigate(`/user/${x.id}`);
		}
		if (x.type == "GROUP") {
			navigate(`/group/${x.id}`);
		}
	}
	return (
		<Card sx={{ minWidth: 275 }} onClick={handleClickSearchResult}>
			<CardContent>
				<Typography variant="h5">
					{x.name}
				</Typography>
			</CardContent>
		</Card>
	)
}