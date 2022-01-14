import APIQuery from "./APIQuery";

/**
 * Gets all friends for a user
 * @param {String} username username for all friends
 * @param {String} JWT do i have to explain what a darn jwt is jennica
 * @returns promise to do more comments
 */
export default async function getAllFriends(username, JWT) {
	return APIQuery.get("/pages/friends/" + username, {
		headers: {
			Authorization: "Bearer " + JWT,
		},
	});
}
