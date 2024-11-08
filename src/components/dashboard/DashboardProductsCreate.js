import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, FormControl, Select, MenuItem, InputLabel, Alert } from '@mui/material';

export default function DashboardProductsCreate({ setIsAdding, getProducts }) {
    const [productDetails, setProductDetails] = useState({
        productName: '',
        productPrice: '',
        productImage: '',
        description: '',
        productColor: '',
        weight: '',
        sku: '',
        subCategoryId: '',
    });

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [subCategories, setSubCategories] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5125/api/v1/categories')
            .then(res => {
                setCategories(res.data);
                console.log(categories);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const [error, setError] = useState(false);
    const handleAddProduct = (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        axios.post('http://localhost:5125/api/v1/products', productDetails, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                console.log(res.data);
                getProducts();
                setIsAdding(false);
            })
            .catch(err => {
                setError(true);
            });
    };

    const handleChange = (prop) => (event) => {
        setProductDetails({ ...productDetails, [prop]: event.target.value });
    };

    const handleCategoryChange = (event) => {
        const categoryId = event.target.value;
        setSelectedCategory(categoryId);
        const selectedCat = categories.find(cat => cat.id === categoryId);
        setSubCategories(selectedCat ? selectedCat.subCategory : []);
    };

    const handleSubCategoryChange = (event) => {
        setProductDetails({ ...productDetails, subCategoryId: event.target.value });
    };

    return (
        <>
            <h1>Enter new product information</h1>
            <form onSubmit={handleAddProduct}>

                {/* category Dropdown = product type */}
                <div>
                    <FormControl sx={{ m: 1, width: '80ch' }} variant="standard">
                        <InputLabel>Product Type</InputLabel>
                        <Select
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            sx={{ width: '80ch' }}
                        >
                            {categories.map((category) => (
                                <MenuItem key={category.id} value={category.id}>
                                    {category.categoryName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

                {/* Subcategory Dropdown = brand */}
                <div>
                    <FormControl sx={{ m: 1, width: '80ch' }} variant="standard">
                        <InputLabel>Product Brand</InputLabel>
                        <Select
                            value={productDetails.subCategoryId}
                            onChange={handleSubCategoryChange}
                            sx={{ width: '80ch' }}
                            disabled={!selectedCategory}
                        >
                            {subCategories.map((subCat) => (
                                <MenuItem key={subCat.subCategoryId} value={subCat.subCategoryId}>
                                    {subCat.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

                <div>
                    <FormControl sx={{ m: 1, width: '80ch' }} variant="standard">
                        <TextField
                            label="Product Name"
                            value={productDetails.productName}
                            onChange={handleChange('productName')}
                            sx={{ width: '80ch' }}
                        />
                    </FormControl>
                </div>
                <div>
                    <FormControl sx={{ m: 1, width: '80ch' }} variant="standard">
                        <TextField
                            label="Product Price"
                            type="number"
                            value={productDetails.productPrice}
                            onChange={handleChange('productPrice')}
                            sx={{ width: '80ch' }}
                        />
                    </FormControl>
                </div>
                <div>
                    <FormControl sx={{ m: 1, width: '80ch' }} variant="standard">
                        <TextField
                            label="Product Image URL"
                            value={productDetails.productImage}
                            onChange={handleChange('productImage')}
                            sx={{ width: '80ch' }}
                        />
                    </FormControl>
                </div>
                <div>
                    <FormControl sx={{ m: 1, width: '80ch' }} variant="standard">
                        <TextField
                            label="Product Description"
                            value={productDetails.description}
                            onChange={handleChange('description')}
                            sx={{ width: '80ch' }}
                        />
                    </FormControl>
                </div>
                <div>
                    <FormControl sx={{ m: 1, width: '80ch' }} variant="standard">
                        <TextField
                            label="Product Color"
                            value={productDetails.productColor}
                            onChange={handleChange('productColor')}
                            sx={{ width: '80ch' }}
                        />
                    </FormControl>
                </div>
                <div>
                    <FormControl sx={{ m: 1, width: '80ch' }} variant="standard">
                        <TextField
                            label="Weight"
                            type="number"
                            value={productDetails.weight}
                            onChange={handleChange('weight')}
                            sx={{ width: '80ch' }}
                        />
                    </FormControl>
                </div>
                <div>
                    <FormControl sx={{ m: 1, width: '80ch' }} variant="standard">
                        <TextField
                            label="SKU"
                            type="number"
                            value={productDetails.sku}
                            onChange={(e) => setProductDetails({ ...productDetails, sku: Number(e.target.value) })}
                            sx={{ width: '80ch' }}
                        />
                    </FormControl>
                </div>
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        An error occurred, please try again. Make sure all fields are filled correctly.
                    </Alert>
                )}

                <Button variant="contained" type="submit" color="primary">
                    Add Product
                </Button>
            </form>
        </>
    );
}
