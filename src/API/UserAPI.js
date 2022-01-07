import axios from "axios";

const urlConnection = "http://localhost:5000/"

function axiosConfig(JWT) {
    return {headers: {"Authorization":"Bearer " + JWT, "Content-Type": "application/json"}};
}

// update first name
function updateFirstName(name, userId, JWT) {
    return axios.put(urlConnection + "users/firstName/" + userId, name, 
        axiosConfig(JWT));
}

// update lastname
function updateLastName(name, userId, JWT) {
    return axios.put(urlConnection + "users/lastName/" + userId, name, 
        axiosConfig(JWT));
}

// update password
function updatePassword(passwords, userId, JWT) {
    return axios.put(urlConnection + "users/password/" + userId, passwords,
        axiosConfig(JWT));
}

// update displayname
function updateDisplayName(name, userId, JWT) {
    return axios.put(urlConnection + "users/displayName/" + userId, name, 
        axiosConfig(JWT));
}

// update email
function updateEmail(email, userId, JWT) {
    return axios.put(urlConnection + "users/email/" + userId, email, 
        axiosConfig(JWT));
}

// update birthdate
function updateBirthdate(date, userId, JWT) {
    return axios.put(urlConnection + "users/birthDate/" + userId, date, 
        axiosConfig(JWT));
}

function updateUser(user,JWT){
    return axios.put(urlConnection + "users/update", user, 
        axiosConfig(JWT));
}

/**
 * Helper function to send an API call to reset password endpoint
 * 
 * @param {Object} resetPass - An object with 3 String fields. 1 old password and 2 matching password fields 
 * @returns Returns true for a good change, false if it failed
 */
 async function passwordReset(resetPass, JWT) {
	return await axios.put(urlConnection + 'users/password', JSON.stringify(resetPass),
     axiosConfig(JWT)).then(
		(data) => data
	);
}

export { updateEmail, updateFirstName, updateLastName, updatePassword, updateDisplayName, updateBirthdate, updateUser, passwordReset};