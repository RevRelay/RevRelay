import axios from "axios";

const urlConnection = "http://localhost:3000/"

function axiosConfig(JWT) {
    return {headers: {"Authorization":"Bearer " + JWT}};
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

// update birthdate
function updateBirthdate(date, userId, JWT) {
    return axios.put(urlConnection + "users/birthDate/" + userId, date, 
        axiosConfig(JWT));
}


export { updateFirstName, updateLastName, updatePassword, updateDisplayName, updateBirthdate};