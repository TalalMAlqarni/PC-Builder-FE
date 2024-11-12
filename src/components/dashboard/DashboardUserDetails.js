import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Card, CardContent, Divider, Button } from '@mui/material';

export default function DashboardUserDetails({ userId, setNullToReturn }) {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                setUserData(res.data);
            } catch (err) {
                console.error("Error fetching user data:", err);
            }
        };

        if (userId) {
            fetchUserData();
        }
    }, [userId]);

    if (!userData) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                User Details
            </Typography>

            <Card variant="outlined" sx={{ mb: 2 }}>
                <CardContent>
                    <Typography><strong>User Role:</strong> {userData.role}</Typography>
                    <Typography><strong>User ID:</strong> {userData.userId}</Typography>
                    <Typography><strong>Username:</strong> {userData.username}</Typography>
                    <Typography><strong>First Name:</strong> {userData.firstName.charAt(0).toUpperCase() + userData.firstName.slice(1)}</Typography>
                    <Typography><strong>Last Name:</strong> {userData.lastName.charAt(0).toUpperCase() + userData.lastName.slice(1)}</Typography>
                    <Typography><strong>Birth Date:</strong> {userData.birthDate}</Typography>
                    <Typography><strong>Email:</strong> {userData.email}</Typography>
                    <Typography><strong>Phone Number:</strong> {userData.phoneNumber}</Typography>

                </CardContent>
            </Card>
            <Button variant="contained" sx={{ backgroundColor: '#1A204f', color: 'white' }} onClick={() => setNullToReturn(null)}>
                Go Back
            </Button>
        </Container>
    );
}
