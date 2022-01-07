import axios from "axios";

const urlConnection = "http://localhost:5000/"

/**
 * Axios configuration that all other functions in file uses.
 * 
 * @param {string} JWT token determinig user and log in information.
 * @returns Axios configuration for the given JWT
 */
function axiosConfig(JWT) {
	return {headers: {"Authorization":"Bearer " + JWT, "Content-Type": "application/json"}};
}

/**
 * Updates password of the user using a put request.
 * 
 * @param {object} passwords 	Array of passwords: {current password, new password, repeated new password}.
 * @param {number} userID 		the userID of the current user.
 * @param {string} JWT 			token determinig user and log in information.
 * @returns a Put request to the correct place to change the password for the current user.
 */
function updatePassword(passwords, userID, JWT) {
	return axios.put(urlConnection + "users/password/" + userID, passwords, axiosConfig(JWT));
}

/**
 * Updates the User's information including first name, last name, email, display name, and birth date using a put request.
 * 
 * @param {USER} 	user 	Array of the user information including first name, last name, email, display name, and birth date.
 * @param {string}  JWT 	token determinig user and log in information.
 * @returns a Put request to the correct place to change the user information for the current user.
 */
//function updateUser(user, JWT){
//	return axios.put(urlConnection + "users/update", user, axiosConfig(JWT));
//}

function updateUser(user, JWT){
	user.birthDate = user.birthDate.toJSON();
	return axios.put(urlConnection + "users/current", user, axiosConfig(JWT));
}

export { updatePassword, updateUser};