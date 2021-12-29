import { useState } from 'react';

//Default function to create and get a token (jwt)
export default function useToken() {
    //Function to get a token from memory if it existss
    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken?.token
    };

    //useState for tokens
    const [token, setToken] = useState(getToken());

    //Saving a token recieved from the backend
    const saveToken = userToken => {
        sessionStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken);
    };

    //Returning a token and setting the token
    return {
        setToken: saveToken,
        token
    }
}