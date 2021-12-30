import React, { useState } from "react";
import PropTypes from 'prop-types';
import {useNavigate} from 'react-router-dom'
import APIQuery from "./APIQuery";
import {Button} from "@mui/material";
import { userLen, passLen, displayNameLen } from "./RegisterConfig";
import './Auth.css';

//Constants to query the API
const apiRegisterUrl = '/public/users/register'

//Axios query to create a user
async function registerUser(user) {
    return await APIQuery.post(apiRegisterUrl,
        JSON.stringify(user))
        .then(data => data)
        //.catch(error => error.response)
}

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

//Registers a user
export default function Register({ setToken }) {
    //Defining useNavigate for use later
    // const navigate = useNavigate();
    //React useState to watch for userName and password
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

    //Returning React HTML information to render a register page
    return (
            <div className="register">
                <div className="form">
                <h1>Welcome to the Future of Social Media</h1>
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
                        <div className="button">
                            <Button color="inherit" type="submit">Submit</Button>
                        </div>
                    </form>
                    <Button color="inherit" onClick={(x) => navigate("/login")}>Already have an account? Click here.</Button>
                </div>
            </div>
    )
}
//<LoginSplash /> Used for background for register page

Register.propTypes = {
    setToken: PropTypes.func.isRequired
};