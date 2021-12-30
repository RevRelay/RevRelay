import axios from "axios"

const apiBaseUrl = 'http://localhost:5000/'
const baseHeaders = {"Content-Type": "application/json"}

let APIQuery
export default APIQuery = axios.create({
    baseURL: apiBaseUrl,
    headers: baseHeaders
})