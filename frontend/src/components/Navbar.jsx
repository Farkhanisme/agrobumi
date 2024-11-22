import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const location = useLocation();

  const getLinkClass = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img alt="Narmada Botanic Garden Logo" src="../brand.png" />
      </Link>
      <ul>
        <li>
          <Link to="/" className={getLinkClass("/")}>
            Beranda
          </Link>
        </li>
        <li>
          <Link to="/event" className={getLinkClass("/event")}>
            Events
          </Link>
        </li>
        <li>
          <Link to="/about" className={getLinkClass("/about")}>
            About Us
          </Link>
        </li>
        <li>
          <Link to="/booking" className={getLinkClass("/booking")}>
            Booking
          </Link>
        </li>
      </ul>
      <Link className="login-btn" to="/login">
        Log In
      </Link>
    </div>
  );
};

export default Navbar;
