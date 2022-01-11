import APIQuery from "./APIQuery";

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
export default async function getCurrentUser(JWT) {
	return APIQuery.get("users/current", axiosConfig(JWT));
}

/**
 * ---
 * 
 * @async
 * @param {String} JWT 		JWT token determining user and log in information.
 * @param {String} userID 	The logged in user's userID.
 * @returns ---
 */
export async function getUserGroups(JWT, userID) {
	return APIQuery.get("groups/getgroups/" + userID, axiosConfig(JWT));
}

/**
 * ---
 * 
 * @async
 * @param {String} JWT 				JWT token determining user and log in information.
 * @param {String} apiRegisterUrl 	---
 * @returns ---
 */
export async function getPageAxios(JWT, apiRegisterUrl) {
	return APIQuery.get(apiRegisterUrl, axiosConfig(JWT));
}

/**
 * ---
 * 
 * @async
 * @param {String} JWT 		JWT token determining user and log in information.
 * @param {String} userID 	The logged in user's userID.
 * @returns ---
 */
export async function getGroupsByID(JWT, userID) {
	return APIQuery.get("groups/getgroups/" + userID, axiosConfig(JWT));
}
