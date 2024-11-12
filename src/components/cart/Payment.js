import React, { useState } from 'react';
import { Button, TextField, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Payment({ createdCart, setIsPaymentDone, setCreatedPayment }) {
    const [paymentMethod, setPaymentMethod] = useState('');

    const navigate = useNavigate();

    const handlePayment = () => {
        const paymentData = {
            paymentMethod,
            paymentDate: new Date(),
            paymentStatus: true,
            cartId: createdCart.id
        };
        axios.post(`${process.env.REACT_APP_API_URL}/api/v1/payments`, paymentData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then((response) => {
                setCreatedPayment(response.data);
                setIsPaymentDone(true);
            })
            .catch((error) => {
                console.error('Payment failed:', error);
                if (error.code === "ERR_NETWORK") {
                    alert('Please login again.');
                    navigate('/user/login');
                }
                alert('Payment failed. Please try again.');
            });
    };

    return (
        <div>
            <h2>Payment</h2>
            <p>Cart Quantity: {createdCart.cartQuantity} Items</p>
            <p>Total Price: ${createdCart.totalPrice}</p>

            <Select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                displayEmpty
                fullWidth
                style={{ marginBottom: '20px' }}
            >
                <MenuItem value="" disabled>Select Payment Method</MenuItem>
                <MenuItem value="Credit Card">Credit Card</MenuItem>
                <MenuItem value="PayPal">PayPal</MenuItem>
                <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                <MenuItem value="Cash on Delivery">Cash on Delivery</MenuItem>
            </Select>

            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handlePayment}
                disabled={!paymentMethod}
            >
                Pay Now
            </Button>
        </div>
    );
}
