import React from 'react'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
    const navigate = useNavigate();
    return (
        <div>
            <h1>DASHBOARD OPTIONS</h1>
            <br />
            <Button variant="contained" sx={{ backgroundColor: '#1A204f', color: 'white' }} style={{ fontSize: '1.5em', fontWeight: 'bold', width: '220px' }} onClick={() => navigate('/dashboard/products')}>Products</Button>
            <br /><br />
            <Button variant="contained" sx={{ backgroundColor: '#f49521', color: 'white' }} style={{ fontSize: '1.5em', fontWeight: 'bold', width: '220px' }} onClick={() => navigate('/dashboard/users')}>Users</Button>
            <br /><br />
            <Button variant="contained" sx={{ backgroundColor: '#1A204f', color: 'white' }} style={{ fontSize: '1.5em', fontWeight: 'bold', width: '220px' }} onClick={() => navigate('/dashboard/orders')}>Orders</Button>
            <br />
        </div>
    )
}

