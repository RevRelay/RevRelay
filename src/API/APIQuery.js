import axios from "axios";

const apiBaseUrl = "http://localhost:5000/";
//const apiBaseUrl = "http://revrelayeb-env.eba-ze4dgmbu.us-west-2.elasticbeanstalk.com/";
const apiLoginUrl = 'public/users/login'


const baseHeaders = { "Content-Type": "application/json" };

/**
 * Creates an Axios Instance using the Axios Create method.
 */
const APIQuery = axios.create({
	baseURL: apiBaseUrl,
	headers: baseHeaders,
});

export default APIQuery;

export function apiLogin({username, password}) {
	return async function apiLoginThunk(dispatch, getState) {
		console.log(username);
		console.log(password);
		let response = await APIQuery.post(
			apiLoginUrl,
			{
				username: {username},
				password: {password},
			},
		)
		dispatch({ type: 'user/setJWT', payload: response.jwt})
	}
}