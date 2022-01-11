import axios from "axios";
import { User, PasswordsToBackend } from "../typeDef";
import APIQuery from "./APIQuery";

const s3Upload = "https://7ujmop2tw0.execute-api.us-west-2.amazonaws.com/dev/image-upload";
const s3Storage = "https://rev-relay-s3.s3.us-west-2.amazonaws.com";

/**
 * Axios configuration that all other functions in file uses.
 *
 * @param {String} JWT JWT token determining user and log in information.
 * @returns Axios configuration for the given JWT token.
 */
function axiosConfig(JWT) {
	return {
		headers: {
			Authorization: "Bearer " + JWT,
			"Content-Type": "application/json",
		},
	};
}

/**
 * Updates password of the user using a put request.
 *
 * @param {PasswordsToBackend} 	passwords 	Array of passwords: {current password, new password, repeated new password}.
 * @param {String} 				JWT 		JWT token determinig user and log in information.
 * @returns A Put request to the correct place (ending with "users/password") to change the password for the current user.
 */
function updatePassword(passwords, JWT) {
	return APIQuery.put("users/passord", passwords, axiosConfig(JWT));
}

/**
 * Updates the User's information including first name, last name, email, display name, and birth date using a put request.
 *
 * @param {User} 	user 	Array of the user information including first name, last name, email, display name, and birth date.
 * @param {String}	JWT 	JWT token determinig user and log in information.
 * @returns A Put request to the correct place (ending with "users/update") to change the user information for the current user.
 */
function updateUser(user, JWT) {
	user.birthDate = user.birthDate.toJSON();
	return APIQuery.put("users/update", user, axiosConfig(JWT));
}

/**
 * Uploads a users profile picture to the s3 bucket.
 *
 * @param {String} image	URL to the user's profile picture
 * @param {String} userID	The logged in user's userID.
 * @returns A Post request that uploads the user's profile picture to the s3 bucket.
 */
function uploadImage(image, userID) {
	const parts = image.split(";");
	const mime = parts[0].split(":")[1];
	const data = parts[1];
	return axios.post(s3Upload, { mime, userID, image: data });
}

/**
 * Retrieves a users profile picture from the s3 bucket, not using axios to connect but rather just accessing public url.
 * 
 * @param {String} userID The logged in user's userID.
 * @returns The URL Link to where image is hosted.
 */
function getProfilePic(userID) {
	const key = `${userID}.jpg`;
	return `${s3Storage}/${key}`;
	/**
	 * SAVE: Alternative Implementation
	 * Axios.get(s3Retrieve, { key });
	 */
}

export { updatePassword, updateUser, uploadImage, getProfilePic };
