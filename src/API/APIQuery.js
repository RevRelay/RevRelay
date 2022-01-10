import axios from "axios";

const apiBaseUrl = "http://localhost:5000/";
// const apiBaseUrl =
//   "http://revrelayeb-env.eba-ze4dgmbu.us-west-2.elasticbeanstalk.com/";
const baseHeaders = { "Content-Type": "application/json" };

const APIQuery = axios.create({
  baseURL: apiBaseUrl,
  headers: baseHeaders,
});

export default APIQuery;

//I'm not sure this is possible to implement the way I want to without Redux or a similar solution - NL
// /*
// const function APIQueryAuth(JWT) = axios.create({
//     baseURL: apiBaseUrl,
//     headers: {...baseHeaders, "Authorization": "Bearer " + JWT}}
//     );
// */
