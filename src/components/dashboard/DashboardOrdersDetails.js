import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';


export default function DashboardOrdersDetails({ orderId, setNullToReturn }) {
    const [orderDetails, setOrderDetails] = useState(null);
    const [cartDetails, setCartDetails] = useState(null);
    const [paymentDetails, setPaymentDetails] = useState(null);

    const orderUrl = `${process.env.REACT_APP_API_URL}/orders/${orderId}`;

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                // get order by id
                const orderRes = await axios.get(orderUrl, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                setOrderDetails(orderRes.data);

                // get cart by id
                const cartUrl = `${process.env.REACT_APP_API_URL}/carts/${orderRes.data.cartId}`;
                const cartRes = await axios.get(cartUrl, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                setCartDetails(cartRes.data);

                // get payment by id
                const paymentUrl = `${process.env.REACT_APP_API_URL}/payments/${orderRes.data.paymentId}`;
                const paymentRes = await axios.get(paymentUrl, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                setPaymentDetails(paymentRes.data);
            } catch (err) {
                console.error("Error", err);
            }
        };

        if (orderId) {
            fetchOrderDetails();
        }
    }, [orderId]);


    //Loading until getting all data
    if (!orderDetails || !cartDetails || !paymentDetails) {
        return <Typography>Loading...</Typography>;// todo add more Styling
    }
    else {

        return (
            <div>
                <Typography variant="h4" gutterBottom>
                    Single Order Details
                </Typography>

                <Card variant="outlined" sx={{ marginBottom: 2 }}>
                    <CardContent>
                        <Typography variant="h6">Order Information</Typography>
                        <Typography>Order ID: {orderDetails.id}</Typography>
                        <Typography>User ID: {orderDetails.userId}</Typography>
                        <Typography>Order Date: {new Date(orderDetails.orderDate).toLocaleString()}</Typography>
                        <Typography>Shipping Date: {new Date(orderDetails.shipDate).toLocaleString()}</Typography>
                        <Typography>Status: {orderDetails.orderStatus}</Typography>
                        <Typography>Address: {orderDetails.address}, {orderDetails.city}, {orderDetails.state}, {orderDetails.postalCode}</Typography>
                    </CardContent>
                </Card>

                <Card variant="outlined" sx={{ marginBottom: 2 }}>
                    <CardContent>
                        <Typography variant="h6">Cart Information</Typography>
                        <Typography variant="h6">Cart ID: {cartDetails.id}</Typography>
                        <List>
                            {cartDetails.cartDetails.map((item) => (
                                <ListItem key={item.cartDetailsId}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={1}>
                                            <img src={item.product.productImage} alt={item.product.productName} style={{ width: '100%', borderRadius: 4 }} />
                                        </Grid>
                                        <Grid item xs={8}>
                                            <ListItemText
                                                primary={item.product.productName}
                                                secondary={
                                                    <>
                                                        <Typography component="span" variant="body2" color="textPrimary">
                                                            ID: {item.product.productId}
                                                        </Typography>
                                                        <br />
                                                        <Typography component="span" variant="body2" color="textSecondary">
                                                            Color: {item.product.productColor} - Price: ${item.product.productPrice} - In Stock: {item.product.sku > 0 ? "Yes" : "No"}
                                                        </Typography>
                                                    </>
                                                }
                                            />
                                            <Typography>Quantity: {item.quantity}</Typography>
                                            <Typography>Subtotal: ${item.subtotal}</Typography>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                            ))}
                        </List>
                        <div>
                            <Typography variant="h6" align="centered">Total Price: ${cartDetails.totalPrice}</Typography>
                        </div>

                    </CardContent>
                </Card>

                <Card variant="outlined" sx={{ marginBottom: 2 }}>
                    <CardContent>
                        <Typography variant="h6">Payment Information</Typography>
                        <Typography>Payment ID: {paymentDetails.paymentId}</Typography>
                        <Typography>Payment Method: {paymentDetails.paymentMethod}</Typography>
                        <Typography>Payment Date: {new Date(paymentDetails.paymentDate).toLocaleString()}</Typography>
                        <Typography>Status: {paymentDetails.paymentStatus ? 'Paid' : 'Failed'}</Typography>
                        <Typography>Total Paid: ${paymentDetails.totalPrice}</Typography>
                    </CardContent>
                </Card>

                <Box mt={2}>
                    <Divider />
                </Box>
                <Box mt={2} display="flex" justifyContent="center">
                    <Button variant="contained" sx={{ backgroundColor: '#1A204f', color: 'white', width: '200px', height: '50px', fontSize: '1.5em' }} onClick={() => setNullToReturn(null)}>
                        Go Back
                    </Button>
                </Box>
            </div>
        );
    }
}
