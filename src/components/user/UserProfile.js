import React from 'react';
import { Box, Container, Typography, Card, CardContent, Divider } from '@mui/material';

export default function UserProfile({ userData }) {
    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                User Profile
            </Typography>

            <Card variant="outlined" sx={{ mb: 2 }}>
                <CardContent>
                    <Typography variant="h6" color="text.secondary">
                        {userData.role} Information
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Typography><strong>Username:</strong> {userData.username}</Typography>
                    <Typography><strong>First Name:</strong> {userData.firstName.charAt(0).toUpperCase() + userData.firstName.slice(1)}</Typography>
                    <Typography><strong>Last Name:</strong> {userData.lastName.charAt(0).toUpperCase() + userData.lastName.slice(1)}</Typography>
                    <Typography><strong>Birth Date:</strong> {userData.birthDate}</Typography>
                </CardContent>
            </Card>

            <Card variant="outlined" sx={{ mb: 2 }}>
                <CardContent>
                    <Typography variant="h6" color="text.secondary">
                        Contact Information
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Typography><strong>Email:</strong> {userData.email}</Typography>
                    <Typography><strong>Phone Number:</strong> {userData.phoneNumber}</Typography>
                </CardContent>
            </Card>
        </Container>
    );
}
