import React from 'react';
import { Button, Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { Link } from "react-router-dom";

function Product({ product, cartList, setCartList }) {
    const { productId, productName, description, productPrice, productImage, productColor, sku } = product;

    function addToCart() {
        if (sku <= 0) {
            alert("Sorry, this product is out of stock.");
            return;
        }

        const existProduct = cartList.find(item => item.productId === productId);
        if (existProduct) {
            if (existProduct.quantity + 1 > sku) {
                alert("Cannot add more, stock is limited.");
                return;
            }
            setCartList(cartList.map(item => item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item));
        } else {
            setCartList([...cartList, { ...product, quantity: 1 }]);
        }
    }

    return (
        <Card sx={{ maxWidth: 345, boxShadow: 3, height: '500px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <CardMedia
                component="img"
                height="200"
                image={productImage}
                alt={productName}
                sx={{ objectFit: 'contain' }}
            />
            <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Typography variant="h6" gutterBottom align="center">{productName}</Typography>
                <Typography variant="h5" color="primary" sx={{ mt: 2 }} align="center">${productPrice}</Typography>
            </CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, padding: '0 16px' }}>
                <Link to={`${productId}`} style={{ width: '48%' }}>
                    <Button variant="contained" sx={{ backgroundColor: '#1A204f', color: 'white' }} fullWidth>More Details</Button>
                </Link>
                <Button variant="contained" color="warning" onClick={addToCart} sx={{ width: '48%' }}>Add to Cart</Button>
            </Box>
        </Card >
    );
}

export default Product;
