import React from "react";
import "./NavBar.css";
import logo from "./logo.png";
import { Link } from "react-router-dom";
import Badge from "@mui/material/Badge";
import HomeIcon from '@mui/icons-material/Home';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import PersonIcon from '@mui/icons-material/Person';
import ComputerTwoToneIcon from '@mui/icons-material/ComputerTwoTone';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';

export default function NavBar(prop) {
    const { isAuthenticated, isUserAdmin } = prop;
    return (
        <div className="navbar">
            <nav className="nav">
                <img className="logo" src={logo} alt="logo" />
                <ul className="nav-items">
                    <li>
                        <Link to="/">
                            <HomeIcon sx={{ color: "orange" }} />
                            <p>Home</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/products">
                            <ComputerTwoToneIcon sx={{ color: "orange" }} />
                            <p>Products</p>
                        </Link>
                    </li>
                    <li>
                        {isAuthenticated ? (
                            <Link to="/user/profile">
                                <PersonIcon sx={{ color: "orange" }} />
                                <p>Profile</p>
                            </Link>
                        ) : (
                            <Link to="/user/login">
                                <PersonIcon sx={{ color: "orange" }} />
                                <p>Login</p>
                            </Link>
                        )}
                    </li>
                    <li>
                        <Link to="/cart">
                            <Badge badgeContent={0} color="secondary">
                                <ShoppingCartOutlinedIcon sx={{ color: "orange" }} />
                            </Badge>
                            <p>Cart</p>
                        </Link>
                    </li>
                    {(isUserAdmin && isAuthenticated) && (
                        <li>
                            <Link to="/dashboard">
                                <DashboardCustomizeOutlinedIcon sx={{ color: "orange" }} />
                                <p>Dashboard</p>
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
            <hr className="custom-line"></hr>
        </div>
    );
}
