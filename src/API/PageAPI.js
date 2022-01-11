import APIQuery from "./APIQuery";

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
export async function getUser(JWT, userID) {
	let axiosConfig = {
		headers: {
			Authorization: "Bearer " + JWT,
		},
	};
	return APIQuery.get("users/" + userID, axiosConfig);
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
