import React, { useEffect, useState } from 'react';
import DashboardUsers from '../components/dashboard/DashboardUsers';
import DashboardUserDetails from '../components/dashboard/DashboardUserDetails';
import axios from 'axios';

export default function DashboardUsersPage() {
    const [userList, setUserList] = useState([]);
    const [userDetails, setUserDetails] = useState(null);

    const fetchAllUserList = () => {
        const url = `http://localhost:5125/api/v1/users?limit=1000&offset=0`;
        axios.get(url, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        }).then((res) => {
            setUserList(res.data);
        }).catch((err) => {
            console.error(err);
        });
    };
    console.log(userList)

    useEffect(() => {
        fetchAllUserList();
    }, []);

    return (
        <div>
            {!userDetails && <DashboardUsers userList={userList} setUserDetails={setUserDetails} fetchAllUserList={fetchAllUserList} />}
            {userDetails && <DashboardUserDetails userId={userDetails} setNullToReturn={setUserDetails} />}
        </div>
    );
}
