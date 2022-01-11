import APIQuery from "./APIQuery";

<<<<<<< HEAD
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
 * ---
 * 
 * @async
 * @param {String} JWT JWT token determining user and log in information.
 * @returns ---
 */
=======
// const urlConnection = "http://localhost:5000/";
const urlConnection =
	"http://revrelayeb-env.eba-ze4dgmbu.us-west-2.elasticbeanstalk.com/";
>>>>>>> origin/main
export default async function getCurrentUser(JWT) {
	return APIQuery.get("users/current", axiosConfig(JWT));
}

/**
 * ---
<<<<<<< HEAD
 * 
 * @async
 * @param {String} JWT 		JWT token determining user and log in information.
 * @param {String} userID 	The logged in user's userID.
=======
 *
 * @param {String} JWT 		---
 * @param {String} userID 	---
>>>>>>> origin/main
 * @returns ---
 */
export async function getUserGroups(JWT, userID) {
	return APIQuery.get("groups/getgroups/" + userID, axiosConfig(JWT));
}

/**
 * ---
<<<<<<< HEAD
 * 
 * @async
 * @param {String} JWT 				JWT token determining user and log in information.
=======
 *
 * @param {String} JWT 				---
>>>>>>> origin/main
 * @param {String} apiRegisterUrl 	---
 * @returns ---
 */
export async function getPageAxios(JWT, apiRegisterUrl) {
	return APIQuery.get(apiRegisterUrl, axiosConfig(JWT));
}

/**
 * ---
<<<<<<< HEAD
 * 
 * @async
 * @param {String} JWT 		JWT token determining user and log in information.
 * @param {String} userID 	The logged in user's userID.
=======
 *
 * @param {String} JWT 	---
 * @param {String} ID 	---
>>>>>>> origin/main
 * @returns ---
 */
export async function getGroupsByID(JWT, userID) {
	return APIQuery.get("groups/getgroups/" + userID, axiosConfig(JWT));
}
