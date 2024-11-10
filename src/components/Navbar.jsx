import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
} from "react-router-dom";
import Booking from "../pages/Booking";
import "./Navbar.css";
import Beranda from "./Beranda";
import Event from "./Event";

const Navbar = () => {
  const location = useLocation();

  const getLinkClass = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <div className="navbar">
      <img alt="Narmada Botanic Garden Logo" src="logo.png" />
      <ul>
        <li>
          <Link to="/" className={getLinkClass("/")}>
            Beranda
          </Link>
        </li>
        <li>
          <Link to="/destinasi" className={getLinkClass("/destinasi")}>
            Destinations
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

const Nav = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Define routes */}
        <Route path="/" element={<Beranda />} />
        <Route path="/event" element={<Event />} />
        {/* <Route path="/destinasi" element={<Destination />} />
        <Route path="/about" element={<About />} /> */}
        <Route path="/booking" element={<Booking />} />
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
    </Router>
  );
};

export default Nav;
