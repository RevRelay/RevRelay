import { useState } from "react";
import {Button, Container} from "@mui/material";
import APIQuery from "../../API/APIQuery";
import {useNavigate} from 'react-router-dom'
import { LoginSharp } from "@mui/icons-material";
import LoginSplash from "./LoginSplash";
import PropTypes from 'prop-types';
import './Auth.css';

/**
 * The url of the appended login url
 */
const apiLoginUrl = '/public/users/login'

/**
 * Axios query to login a user
 * 
 * @param {*} user The user to be logged in
 * @returns The JWT of the user in the form data{jwt{*KEY*}}
 */
async function loginUser(user) {
    return await APIQuery.post(apiLoginUrl,
        JSON.stringify(user))
        .then(data => data.data.jwt)
}

/**
 * Login a user
 * 
 * @param {*} param0 The setToken parameter is passed from App to change the state
 * @returns Returns the login page with React
 */
export default function Login({ setToken }) {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
	let navigate = useNavigate();

    /**
     * Submit button is pressed login request is sent
     * 
     * @param {*} e The even of the login button being pressed, username and password are captured
     */
    const submitButton = async e => {
        e.preventDefault();
        const jwt = await loginUser({
            username,
            password
        });
        setToken(jwt);
        jwt ? navigate("/") : alert("Unable to log in.");
    }

    /**
     * The login page returned with React
     */
    return (
        <Container className="login">
            <Container className="loginform">
                <form onSubmit={submitButton}>
                    <h2>Login here</h2>
                    <label>
                        <p>Username</p>
                        <input type="text" id="username" onChange={e => setUsername(e.target.value)} />
                    </label>
                    <label>
                        <p>Password</p>
                        <input type="text" id="password" onChange={e => setPassword(e.target.value)} />
                    </label>
                    <Container className="button" >
                        <Button color="inherit" type="submit" variant="h5">Login</Button>
                    </Container>
                </form>
                <Button color="inherit" onClick={(x) => navigate("/register")}>No account? Click here!</Button>
             <LoginSplash />
             </Container>
        </Container>
    )
    //<LoginSplash /> Used for background for login page
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
  }