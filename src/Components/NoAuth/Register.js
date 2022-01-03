import React, { useState } from "react";
import PropTypes from 'prop-types';
import {useNavigate} from 'react-router-dom'
import APIQuery from "../../API/APIQuery";
import {Button, Container} from "@mui/material";
import { userLen, passLen, displayNameLen } from "./RegisterConfig";
import LoginSplash from "./LoginSplash";
import './Auth.css';

/**
 * The url of the appended register url
 */
const apiRegisterUrl = '/public/users/register'

/**
 * Axios query to create a user
 * 
 * @param {*} user The user to be created
 * @returns The JWT of the created user in the form data{jwt{*KEY*}}
 */
async function registerUser(user) {
    return await APIQuery.post(apiRegisterUrl,
        JSON.stringify(user))
        .then(data => data)
}

/**
 * Takes a user and checks if the user is valid, then returns negation of truthy or falsy of the message
 * 
 * @param {} user The object to check for validity
 * @returns returns negation of truthy or falsy of the image
 */
function validInputRegister(user){
    let message = "";
    if( !(user.username && user.username.length >= userLen )){
        message += `Minimum username length ${userLen} \n`;
    }
    if( !(user.password && user.password.length >= passLen )){
        message += `Minimum password length ${passLen} \n`;
    }
    if(!user.email){
        message += "A valid email is required"
    }
    if( !(user.displayName && user.displayName.length >= displayNameLen )){
        message += `Minimum display name length ${displayNameLen} \n`;
    }
    if(message){
        alert(message);
    }
    return(!message);
}

/**
 * Registering a user
 * 
 * @param {*} param0 The token to return the JWT to the parent function
 * @returns returns the React webpage for registering
 */
export default function Register({ setToken, token }) {
    /**
     * React useState to watch for userName and password
     */
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const [displayName, setDisplayName] = useState();
	let navigate = useNavigate();

    //Submission of the user's information and returning of a jwt
    const submitButton = async e => {
        e.preventDefault();
        if(validInputRegister({
            username,
            password,
            email,
            displayName})){
            e.preventDefault();
            let response;
            try{
                response = await registerUser({
                    username,
                    password,
                    email,
                    displayName
                });
                setToken(response.data.jwt);
                navigate("/");
            } catch (Error) {
                alert(`Error: ${(Error?.response?.data)}`);
            }
        }
    }

    const registerSize = 19;

    /**
     * The register page returned with react
     */
    return (
            <Container className="register">
                <Container className="registerform">
                <h1>Welcome to the Future of Social Media</h1>
                <br></br>
                    <form onSubmit={submitButton}>
                        <label>
                            <p>Username</p>
                            <input type="text" onChange={e => setUsername(e.target.value)} />
                        </label>
                        <label>
                            <p>Password</p>
                            <input type="password" onChange={e => setPassword(e.target.value)} />
                        </label>
                        <label>
                            <p>Email</p>
                            <input type="email" onChange={e => setEmail(e.target.value)} />
                        </label>
                        <label>
                            <p>Display Name</p>
                            <input type="displayName" onChange={e => setDisplayName(e.target.value)} />
                        </label>
                        <Container className="button">
                            <Button color="inherit" type="submit">Submit</Button>
                        </Container>
                    </form>
                    <Button color="inherit" onClick={(x) => navigate("/login")}>Already have an account? Click here.</Button>
                </Container>
                {
                    token ? 
                    <></> :
                    <LoginSplash />
                }
            </Container>
    )
}
//<LoginSplash /> Used for background for register page

Register.propTypes = {
    setToken: PropTypes.func.isRequired
};