import APIQuery from "./APIQuery";

// const urlConnection = "http://localhost:5000/";
const urlConnection =
	"https://revrelayeb-env.eba-ze4dgmbu.us-west-2.elasticbeanstalk.com/";
export default async function getCurrentUser(JWT) {
	let axiosConfig = {
		headers: {
			Authorization: "Bearer " + JWT,
		},
	};
	return APIQuery.get("users/current", axiosConfig);
}

/**
 * ---
 *
 * @param {String} JWT 		---
 * @param {String} userID 	---
 * @returns ---
 */
export async function getUserGroups(JWT, userID) {
	let axiosConfig = {
		headers: {
			Authorization: "Bearer " + JWT,
		},
	};
	return APIQuery.get("groups/getgroups/" + userID, axiosConfig);
}

/**
 * ---
 *
 * @param {String} JWT 				---
 * @param {String} apiRegisterUrl 	---
 * @returns ---
 */
export async function getPageAxios(JWT, apiRegisterUrl) {
	let axiosConfig = {
		headers: {
			Authorization: "Bearer " + JWT,
		},
	};
	return APIQuery.get(apiRegisterUrl, axiosConfig);
}

/**
 * ---
 *
 * @param {String} JWT 	---
 * @param {String} ID 	---
 * @returns ---
 */
export async function getGroupsByID(JWT, ID) {
	let axiosConfig = {
		headers: {
			Authorization: "Bearer " + JWT,
		},
	};
	return APIQuery.get("groups/getgroups/" + ID, axiosConfig);
}
