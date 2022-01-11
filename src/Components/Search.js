import { useEffect, useState } from "react";
import {
	Box,
	Card,
	CardContent,
	Typography,
	ListItemButton,
	ListItemText,
	Stack,
	Avatar,
	Divider, 
} from "@mui/material";
import APIQuery from "../API/APIQuery";
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import { SearchBar } from "../typeDef";
import { getProfilePic } from "../API/UserAPI";

/**
 * Component for rendering search results. 
 * 
 * @param {SearchBar} 	searchProp 				---
 * @param {String} 		searchProp.token 		JWT token determinig user and log in information.
 * @param {Boolean}		searchProp.isSendSearch	Boolean state managing searching status.
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

	/**
	 * ---
	 */
	// TODO: React Hook useEffect has a missing dependency: 'FetchSearchResults'. Either include it or remove the dependency array
	useEffect(() => { FetchSearchResults(); }, [searchProp.isSendSearch]);
	if(!(searchResults && searchResults[0])) {
		return (
			searchComplete ? (
				<div>No Results Found</div>
			) : (
				<div>Loading Results</div>
			)
		)
	}
	let resultUsers = searchResults.filter(res => res.type === "USER")
	let resultGroups = searchResults.filter(res => res.type === "GROUP")
	return (
		<Box sx={{
			maxHeight: '100%',
			overflow: 'auto'
		}}>
			<Box sx={{
			}} >
				{resultUsers.map((x,index) => {
					return SearchResultUsers(x, index, navigate)
				})}
				<Divider />
				{resultGroups.map((x,index) => {
					return SearchResultGroups(x, index, navigate)
				})}
			</Box>
		</Box>
	)
}

/*
					
			{(searchResults && searchResults[0]) ? ( 
			) : (
				searchComplete ? (
					<div>No Results Found</div>
				) : (
					<div>Loading Results</div>
				)
			)}
*/

/**
 * Handle click results to redirect to each specific page for groups, passed a 
 * 
 * @param {Object} 				result 		Object corresponding to a search result to designate
 * 
 * Navigates a user to the Group/User ID
 */
function handleClickSearchResult(result) {
	if (result.type === "USER") {
		navigate(`/user/${result.id}`);
	}
	if (result.type === "GROUP") {
		navigate(`/group/${result.id}`);
	}
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
function SearchResultUsers(result, index, navigate) {
	/**
	 * ---
	 */

	return (result.type === "USER" ? 
		<Box key={`resultUser${index}`} sx={{ minWidth: 275 }} onClick={handleClickSearchResult(result)}>
			<ListItemButton>
				<Stack direction="row" spacing={2}>
					<Avatar
						alt={result.name}
						src={getProfilePic(result.id)}
						sx={{ width: 40, height: 40 }}
					/>
					<ListItemText primary={result.name} secondary={result.type} />	
				</Stack>
			</ListItemButton>
		</Box> : ""
	)
}

function SearchResultGroups(result, index, navigate) {
	/**
	 * ---
	 */
	
	return (result.type === "USER" ? "" :
		<Box key={`resultGroup${index}`} sx={{ minWidth: 275 }} onClick={handleClickSearchResult(result)}>
			<ListItemButton>
				<Stack direction="row" spacing={2}>
					<Avatar
						alt={result.name}
						src={getProfilePic(-1)}
						sx={{ width: 40, height: 40 }}
					/>
					<ListItemText primary={result.name} secondary={result.type} />
				</Stack>
			</ListItemButton>
		</Box> 
	)
}