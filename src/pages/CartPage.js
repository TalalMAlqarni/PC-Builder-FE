import React from 'react'
import Cart from '../components/cart/Cart'
import Payment from '../components/cart/Payment'
import Order from '../components/cart/Order'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function CartPage({ cartList, setCartList, userData, createdCart, setCreatedCart }) {
    const navigate = useNavigate();
    const [isCartCreated, setIsCartCreated] = useState(false);
    const [isPaymentDone, setIsPaymentDone] = useState(false);
    const [isOrderCreated, setIsOrderCreated] = useState(false);

    const [createdPayment, setCreatedPayment] = useState({});

    useEffect(() => {
        if (isOrderCreated) {
            setCartList([]);
            alert('Order created successfully');
            navigate('/products');
        }
    }, [isOrderCreated, setCartList, navigate]);

    if (cartList.length === 0) {
        return (
            <div>
                <h2>Your cart is empty</h2>
                <Button variant="contained" sx={{ backgroundColor: '#1A204f', color: 'white' }} onClick={() => navigate('/products')}>Go to products page</Button>
            </div>
        );
    }
    else {
        return (
            <>
                {(!isCartCreated && !isPaymentDone && !isOrderCreated) && <Cart cartList={cartList} setCartList={setCartList} userId={userData.userId} setCreatedCart={setCreatedCart} setIsCartCreated={setIsCartCreated} />}
                {isCartCreated && !isPaymentDone && <Payment createdCart={createdCart} setIsPaymentDone={setIsPaymentDone} setCreatedPayment={setCreatedPayment} />}
                {isPaymentDone && !isOrderCreated && <Order createdPayment={createdPayment} createdCart={createdCart} userData={userData} setIsOrderCreated={setIsOrderCreated} />}
            </>
        );
    }
}



