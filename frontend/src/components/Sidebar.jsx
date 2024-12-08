import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const logout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("token");
      navigate("/");
    }
  };
  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <nav>
        <ul>
          <li>
            <Link to="/dashboard">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/dashboard/user">
              User Management
            </Link>
          </li>
          <li>
            <Link to="/dashboard/setting">
              Settings
            </Link>
          </li>
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
