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
import ArrowForward from "@mui/icons-material/ArrowForward";

export default function DashboardProducts({ allProductList, setIsAdding, getProducts, setProductIdForMoreDetails, setProductIdForUpdate, setIsEditingBrands }) {

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
            width: 200,
            label: 'ID',
            dataKey: 'productId',
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
        axios.delete(`${process.env.REACT_APP_API_URL}/products/${productId}`, {
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
            <Button variant="contained" sx={{ backgroundColor: '#1A204f', color: 'white' }} style={{ fontSize: '1.8em', fontWeight: 'bold', width: '400px' }} onClick={() => setIsAdding(true)}>Add New Products</Button>
            <br /><br />
            <Paper style={{ height: 400, width: '100%' }}>
                <TableVirtuoso
                    data={allProductList}
                    components={VirtuosoTableComponents}
                    fixedHeaderContent={fixedHeaderContent}
                    itemContent={rowContent}
                />
            </Paper>
            <br /><br />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="contained" color='warning' style={{ fontSize: '1em', fontWeight: 'bold', width: '200px' }} startIcon={<ArrowForward />} onClick={() => setIsEditingBrands(true)}>Edit brands</Button>
            </div>
        </>
    );
}


