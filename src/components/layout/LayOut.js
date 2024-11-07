import React from "react";
import Footer from "../footer/Footer";
import NavBar from "../navbar/NavBar";
import { Outlet } from "react-router-dom";
function LayOut(prop) {
    const { isAuthenticated, isUserAdmin } = prop;
    return (
        <div>
            <NavBar isAuthenticated={isAuthenticated} isUserAdmin={isUserAdmin} />
            <Outlet />
            <Footer />
        </div>
    );
}

export default LayOut;