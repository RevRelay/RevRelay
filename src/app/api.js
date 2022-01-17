import axios from 'axios';
import store from './store';

// Collection of URLs for API access. Broken into fragments for durability.
const apiBaseUrl = 'http://localhost:5000/';
//const apiBaseUrl = 'http://revrelayeb-env.eba-ze4dgmbu.us-west-2.elasticbeanstalk.com/';
const apiLoginUrl = 'public/users/login'
const apiChatUrl = 'chat'
const apiChatGetUrl = 'chat/member'
const apiUserBaseUrl = 'users'
const apiCurrentUserGetUrl = apiUserBaseUrl + '/current';
const apiUserPasswordUrl = apiUserBaseUrl + '/password';
const apiUserUpdateUrl = apiUserBaseUrl + '/update'; //TODO fix on backend
const apiRegisterUrl = "/public/users/register";
const apiGroupBaseUrl = 'groups';
const apiCurrentUserGroupsGetUrl = apiGroupBaseUrl + '/getgroups';

// URLs for s3Upload and Storage (of profile pictures?); currently disabled. 
//const s3Upload = 'https://7ujmop2tw0.execute-api.us-west-2.amazonaws.com/dev/image-upload';
//const s3Storage = 'https://rev-relay-s3.s3.us-west-2.amazonaws.com';
const s3Upload = '';
const s3Storage = '';

const baseHeaders = { 'Content-Type': 'application/json' };

const state = store.getState();
let authToken = state.jwt.token;
let authHeader = { headers: {Authorization: 'Bearer ' + authToken}};

/**
 * Creates an Axios Instance using the Axios Create method.
 */
const APIQuery = axios.create({
	baseURL: apiBaseUrl,
	headers: baseHeaders,
});

export default APIQuery;

// login function
export function login({username, password}) {
	return APIQuery.post(apiLoginUrl,
		{username: username,
		password: password}
	)
}

//---------chat functions TODO: consolidate endpoints
export function getUserChats(userID) {
	// TODO: consider header param for userID instead of a goddamn path variable
	return APIQuery.get(apiChatGetUrl + '/' + userID, authHeader);
}

export function saveUserChat(chat) {
	return APIQuery.post(apiChatUrl, chat, authHeader);
}

export function addUserToChat(chatId, userID) {
	let axiosConfig = {...authHeader, params: {userID: userID}};
	return APIQuery.post(apiChatUrl + '/' + chatId + '/addUser', null, axiosConfig);
}

//---------friendsAPI.js
/**
 * Gets all friends for a user
 * @param {String} username username for all friends TODO consider making it a JWT thing
 * @returns promise to do more comments
 */
 export function getAllFriends(username) {
	return APIQuery.get('/pages/friends/' + username, authHeader);
}

//---------PageAPI.js
/**
 * @returns Promise containing a current user DTO
 */
 export function getCurrentUser() {
	return APIQuery.get(apiCurrentUserGetUrl, authHeader);
}

/**
 * @param {String} JWT 		JWT token determining user and log in information.
 * @param {String} userID 	The logged in user's userID. TODO: nobody listens, this shouldn't be here
 * @returns ---
 */
export function getUserGroups(userID) {
	return APIQuery.get(apiCurrentUserGroupsGetUrl + '/' + userID, authHeader);
}
export function getUser(userID) {
	return APIQuery.get(apiUserBaseUrl + '/' + userID, authHeader);
}

/**
 * @param {String} apiRegisterUrl 	--- TODO: what is this
 * @returns ---
 */
export function getPageAxios(apiRegisterUrl) {
	return APIQuery.get(apiRegisterUrl, authHeader);
}

/**
 * @param {String} userID 	The logged in user's userID. TODO: WHYYYYY
 * @returns ---
 */
export function getGroupsByID( userID) {
	return APIQuery.get(apiCurrentUserGroupsGetUrl + '/' + userID, authHeader);
}

//--------UserAPI
/**
 * Updates password of the user using a put request.
 *
 * @param {PasswordsToBackend} 	passwords 	Array of passwords: {current password, new password, repeated new password}.
 * @returns A Put request to the correct place (ending with 'users/password') to change the password for the current user.
 */
 export function updatePassword(passwords) {
	return APIQuery.put(apiUserPasswordUrl, passwords, authHeader);
}

/**
 * Updates the User's information including first name, last name, email, display name, and birth date using a put request.
 *
 * @param {User} user Array of the user information including first name, last name, email, display name, and birth date.
 * @returns A Put request to the correct place (ending with 'users/update') to change the user information for the current user.
 */
export function updateUser(user) {
	user.birthDate = user.birthDate.toJSON();
	return APIQuery.put(apiUserUpdateUrl, user, authHeader);
}

/**
 * Uploads a users profile picture to the s3 bucket.
 *
 * @param {String} image	URL to the user's profile picture
 * @param {String} userID	The logged in user's userID. TODO: fix on backend
 * @returns A Post request that uploads the user's profile picture to the s3 bucket.
 */
 export function uploadImage(image, userID) {
	const parts = image.split(';');
	const mime = parts[0].split(':')[1];
	const data = parts[1];
	return axios.post(s3Upload, { mime, userID, image: data });
}

/**
 * Retrieves a users profile picture from the s3 bucket, not using axios to connect but rather just accessing public url.
 * 
 * @param {String} userID The logged in user's userID. TODO: fix on backend
 * @returns The URL Link to where image is hosted.
 */
 export function getProfilePic(userID) {
	const key = `${userID}.jpg`;
	return `${s3Storage}/${key}`;
	/**
	 * SAVE: Alternative Implementation
	 * Axios.get(s3Retrieve, { key });
	 */
}

//--------App.js

/**
 * Validates the stored JWT against the database, discarding if not valid.
 * @async
 * @deprecated
 */
 async function checkJWT() {
	//console.log("Checking JWT");
	//let axiosConfig = {
	//	headers: {
	//		Authorization: "Bearer " + token,
	//	},
	//};
	let axiosConfig = authHeader;
	await APIQuery.get("/validate", axiosConfig)
		.then()
		.catch((x) => {
			//dispatch(clearJWT);
			//setToken("");
			localStorage.setItem("token", "");
		});
}

/**
 * Validate function rewritten to work as a part of an async thunk TODO: find a way to remove.
 */

export async function verifyToken(tokenToVerify) {
	let isTokenValid = true;
	await APIQuery.get("/validate", { headers: {Authorization: 'Bearer ' + tokenToVerify}})
		.then()
		.catch(() => {
			isTokenValid = false;
		});
	return isTokenValid;
}

//--------Login.js

/**
 * Axios query to login a user.
 * 
 * @deprecated
 * @async
 * @param {LoginUser}	user			The Array for a User when logging in. Does not include userID, email, display, names, or birth date.
 * @param {String} 		user.username	The logging in user's username.
 * @param {String}		user.password	The logging in user's password.
 * @returns The JWT of the user in the form data{jwt{*KEY*}}.
 */
 async function loginUser(user) {
	return await APIQuery.post(apiLoginUrl,
		JSON.stringify(user))
		.then(data => data.data.jwt)
}

//--------Register.js

/**
 * Axios query to create a user
 *
 * @deprecated
 * @param {RegisterUser} 	user 				The Array for a User when registering. Does not include userID, names, or birth date.
 * @returns The JWT of the created user in the form data{jwt{*KEY*}}
 */
export async function registerUser(user) {
	return await APIQuery.post(apiRegisterUrl, JSON.stringify(user)).then((data) => data);
}

//--------Search.js

/**
 * Submits an API call searching user and group names for the search term. 
 * @async
 */
 export async function fetchSearchResults(searchTerm, setSearchComplete, setSearchResults) {
	setSearchComplete(false);
	const response = await APIQuery.get(`/search/name/${searchTerm}`,authHeader);
	setSearchResults(response.data);
	setSearchComplete(true);
}