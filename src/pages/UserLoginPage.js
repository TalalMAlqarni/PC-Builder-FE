import React from 'react'
import UserLogin from '../components/user/UserLogin'
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

export default function UserLoginPage(prop) {

    const { setToken } = prop;
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    const [userInfo, setUserInfo] = React.useState({
        email: '',
        password: '',
    });

    const handleChange = (prop) => (event) => {
        setUserInfo({ ...userInfo, [prop]: event.target.value });
    };
    return (
        <>
            <div>
                <h1>User Login</h1>
                <h3>Please enter your Email and Password, then click Login</h3>
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


            <UserLogin userInfo={userInfo} setToken={setToken} />
        </>

    )
}
