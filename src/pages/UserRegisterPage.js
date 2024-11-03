import React, { useState } from 'react'
import UserRegister from '../components/user/UserRegister'
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function UserRegisterPage() {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    const [userInfo, setUserInfo] = React.useState({
        userName: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
        birthDate: '',
    });

    const handleChange = (prop) => (event) => {
        setUserInfo({ ...userInfo, [prop]: event.target.value });
    };

    console.log(userInfo);

    return (
        <>

            <div>
                <h1>User Registration</h1>
                <h3>Please enter your information to register then click create account</h3>
            </div>

            <div>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                    <TextField
                        id="standard-search"
                        label="User Name"
                        type="search"
                        variant="standard"
                        value={userInfo.userName}
                        onChange={handleChange('userName')}
                    />
                </FormControl>
            </div>

            <div>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                    <TextField
                        id="standard-search"
                        label="First Name"
                        type="search"
                        variant="standard"
                        value={userInfo.firstName}
                        onChange={handleChange('firstName')}
                        onKeyPress={(event) => {
                            if (!/^[a-zA-Z]+$/.test(event.key)) {
                                event.preventDefault();
                            }
                        }}
                    />
                </FormControl>
            </div>

            <div>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                    <TextField
                        id="standard-search"
                        label="Last Name"
                        type="search"
                        variant="standard"
                        value={userInfo.lastName}
                        onChange={handleChange('lastName')}
                        onKeyPress={(event) => {
                            if (!/^[a-zA-Z]+$/.test(event.key)) {
                                event.preventDefault();
                            }
                        }}
                    />
                </FormControl>
            </div>

            <div>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                    <TextField
                        id="standard-search"
                        label="Email Address"
                        type="search"
                        variant="standard"
                        helperText="Example@gmail.com"
                        value={userInfo.email}
                        onChange={handleChange('email')}
                    />
                </FormControl>
            </div>

            <div>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                    <TextField
                        id="standard-search"
                        label="Phone Number"
                        type="tel"
                        variant="standard"
                        onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                            }
                        }}
                        value={userInfo.phoneNumber}
                        onChange={handleChange('phoneNumber')}
                        helperText="05XXXXXXXX"
                    />
                </FormControl>
            </div>

            <div>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                    <TextField
                        id="standard-search"
                        label="Birth Date"
                        type="search"
                        variant="standard"
                        helperText="YYYY-MM-DD"
                        value={userInfo.birthDate}
                        onChange={handleChange('birthDate')}
                    />
                </FormControl>
            </div>

            <div>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                    <Input
                        id="standard-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label={
                                        showPassword ? 'hide the password' : 'display the password'
                                    }
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        value={userInfo.password}
                        onChange={handleChange('password')}
                    />
                </FormControl>
            </div>
            <UserRegister userInfo={userInfo} />
        </>
    )
}

