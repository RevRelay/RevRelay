import axios from "axios";

const apiBaseUrl = "http://localhost:5000/";
// const apiBaseUrl = "http://revrelayeb-env.eba-ze4dgmbu.us-west-2.elasticbeanstalk.com/";
const baseHeaders = { "Content-Type": "application/json" };

/**
 * Creates an Axios Instance using the Axios Create method.
 */
const APIQuery = axios.create({
	baseURL: apiBaseUrl,
	headers: baseHeaders,
});

export default APIQuery;
