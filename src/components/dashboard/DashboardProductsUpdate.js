import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Alert, FormControl } from '@mui/material';

export default function DashboardProductsUpdate({ productId, setProductIdForMoreUpdate, getProducts }) {
    const [productDetails, setProductDetails] = useState({
        productName: '',
        productPrice: '',
        productImage: '',
        description: '',
        productColor: '',
        weight: '',
        sku: '',
    });

    const [error, setError] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:5125/api/v1/products/${productId}`)
            .then(res => {
                setProductDetails(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const handleUpdateProduct = (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        axios.put(`http://localhost:5125/api/v1/products/${productId}`, productDetails, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                console.log(res.data);
                getProducts();
                setProductIdForMoreUpdate(null);
            })
            .catch(err => {
                setError(true);
            });
    };

    const handleChange = (prop) => (event) => {
        setProductDetails({ ...productDetails, [prop]: event.target.value });
    };

    return (
        <>
            <h1>Update product information</h1>
            <form onSubmit={handleUpdateProduct}>
                <FormControl sx={{ m: 1, width: '80ch' }} variant="standard">
                    <TextField
                        label="Product Name"
                        value={productDetails.productName}
                        onChange={handleChange('productName')}
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: '80ch' }} variant="standard">
                    <TextField
                        label="Product Price"
                        type="number"
                        value={productDetails.productPrice}
                        onChange={handleChange('productPrice')}
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: '80ch' }} variant="standard">
                    <TextField
                        label="Product Image URL"
                        value={productDetails.productImage}
                        onChange={handleChange('productImage')}
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: '80ch' }} variant="standard">
                    <TextField
                        label="Product Description"
                        value={productDetails.description}
                        onChange={handleChange('description')}
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: '80ch' }} variant="standard">
                    <TextField
                        label="Product Color"
                        value={productDetails.productColor}
                        onChange={handleChange('productColor')}
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: '80ch' }} variant="standard">
                    <TextField
                        label="Weight"
                        type="number"
                        value={productDetails.weight}
                        onChange={handleChange('weight')}
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: '80ch' }} variant="standard">
                    <TextField
                        label="SKU"
                        type="number"
                        value={productDetails.sku}
                        onChange={(e) => setProductDetails({ ...productDetails, sku: Number(e.target.value) })}
                    />
                </FormControl>
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        An error occurred, please try again. Make sure all fields are filled correctly.
                    </Alert>
                )}
                <div>
                    <Button variant="contained" type="submit" color="primary">
                        Update Product
                    </Button>
                </div>
            </form>
        </>
    );
}

