import React from 'react';
import './App.css';

const Navbar = () => {
    return (
    <div className="navbar">
        <img alt="Narmada Botanic Garden Logo" src="logo.png" />
        <ul>
        <li>
            <a href="beranda1.html" className="active">Beranda</a>
        </li>
        <li>
            <a href="destinasi.html">Destinations</a>
        </li>
        <li>
            <a href="about.html">About Us</a>
        </li>
        </ul>
        <a className="login-btn" href="login.html">Log In</a>
    </div>
    );
}

export default Navbar;
