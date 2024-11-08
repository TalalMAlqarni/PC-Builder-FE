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

export default function DashboardProducts({ allProductList, setIsAdding, getProducts, setProductIdForMoreDetails, setProductIdForUpdate }) {

    const columns = [
        {
            width: 20,
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
            width: 10,
            label: 'Price($)',
            dataKey: 'productPrice',
            numeric: true,
        },
        {
            width: 10,
            label: 'SKU',
            dataKey: 'sku',
            numeric: true,
        },
        {
            width: 10,
            label: 'Brand',
            dataKey: 'subCategoryName',
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
                        onClick={() => setProductIdForMoreDetails(row.productId)}
                        style={{ marginRight: '5px' }}
                    >
                        More Details
                    </Button>
                    <Button
                        variant="contained"
                        color="warning"
                        onClick={() => setProductIdForUpdate(row.productId)}
                        style={{ marginRight: '5px' }}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => DeleteProduct(row.productId)}
                    >
                        Delete
                    </Button>
                </>
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
                        style={{ width: column.width }}
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
                    >
                        {column.renderCell ? column.renderCell(row) : row[column.dataKey]}
                    </TableCell>
                ))}
            </React.Fragment>
        );
    }

    function DeleteProduct(productId) {
        const token = localStorage.getItem('token');
        axios.delete(`http://localhost:5125/api/v1/products/${productId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                alert('Product deleted successfully!');
                getProducts();
            })
            .catch(err => {
                console.error('Error deleting product:', err);
            });
    }

    return (
        <>
            <Button variant="contained" sx={{ backgroundColor: '#1A204f', color: 'white' }} style={{ fontSize: '2em', fontWeight: 'bold', width: '320px' }} onClick={() => setIsAdding(true)}>Add Product</Button>
            <br /><br />
            <Paper style={{ height: 400, width: '100%' }}>
                <TableVirtuoso
                    data={allProductList}
                    components={VirtuosoTableComponents}
                    fixedHeaderContent={fixedHeaderContent}
                    itemContent={rowContent}
                />
            </Paper>
        </>
    );
}


