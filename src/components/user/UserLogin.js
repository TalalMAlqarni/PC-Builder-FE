import React from 'react'
import { useState } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';



export default function UserLogin(prop) {

    const { userInfo, setToken } = prop;
    const loginUrl = `${process.env.REACT_APP_API_URL}/users/signIn`;
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const navigate = useNavigate();

    function loginUser() {
        const userInfoKeys = Object.keys(userInfo);
        for (let i = 0; i < userInfoKeys.length; i++) {
            if (userInfo[userInfoKeys[i]].trim() === '') {
                setError(true);
                setErrorMsg('All fields are required');
                setIsUserLoggedIn(false);
                return;
            }
        }
        axios
            .post(loginUrl, userInfo)
            .then((res) => {
                localStorage.setItem('token', res.data);
                setToken(res.data);
                setIsUserLoggedIn(true);
                setError(false);
            })
            .catch((err) => {
                setError(true);
                setIsUserLoggedIn(false);
                if (err.response.data.message)
                    setErrorMsg(err.response.data.message);
                else
                    setErrorMsg("Email doesn't exist, please enter a valid email address or create an account");

            });
    }
    return (
        <>

            <div>
                <Button variant="contained" sx={{ backgroundColor: '#1A204f', color: 'white' }} onClick={loginUser}>Login</Button>
            </div>
            {isUserLoggedIn ? (
                <>
                    <Alert severity="success">Login Successful</Alert>
                    <Button variant="contained" color='success' onClick={() => navigate('/user/profile')}>Go to Profile page</Button>
                </>
            ) : error ? (
                <Alert severity="error">{errorMsg}</Alert>
            ) : null}

            {!isUserLoggedIn ? (

                <div>
                    <h2>If you don't have an account, click below.</h2>
                    <Button variant="contained" sx={{ backgroundColor: '#1A204f', color: 'white' }} onClick={() => navigate('/user/register')}>Create Account</Button>
                </div>
            ) : null}


        </>
    )
}
