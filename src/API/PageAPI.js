import axios from "axios";
import { User } from "../typeDef";
import APIQuery from "./APIQuery";

const urlConnection = "http://localhost:5000/";
export default async function getCurrentUser(JWT) {
	let axiosConfig = {
		headers: {
			Authorization: "Bearer " + JWT,
		},
	};
	return APIQuery.get("users/current", axiosConfig);
}
export async function getUserGroups(JWT, userID) {
	let axiosConfig = {
		headers: {
			Authorization: "Bearer " + JWT,
		},
	};
	return APIQuery.get("groups/getgroups/" + userID, axiosConfig);
}

export async function getPageAxios(JWT, apiRegisterUrl) {
	let axiosConfig = {
		headers: {
			Authorization: "Bearer " + JWT,
		},
	};
	return APIQuery.get(apiRegisterUrl, axiosConfig);
}

export async function getGroupsByID(JWT, id) {
	let axiosConfig = {
		headers: {
			Authorization: "Bearer " + JWT,
		},
	};
	return APIQuery.get("groups/getgroups/" + id, axiosConfig);
}
