import React, { useState } from 'react'
import Button from '@mui/material/Button'
import axios from 'axios'
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

export default function UserRegister(prop) {

    const { userInfo } = prop;
    const createUserUrl = `${process.env.REACT_APP_API_URL}/users`;
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [isUserRegistered, setIsUserRegistered] = useState(false);
    const navigate = useNavigate();


    function createUser() {
        const userInfoKeys = Object.keys(userInfo);
        for (let i = 0; i < userInfoKeys.length; i++) {
            if (userInfo[userInfoKeys[i]].trim() === '') {
                setError(true);
                setIsUserRegistered(false);
                return;
            }
        }
        axios
            .post(createUserUrl, userInfo)
            .then((res) => {
                setIsUserRegistered(true);
                setError(false);
            })
            .catch((err) => {
                setError(true);
                setIsUserRegistered(false);
                if (err.response.data.message)
                    setErrorMsg(err.response.data.message);
                if (err.response.data.title)
                    setErrorMsg("Date is not valid, please enter the birth date in the format YYYY-MM-DD");
                console.log(err);
            });
    }

    return (
        <>
            <div>
                <Button variant="contained" sx={{ backgroundColor: '#1A204f', color: 'white' }} onClick={createUser}>Create Account</Button>
            </div>


            {error && (
                <div>
                    {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
                    {Object.entries(userInfo).map(([key, value]) => {
                        if (!value) {
                            const formattedKey = key.replace(/([A-Z])/g, ' $1').toLowerCase();
                            const capitalizedKey = formattedKey.charAt(0).toUpperCase() + formattedKey.slice(1);
                            return <Alert key={key} severity="error">{capitalizedKey} is empty</Alert>
                        }
                        return null;
                    })}
                </div>
            )}


            {isUserRegistered && (
                <>
                    <div>
                        <Alert severity="success" >User Registered Successfully, Now you can login</Alert>
                    </div>
                    <div>
                        <Button variant="contained" color='success' onClick={() => navigate('/user/login')}>Go to Login page</Button>
                    </div>
                </>
            )}


        </>

    )
}

