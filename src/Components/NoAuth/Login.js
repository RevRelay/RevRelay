import { useState } from "react";
import {Button} from "@mui/material";
import APIQuery from "./APIQuery";
import {useNavigate} from 'react-router-dom'
import { LoginSharp } from "@mui/icons-material";
import LoginSplash from "./LoginSplash";
import PropTypes from 'prop-types'
import './Auth.css'


const apiLoginUrl = '/public/users/login'

async function loginUser(user) {
    return await APIQuery.post(apiLoginUrl,
        JSON.stringify(user))
        .then(data => data.data.jwt)
}

export default function Login({setToken}) {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
	let navigate = useNavigate();

    const submitButton = async e => {
        e.preventDefault();
        const jwt = await loginUser({
            username,
            password
        });
        console.log(jwt);
        console.log(setToken);
        setToken(jwt);
        //console.log(setToken);
        console.log(setToken)
    }

    return (
        <div className="login">
            <div className="form">
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
                    <div className="button" >
                        <Button color="inherit" type="submit" variant="h6">Login</Button>
                    </div>
                </form>
                <Button color="inherit" onClick={(x) => navigate("/register")}>No account? Click here!</Button>
             </div>
            <LoginSplash />
        </div>
    )

}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
  }