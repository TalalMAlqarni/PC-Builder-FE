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

export default function DashboardUsers({ userList, setUserDetails, fetchAllUserList }) {
    const columns = [
        {
            width: 180,
            label: 'User ID',
            dataKey: 'userId'
        },
        {
            width: 140,
            label: 'User Name',
            dataKey: 'username'
        },

        {
            width: 100,
            label: 'Role',
            dataKey: 'role',

        },
        {
            width: 200,
            label: 'Email',
            dataKey: 'email'
        },
        {
            width: 200,
            label: 'Actions',
            dataKey: 'actions',
            renderCell: (row) => (
                <>
                    <Button variant="contained" color="primary" onClick={() => setUserDetails(row.userId)} style={{ marginRight: '5px' }}>
                        View Details
                    </Button>
                    <Button variant="contained" color="error" onClick={() => deleteUser(row.userId)}>
                        Delete User
                    </Button>
                </>
            ),
        },
    ];

    function deleteUser(userId) {
        axios
            .delete(`${process.env.REACT_APP_API_URL}/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            .then(() => {
                alert(`User ${userId} deleted successfully`);
                fetchAllUserList();
            })
            .catch((err) => {
                console.error(err);
            });
    }

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
            <>
                {columns.map((column) => (
                    <TableCell key={column.dataKey} style={{ padding: '10px' }}>
                        {column.renderCell ? column.renderCell(row) : row[column.dataKey]}
                    </TableCell>
                ))}
            </>
        );
    }

    return (
        <div style={{ padding: '20px' }}>
            <Paper style={{ height: 400, width: '100%' }}>
                <TableVirtuoso
                    data={userList}
                    components={VirtuosoTableComponents}
                    fixedHeaderContent={fixedHeaderContent}
                    itemContent={rowContent}
                />
            </Paper>
        </div>
    );
}
