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
import CompatibilityCheck from '../compatibility/CompatibilityCheck';
import axios from 'axios';

export default function Cart({ cartList, setCartList, userId, setCreatedCart, setIsCartCreated, ignoreWarning, setIgnoreWarning }) {
    const columns = [
        {
            width: 60,
            label: 'Image',
            dataKey: 'productImage',
            renderCell: (row) => (
                <img
                    src={row.productImage}
                    alt={row.productName}
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                />
            ),
        },
        {
            width: 200,
            label: 'Name',
            dataKey: 'productName',
        },
        {
            width: 50,
            label: 'Price($)',
            dataKey: 'productPrice',
            numeric: true,
        },
        {
            width: 120,
            label: 'Quantity',
            dataKey: 'quantity',


            renderCell: (row) => (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            if (row.sku > row.quantity) {
                                updateQuantity(row.productId, row.quantity + 1);
                            } else {
                                alert("Cannot add more of this product, as stock is limited.");
                            }
                        }}
                        style={{ marginRight: '5px' }}
                    >
                        +
                    </Button>
                    <span style={{ marginRight: '5px', minWidth: '20px', textAlign: 'center' }}>
                        {row.quantity}
                    </span>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            if (row.quantity > 1) {
                                updateQuantity(row.productId, row.quantity - 1);
                            }
                        }}
                        style={{ marginLeft: '5px' }}
                    >
                        -
                    </Button>
                </div>
            ),
        },
        {
            width: 120,
            label: 'Total($)',
            dataKey: 'total',
            renderCell: (row) => (row.productPrice * row.quantity).toFixed(2),
        },
        {
            width: 200,
            label: 'Actions',
            dataKey: 'actions',
            renderCell: (row) => (
                <Button
                    variant="contained"
                    color="error"
                    onClick={() => removeFromCart(row.productId)}
                    style={{ marginRight: '5px' }}
                >
                    Remove
                </Button>
            ),
        },
    ];

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
                        style={{
                            width: column.width, padding: '10px',
                            ...(column.dataKey === 'quantity' ? { paddingLeft: '200px' } : {}),
                        }}
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
                        {column.renderCell ? column.renderCell(row) : row[column.dataKey]}
                    </TableCell>
                ))}
            </React.Fragment>
        );
    }

    function removeFromCart(productId) {
        setCartList((prevList) => prevList.filter((item) => item.productId !== productId));
    }

    function updateQuantity(productId, quantity) {
        setCartList((prevList) =>
            prevList.map((item) =>
                item.productId === productId ? { ...item, quantity: quantity } : item
            )
        );
    }

    const totalPrice = cartList
        .reduce((total, item) => total + item.productPrice * item.quantity, 0)
        .toFixed(2);

    function createCart() {
        const cartDetails = cartList.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
        }));

        axios.post(`${process.env.REACT_APP_API_URL}/carts/`, { userId, cartDetails })
            .then((res) => {
                setCreatedCart(res.data);
                setIsCartCreated(true);
            })
            .catch((error) => {
                console.error('Error creating cart:', error);
            });
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2>Your Cart</h2>
            <Paper style={{ height: 400, width: '100%', marginBottom: '20px' }}>
                <TableVirtuoso
                    data={cartList}
                    components={VirtuosoTableComponents}
                    fixedHeaderContent={fixedHeaderContent}
                    itemContent={rowContent}
                />
            </Paper>
            <div style={{ fontWeight: 'bold', marginTop: '20px', padding: '10px', backgroundColor: '#f9f9f9' }}>
                <h3>Total: ${totalPrice}</h3>
                {!ignoreWarning && <CompatibilityCheck cartList={cartList} setIgnoreWarning={setIgnoreWarning} />}
                <Button
                    variant="contained"
                    color="primary"
                    style={{ width: '100%' }}
                    onClick={createCart}
                >
                    Proceed to Checkout
                </Button>
            </div>
        </div>
    );
}
