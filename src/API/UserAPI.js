import axios from "axios";
import Axios from 'axios';
import { User } from "../typeDef";

const urlConnection = "http://localhost:5000/"
const s3Upload = "https://i9gd5w6v12.execute-api.us-west-2.amazonaws.com/dev/image-upload"
const s3Storage = "https://justin-sherfey-s3.s3.us-west-2.amazonaws.com"

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
	//user.birthDate = user.birthDate.toJSON();
	return axios.put(urlConnection + "users/update", user, axiosConfig(JWT));
}

/**
 * Uploads a users profile picture to s3
 * 
 * @param {image} image 
 * @returns axios call to database
 */
function uploadImage(image, userId) {
	const parts = image.split(';');
	const mime = parts[0].split(':')[1];
	const data = parts[1];

	return Axios.post(s3Upload, { mime, userId, image: data});
}

/**
 * Retrieves a users profile picture from the s3 bucket, not using axios to connect but rather just accessing public url
 * 
 * @param {*} userId 
 * @returns link to where image is hosted
 */
function getProfilePic(userId) {
	const key = `${userId}.jpg`;
	return `${s3Storage}/${key}`;
	//Axios.get(s3Retrieve, { key }); alternative implementation, save comment
}


export { updatePassword, updateUser, uploadImage, getProfilePic };