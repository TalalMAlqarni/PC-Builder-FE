import React from "react";
import X from "./X.webp";
import InstagramLogo from "./Instagram_Logo.jpg";
import FacebookLogo from "./Facebook_logo.png";

import "./Footer.css";

export default function Footer() {
    return (
        <div className="footer">
            <footer>
                <div>
                    <ul>
                        <li>Privacy Policy</li>
                        <li>Terms of Service</li>
                        <li>FAQ</li>
                    </ul>
                </div>
                <div className="contact-us">
                    <p>Contact Us: MyShop@gmail.com</p>
                </div>
                <div className="social-icons">
                    <a href="https://www.x.com/" target="_blank">
                        <img src={X} alt="X logo" />
                    </a>
                    <a href="https://www.instagram.com/" target="_blank">
                        <img src={InstagramLogo} alt="Instagram logo" />
                    </a>
                    <a href="https://www.facebook.com/" target="_blank">
                        <img src={FacebookLogo} alt="Facebook logo" />
                    </a>
                </div>
            </footer>
        </div>
    );
}

