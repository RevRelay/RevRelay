import APIQuery from "./APIQuery";

export default async function getUserChats(JWT, userID) {
	let axiosConfig = {
		headers: {
			Authorization: "Bearer " + JWT,
		},
	};
	return APIQuery.get("chat/member/" + userID, axiosConfig);
}

export async function saveUserChat(JWT, chat) {
	let axiosConfig = {
		headers: {
			Authorization: "Bearer " + JWT,
		},
	};
	return APIQuery.post("chat", chat, axiosConfig);
}

export async function addUserToChat(JWT, chatId, userID) {
	let axiosConfig = {
		headers: {
			Authorization: "Bearer " + JWT,
		},
		params: { userID: userID },
	};
	return APIQuery.post("chat/" + chatId + "/addUser", null, axiosConfig);
}
