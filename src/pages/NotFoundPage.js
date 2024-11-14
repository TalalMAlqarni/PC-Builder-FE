import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'


export default function NotFoundPage() {
    const navigate = useNavigate();


    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            bgcolor="background.default"
            p={3}
        >
            <Typography variant="h2" color="error" gutterBottom>
                404 - Page Not Found
            </Typography>
            <Button variant="contained" color="error" onClick={() => navigate('/')}>
                Go to Home Page
            </Button>
        </Box>
    );
}
