import axios from "axios";
import { User } from "../typeDef";

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
 * @param {string} JWT 			token determinig user and log in information.
 * @returns a Put request to the correct place to change the password for the current user.
 */
function updatePassword(passwords, JWT) {
	return axios.put(urlConnection + "users/password", passwords, axiosConfig(JWT));
}

/**
 * Updates the User's information including first name, last name, email, display name, and birth date using a put request.
 * 
 * @param {User} 	user 	Array of the user information including first name, last name, email, display name, and birth date.
 * @param {string}  JWT 	token determinig user and log in information.
 * @returns a Put request to the correct place to change the user information for the current user.
 */
function updateUser(user, JWT){
	user.birthDate = user.birthDate.toJSON();
	return axios.put(urlConnection + "users/update", user, axiosConfig(JWT));
}

export const dataURLtoFile = (dataurl, filename) => {
	const arr = dataurl.split(",");
	const mime = arr[0].match(/:(.*?);/)[1];
	const bstr = atob(arr[1]);
	let n = bstr.length;
	const u8arr = new Uint8Array(n);

	while(n--) u8arr[n] = bstr.charCodeAt(n);

	return new File([u8arr], filename, {type: mime });
}

export { updatePassword, updateUser};