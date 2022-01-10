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
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import { JWTs } from "../typeDef";

/**
 * Component for rendering search results. 
 * 
 * @param {JWTs} 	searchProp 			The Array for an object that just contains a JWT
 * @param {string} 	searchProp.token 	JWT token determinig user and log in information.
 * @returns Component containing search results in Card format, as well as a message
 * 			displaying "Loading" or "No Results Found". 
 */
export default function Search(searchProp) {
	let navigate = useNavigate();
	let { searchTerm } = useParams();

	/**
	 * Boolean for whether the search request to the API has completed. Used for
	 * rendering a loading message versus a "no results found" message. 
	 */
	const [searchComplete, setSearchComplete] = useState('');
	const [searchResults, setSearchResults] = useState();

	/**
	 * Submits an API call searching user and group names for the search term. 
	 * @async
	 */
	const FetchSearchResults = async () => {
		setSearchComplete('');
		const response = await APIQuery.get(
			`/search/name/${searchTerm}`,
			{ headers: { "Authorization": "Bearer " + searchProp.token } }
		).then(resp => resp);
		setSearchResults(response.data);
		setSearchComplete('true');
	}
	useEffect(() => { FetchSearchResults(); }, [sendSearch]);
	return (
		<Box>
			{(searchResults && searchResults[0]) ? (
				searchResults.map((x, index) => {
					return (SearchResultCard(x, index, navigate))
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

/**
 * Provides a mappable page element for search results. At this time of this comment (220105)
 * functions to map DisplayName or GroupName (whichever is appropriate for the result) to a 
 * Card element that redirects the user to the appropriate Page on click. 
 * Future development - include profile/wall picture; include marker of User vs Group. 
 * 
 * @param {Object} 				result 		Object corresponding to a SearchResultItem returned from the backend. 
 * @param {number}				index
 * @param {NavigateFunction} 	navigate 	useNavigate hook from exported function (React didn't like it
* 							  		when I made a separate one inside this method).
 * @returns A Card element labeled with the SearchResultItem name that redirects the user to 
 * 			the appropriate Page on click. 
 */
function SearchResultCard(result, index, navigate) {
	/**
	 * 
	 */
	function handleClickSearchResult() {
		if (result.type == "USER") {
			navigate(`/user/${result.id}`);
		}
		if (result.type == "GROUP") {
			navigate(`/group/${result.id}`);
		}
	}
	return (
		<Card key={`result${index}`} sx={{ minWidth: 275 }} onClick={handleClickSearchResult}>
			<CardContent>
				<Typography variant="h5">
					{result.name}
				</Typography>
			</CardContent>
		</Card>
	)
}