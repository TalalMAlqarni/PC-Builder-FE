import React, { useEffect } from 'react'
import OrderHistory from '../components/user/OrderHistory'
import SingleOrderHistory from '../components/user/SingleOrderHistory';
import axios from 'axios';

export default function OrderHistoryPage({ userId }) {
    const [orderList, setOrderList] = React.useState([]);
    const [orderDetails, setOrderDetails] = React.useState(null);
    const [offset, setOffset] = React.useState(0); //for future implementation of bargaining
    const url = `http://localhost:5125/api/v1/orders/user/${userId}?limit=1000&offset=${offset}`;

    const fetchUserOrderList = () => {
        axios.get(url, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        }).then((res) => {
            setOrderList(res.data);
        }).catch((err) => {
            console.error(err);
        });
    };
    useEffect(() => {
        fetchUserOrderList();
    }, [userId]);

    return (
        <div>
            <h1>Order History</h1>
            {!orderDetails && <OrderHistory orderList={orderList} setOrderDetails={setOrderDetails} />}
            {orderDetails && <SingleOrderHistory orderId={orderDetails} setNullToReturn={setOrderDetails} />}
        </div>
    )
}

