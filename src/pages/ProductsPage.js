import React, { useState } from 'react';
import Products from '../components/products/Products';
import Form from '../components/form/Form';
import RangeSlider from '../components/rangeForm/RangeForm';
import { Box, Container, Typography, Grid } from '@mui/material';

function ProductsPage({ allProductList, cartList, setCartList }) {
    const [userInput, setUserInput] = useState('');
    const [value, setValue] = React.useState([0, 3000]);

    return (
        <Container maxWidth="lg" sx={{ mt: 5 }}>
            <Typography variant="h4" gutterBottom>
                Find Your Perfect PC Components
            </Typography>

            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 3,
                mb: 3,
                padding: '0 16px',
                flexWrap: 'wrap',
                maxWidth: '100%'
            }}>

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>Search for Products</Typography>
                    <Form setUserInput={setUserInput} placeholder="Enter Any Keyword..." />
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>Select Price Range</Typography>
                    <RangeSlider setValue={setValue} />
                </Box>
            </Box>

            <Products
                allProductList={allProductList}
                userInput={userInput}
                value={value}
                cartList={cartList}
                setCartList={setCartList}
            />
        </Container>
    );
}

export default ProductsPage;
