import axios from "axios"
import { selectJWT } from "../Components/NoAuth/JwtSlice"

const apiBaseUrl = 'http://localhost:5000/'
const baseHeaders = { "Content-Type": "application/json" }

const apiLoginUrl = 'public/users/login'

function axiosConfig() {
	let jwt = selectJWT();
	if (jwt) {
		return {
			headers: {
				"Authorization": "Bearer " + jwt,
				"Content-Type": "application/json"
			}
		};
	} else {
		return {
			headers: { "Content-Type": "application/json" }
		};
	};
}

const APIQuery = axios.create({
	baseURL: apiBaseUrl,
	headers: baseHeaders
}
);

export default APIQuery


//I'm not sure this is possible to implement the way I want to without Redux or a similar solution - NL
// /*
// const function APIQueryAuth(JWT) = axios.create({
//     baseURL: apiBaseUrl,
//     headers: {...baseHeaders, "Authorization": "Bearer " + JWT}}
//     );
// */