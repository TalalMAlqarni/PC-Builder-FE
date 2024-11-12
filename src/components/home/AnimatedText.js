import React from 'react';
import { Typography } from '@mui/material';

export default function AnimatedText() {
    return (
        <Typography
            variant="h6"
            color="text.secondary"
            paragraph
            sx={{
                display: 'inline-block',
                fontWeight: 'bold',
                animation: 'changeColor 10s ease-in-out infinite',
                '@keyframes changeColor': {
                    '0%': { color: '#1A204f' },
                    '50%': { color: '#ffff' },
                    '100%': { color: '#1A204f' },
                },
            }}
        >
            Start shopping now and explore the finest components to build the perfect PC, tailored to meet your unique needs.
        </Typography>
    );
}
