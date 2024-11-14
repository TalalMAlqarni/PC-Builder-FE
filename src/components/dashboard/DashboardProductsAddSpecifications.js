import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Alert, FormControl } from '@mui/material';

export default function DashboardProductsAddSpecifications({ productId, setAddSpecifications }) {

    const [productType, setProductType] = useState('');
    const [productName, setProductName] = useState('');
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/categories/products/${productId}`)
            .then(res => {
                console.log(res.data);
                setProductType(res.data.categoryName);
                setProductName(res.data.productName);
            })
            .catch(err => {
                console.log(err);
            });
    }, [productId]);


    const [specifications, setSpecifications] = useState({
        productId: productId,
        productName: '',
        productType: '',
        cpuSocket: '',
        pciSlot: '',
        ramType: '',
        gpuInterface: '',
        psu: '',
        powerConsumption: '',
    });
    const [isExisting, setIsExisting] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/specifications/product/${productId}`)
            .then(res => {
                setSpecifications(res.data);
                setIsExisting(true);
            })
            .catch(err => {
                setIsExisting(false);
            });
    }, [productId]);

    const handleSaveSpecifications = (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        const url = `${process.env.REACT_APP_API_URL}/specifications${isExisting ? `/${specifications.id}` : ''}`;
        const method = isExisting ? 'put' : 'post';

        axios({
            method,
            url,
            data: specifications,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(() => {
                setAddSpecifications(null);
            })
            .catch(() => {
                setError(true);
            });
    };

    const handleChange = (prop) => (event) => {
        setSpecifications({ ...specifications, [prop]: event.target.value });
    };

    return (
        <>
            <h1>{isExisting ? 'Update Specifications' : 'Add Specifications'}</h1>
            <form onSubmit={handleSaveSpecifications}>
                <FormControl sx={{ m: 1, width: '80ch' }} variant="standard">
                    <TextField
                        label="Product Name"
                        value={productName}
                        onChange={handleChange('productName')}
                        disabled
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: '80ch' }} variant="standard">
                    <TextField
                        label="Product Type"
                        value={productType}
                        onChange={handleChange('productType')}
                        disabled
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: '80ch' }} variant="standard">
                    <TextField
                        label="CPU Socket"
                        value={specifications.cpuSocket}
                        onChange={handleChange('cpuSocket')}
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: '80ch' }} variant="standard">
                    <TextField
                        label="PCI Slot"
                        value={specifications.pciSlot}
                        onChange={handleChange('pciSlot')}
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: '80ch' }} variant="standard">
                    <TextField
                        label="RAM Type"
                        value={specifications.ramType}
                        onChange={handleChange('ramType')}
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: '80ch' }} variant="standard">
                    <TextField
                        label="GPU Interface"
                        value={specifications.gpuInterface}
                        onChange={handleChange('gpuInterface')}
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: '80ch' }} variant="standard">
                    <TextField
                        label="PSU"
                        value={specifications.psu}
                        onChange={handleChange('psu')}
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: '80ch' }} variant="standard">
                    <TextField
                        label="Power Consumption"
                        value={specifications.powerConsumption}
                        onChange={handleChange('powerConsumption')}
                    />
                </FormControl>
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        An error occurred, please try again.
                    </Alert>
                )}
                <div>
                    <Button variant="contained" type="submit" color="primary">
                        {isExisting ? 'Update Specifications' : 'Add Specifications'}
                    </Button>
                </div>
            </form>
        </>
    );
}
