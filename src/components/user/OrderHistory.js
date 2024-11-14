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


export default function OrderHistory({ orderList, setOrderDetails }) {
    const columns = [
        {
            width: 180,
            label: 'Order ID',
            dataKey: 'id',
        },
        {
            width: 180,
            label: 'Order Date',
            dataKey: 'orderDate',
        },
        {
            width: 180,
            label: 'Ship Date',
            dataKey: 'shipDate',
        },
        {
            width: 150,
            label: 'Order Status',
            dataKey: 'orderStatus',
        },
        {
            width: 120,
            label: 'Actions',
            dataKey: 'actions',
            renderCell: (row) => (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setOrderDetails(row.id)}
                    style={{ marginRight: '5px' }}
                >
                    View Details
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
                            : column.dataKey === 'orderStatus'
                                ? <b>{row[column.dataKey]}</b>
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

