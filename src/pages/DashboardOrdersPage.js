import React, { useEffect, useState } from 'react';
import DashboardOrders from '../components/dashboard/DashboardOrders';
import DashboardOrdersDetails from '../components/dashboard/DashboardOrdersDetails';
import axios from 'axios';

export default function DashboardOrdersPage() {
    const [orderList, setOrderList] = useState([]);
    const [orderDetails, setOrderDetails] = useState(null);

    const fetchAllOrderList = () => {
        const url = `${process.env.REACT_APP_API_URL}/orders?limit=1000&offset=0`;
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
        fetchAllOrderList();
    }, []);

    return (
        <div>
            {!orderDetails && <DashboardOrders orderList={orderList} setOrderDetails={setOrderDetails} fetchAllOrderList={fetchAllOrderList} />}
            {orderDetails && <DashboardOrdersDetails orderId={orderDetails} setNullToReturn={setOrderDetails} />}
        </div>
    );
}


