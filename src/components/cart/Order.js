import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Alert from '@mui/material/Alert';

export default function Order({ createdPayment, createdCart, userData, setIsOrderCreated }) {
    const createOrderUrl = 'http://localhost:5125/api/v1/orders/checkout';
    const [showAlert, setShowAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');


    const [orderInfo, setOrderInfo] = useState({
        address: '',
        city: '',
        state: '',
        postalCode: '',
        coordinateX: '50.00',
        coordinateY: '50.00'
    });

    const handleChange = (prop) => (event) => {
        setOrderInfo({ ...orderInfo, [prop]: event.target.value });
    };

    const handleCreateOrder = () => {
        const orderData = {
            userId: userData.userId,
            cartId: createdCart.id,
            paymentId: createdPayment.paymentId,
            address: orderInfo.address,
            city: orderInfo.city,
            state: orderInfo.state,
            postalCode: parseInt(orderInfo.postalCode, 10),
            coordinateX: parseFloat(orderInfo.coordinateX),
            coordinateY: parseFloat(orderInfo.coordinateY)
        };

        axios.post(createOrderUrl, orderData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then((res) => {
                setIsOrderCreated(true);
            })
            .catch((err) => {
                if (err.response.data === 'One of products is out of stock') {
                    alert('One of products in your cart is out of stock');
                }
                if (err.response) {
                    const statusCode = err.response.status;

                    if (statusCode === 400 && err.response.data.errors) {
                        const errors = err.response.data.errors;
                        let errorMessage;
                        for (const field in errors) {
                            if (errors[field] && errors[field].length > 0) {
                                errorMessage += ` ${field}: ${errors[field].join(', ')}`;
                            }
                        }
                        setAlertMsg(errorMessage);
                    }
                    else if (statusCode === 404 && err.response.data.message) {
                        setAlertMsg(err.response.data.message);
                    }
                    else {
                        setAlertMsg('An unexpected error occurred. Please try again.');
                    }
                } else {
                    setAlertMsg('Failed to connect to server. Please check your connection.');
                }
                setShowAlert(true);
                setAlertSeverity('error');
            });

    };

    return (
        <>
            <h1>Place Your Order</h1>
            <h3>Fill in your order information and click "Place Order"</h3>

            <FormControl sx={{ m: 1, width: '70ch' }} variant="standard">
                <TextField
                    label="Address"
                    variant="standard"
                    value={orderInfo.address}
                    onChange={handleChange('address')}
                />
                <TextField
                    label="City"
                    variant="standard"
                    value={orderInfo.city}
                    onChange={handleChange('city')}
                />
                <TextField
                    label="State"
                    variant="standard"
                    value={orderInfo.state}
                    onChange={handleChange('state')}
                />
                <TextField
                    label="Postal Code"
                    variant="standard"
                    value={orderInfo.postalCode}
                    onChange={handleChange('postalCode')}
                />


                <Button
                    variant="contained"
                    sx={{ backgroundColor: '#1A204f', color: 'white', marginTop: 2 }}
                    onClick={handleCreateOrder}
                >
                    Place Order
                </Button>
            </FormControl>

            {showAlert && (
                <div>
                    <Alert severity={alertSeverity} style={{ marginTop: '10px' }}>
                        {alertMsg}
                    </Alert>
                </div>
            )}

        </>
    );
}

