import React from 'react'
import UserProfile from '../components/user/UserProfile'
import UpdateUser from '../components/user/UpdateUser'
import Button from '@mui/material/Button'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'



export default function UserProfilePage(prop) {
    const { userData, setUserData, isUserUpdated, setIsUserUpdated, setIsAuthenticated } = prop;
    const navigate = useNavigate();
    return (
        <div>
            {
                isUserUpdated ? (
                    <>
                        <UserProfile userData={userData} />
                        <div style={{ marginBottom: '1rem' }}>
                            <Button variant="contained" sx={{ backgroundColor: '#1A204f', color: 'white' }} onClick={() => setIsUserUpdated(false)}>Update Profile</Button>
                        </div>
                        <div style={{ marginTop: '1rem' }}>
                            <Button variant="contained" sx={{ backgroundColor: '#1A204f', color: 'white' }} onClick={() => navigate('/user/orders')}>Order History</Button>
                        </div>
                        <div style={{ marginTop: '1rem' }}>
                            <Button variant="contained" sx={{ backgroundColor: '#1A204f', color: 'white' }} onClick={() => {
                                localStorage.removeItem('token');
                                setUserData(null);
                                setIsAuthenticated(false);
                                navigate('/user/Login');
                            }}>LOGOUT</Button>
                        </div>

                    </>
                ) : (
                    <>
                        <UpdateUser userData={userData} setIsUserUpdated={setIsUserUpdated} />
                    </>

                )
            }

        </div>
    )
}
