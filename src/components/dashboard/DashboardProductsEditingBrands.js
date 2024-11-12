import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, FormControl, Select, MenuItem, InputLabel, Alert, Box } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

export default function DashboardProductsEditingBrands({ setIsEditingBrands }) {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [newBrandName, setNewBrandName] = useState('');
    const [newProductTypeName, setNewProductTypeName] = useState('');
    const [subCategories, setSubCategories] = useState([]);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:5125/api/v1/categories')
            .then(res => {
                setCategories(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    }, [newProductTypeName]);

    const handleCategoryChange = (event) => {
        const categoryId = event.target.value;
        setSelectedCategory(categoryId);
        const selectedCat = categories.find(cat => cat.id === categoryId);
        setSubCategories(selectedCat ? selectedCat.subCategory : []);
    };

    const handleAddBrand = (event) => {
        event.preventDefault();
        setError(false);
        setSuccess(false);
        if (!selectedCategory || !newBrandName) {
            setError(true);
            return;
        }
        axios.post(`http://localhost:5125/api/v1/subcategories`, { name: newBrandName, categoryId: selectedCategory }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(() => {
                setSuccess(true);
                setNewBrandName('');
            })
            .catch(err => {
                console.error(err);
                setError(true);
            });
    };

    const handleAddProductType = (event) => {
        event.preventDefault();
        setError(false);
        setSuccess(false);
        if (!newProductTypeName) {
            setError(true);
            return;

        }
        const token = localStorage.getItem('token');
        axios.post('http://localhost:5125/api/v1/categories', { categoryName: newProductTypeName }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(() => {
                setSuccess(true);
                setNewProductTypeName('');
            })
            .catch(err => {
                console.error(err);
                setError(true);
            });
    };
    return (<div>
        <h1>Manage Product Types and Brands</h1>
        <Box sx={{ maxWidth: 400, mx: 'auto', textAlign: 'center', mt: 4 }}>

            <form onSubmit={handleAddBrand}>
                <h2>Add New Brand</h2>
                <FormControl fullWidth variant="standard" sx={{ mb: 2 }}>
                    <InputLabel>Product Type</InputLabel>
                    <Select
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                    >
                        {categories.map((category) => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.categoryName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth variant="standard" sx={{ mb: 2 }}>
                    <TextField
                        label="New Brand Name"
                        value={newBrandName}
                        onChange={(e) => setNewBrandName(e.target.value)}
                    />
                </FormControl>

                <Button variant="contained" type="submit" color="primary" fullWidth>
                    Add Brand
                </Button>
            </form>

            <form onSubmit={handleAddProductType} style={{ marginTop: '2em' }}>
                <h2>Add New Product Type</h2>
                <FormControl fullWidth variant="standard" sx={{ mb: 2 }}>
                    <TextField
                        label="Enter New Product Type"
                        value={newProductTypeName}
                        onChange={(e) => setNewProductTypeName(e.target.value)}
                    />
                </FormControl>

                <Button variant="contained" type="submit" color="primary" fullWidth>
                    Add Product Type
                </Button>
            </form>

            {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    An error occurred. Please try again.
                </Alert>
            )}
            {success && (
                <Alert severity="success" sx={{ mt: 2 }}>
                    Operation successful!
                </Alert>
            )}
        </Box>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" color='warning' style={{ fontSize: '1em', fontWeight: 'bold', width: '200px' }} startIcon={<ArrowBack />} onClick={() => setIsEditingBrands(false)}>Back</Button>
        </div>
    </div>
    );
}
