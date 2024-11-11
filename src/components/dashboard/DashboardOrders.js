import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import Button from '@mui/material/Button';
import axios from 'axios';

export default function DashboardOrders({ orderList, setOrderDetails, fetchAllOrderList }) {
    const columns = [
        {
            width: 180,
            label: 'Order ID',
            dataKey: 'id',
        },
        {
            width: 140,
            label: 'Order Date',
            dataKey: 'orderDate',
        },
        {
            width: 140,
            label: 'Ship Date',
            dataKey: 'shipDate',
        },
        {
            width: 150,
            label: 'Order Status',
            dataKey: 'orderStatus',
        },
        {
            width: 200,
            label: 'Actions',
            dataKey: 'actions',
            renderCell: (row) => (
                <>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setOrderDetails(row.id)}
                        style={{ marginRight: '5px' }}
                    >
                        View Details
                    </Button>
                    {row.orderStatus.toLowerCase() !== 'delivered' && (
                        <Button
                            variant="contained"
                            color="success"
                            onClick={() => changeStatus(row.id, row.shipDate)}
                        >
                            Set As Delivered
                        </Button>
                    )}
                </>
            ),
        },
    ];

    const changeStatus = (id, shipDate) => {
        axios
            .put(`http://localhost:5125/api/v1/Orders/${id}`, {
                orderStatus: 'Delivered',
                shipDate,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            .then((response) => {
                alert('Order status updated successfully');
                fetchAllOrderList();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const VirtuosoTableComponents = {
        Scroller: React.forwardRef((props, ref) => (
            <TableContainer component={Paper} {...props} ref={ref} />
        )),
        Table: (props) => (
            <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
        ),
        TableHead: React.forwardRef((props, ref) => <TableHead {...props} ref={ref} />),
        TableRow,
        TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
    };

    function fixedHeaderContent() {
        return (
            <TableRow>
                {columns.map((column) => (
                    <TableCell
                        key={column.dataKey}
                        variant="head"
                        align={column.numeric ? 'right' : 'left'}
                        style={{ width: column.width, padding: '10px' }}
                        sx={{ backgroundColor: 'background.paper' }}
                    >
                        {column.label}
                    </TableCell>
                ))}
            </TableRow>
        );
    }

    function rowContent(_index, row) {
        return (
            <React.Fragment>
                {columns.map((column) => (
                    <TableCell
                        key={column.dataKey}
                        align={column.numeric ? 'right' : 'left'}
                        style={{ padding: '10px' }}
                    >
                        {column.dataKey === 'orderDate' || column.dataKey === 'shipDate'
                            ? formatDate(row[column.dataKey])
                            : column.renderCell
                                ? column.renderCell(row)
                                : row[column.dataKey]}
                    </TableCell>
                ))}
            </React.Fragment>
        );
    }

    function formatDate(date) {
        const formattedDate = new Date(date).toLocaleDateString();
        return formattedDate;
    }

    return (
        <div style={{ padding: '20px' }}>
            <Paper style={{ height: 400, width: '100%' }}>
                <TableVirtuoso
                    data={orderList}
                    components={VirtuosoTableComponents}
                    fixedHeaderContent={fixedHeaderContent}
                    itemContent={rowContent}
                />
            </Paper>
        </div>
    );
}
