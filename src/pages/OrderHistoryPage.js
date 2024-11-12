import React, { useEffect, useState } from 'react';
import OrderHistory from '../components/user/OrderHistory';
import SingleOrderHistory from '../components/user/SingleOrderHistory';
import axios from 'axios';
import { Button, Typography } from '@mui/material';

export default function OrderHistoryPage({ userData }) {
    const userId = userData.userId;
    const [orderList, setOrderList] = useState([]);
    const [orderDetails, setOrderDetails] = useState(null);
    const [offset, setOffset] = useState(0); // For future implementation of pagination
    const [showDelivered, setShowDelivered] = useState(false);

    const deliveredUrl = `${process.env.REACT_APP_API_URL}/orders/user/${userId}/ordershistory?limit=1000&offset=${offset}`;
    const orderedUrl = `${process.env.REACT_APP_API_URL}/orders/user/${userId}?limit=1000&offset=${offset}`;
    const url = showDelivered ? deliveredUrl : orderedUrl;

    const fetchUserOrderList = () => {
        axios.get(url, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then((res) => {
                setOrderList(res.data);
            })
            .catch((err) => {
                console.error("Error fetching orders:", err);
            });
    };

    useEffect(() => {
        fetchUserOrderList();
    }, [url, userId]);

    const toggleOrderType = () => {
        setShowDelivered((prev) => !prev);
    };

    return (
        <div>
            {!orderDetails && (
                <React.Fragment>
                    <Typography variant="h4" gutterBottom>
                        {showDelivered
                            ? "Orders That Have Been Delivered"
                            : "Orders Currently in Delivery"}
                    </Typography>
                    <OrderHistory orderList={orderList} setOrderDetails={setOrderDetails} />
                    <Button
                        variant="contained"
                        sx={{ mb: 2, backgroundColor: '#1A204f', color: 'white' }}
                        onClick={toggleOrderType}
                    >
                        {showDelivered ? "View Ordered Items" : "View Delivered Items"}
                    </Button>
                </React.Fragment>
            )}

            {orderDetails && <SingleOrderHistory orderId={orderDetails} setNullToReturn={setOrderDetails} />}
        </div>
    );
}
