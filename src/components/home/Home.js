import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Box, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AnimatedText from './AnimatedText';

export default function Home() {
    const navigate = useNavigate();
    const images = [
        'https://www.sv-comp.com/image/cache/catalog/00AHMAD/Banners/amd-X680-1140x570.webp',
        'https://image.coolblue.nl/624x351/content/3825293fe8cdd871ced381088c762d44',
        'https://builtin.com/sites/www.builtin.com/files/2022-06/pc-gaming-companies_0.jpg',
        'https://media.kingston.com/kingston/hero/ktc-hero-solutions-gaming-build-or-buy-a-gaming-pc-lg.jpg'
    ];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <Container maxWidth="md" sx={{ textAlign: 'center', mt: 5 }}>
            <Typography variant="h3" gutterBottom>
                Welcome to PC Builder!
            </Typography>
            <Typography variant="h6" color="text.secondary" paragraph>
                From Office Productivity to Video Games and Video Editing, We Help You Build the PC You Need to Do It All!
            </Typography>


            <Box sx={{ mt: 4, mb: 5 }}>
                <CardMedia
                    component="img"
                    alt="PC Building"
                    height="400"
                    image={images[currentImageIndex]}
                    sx={{ objectFit: 'cover', borderRadius: 2 }}
                />
            </Box>

            <Box sx={{ mt: 4, mb: 1, display: 'flex', gap: 2, justifyContent: 'center' }}>
                <Button
                    variant="contained"
                    size="large"
                    sx={{ backgroundColor: '#1A204f', color: 'white', px: 4, py: 2 }}
                    onClick={() => navigate('/products')}
                >
                    Start shopping
                </Button>
            </Box>

            <AnimatedText />

        </Container>
    );
}
