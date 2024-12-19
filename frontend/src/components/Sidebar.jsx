import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Sidebar.css";
import toast, { Toaster } from "react-hot-toast";

const Sidebar = () => {
  // const [role, setRole] = useState(null);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const logout = () => {
    toast(
      (t) => (
        <div className="flex flex-col">
          <p className="text-danger-1 font-bold">Apakah anda benar-benar ingin logout?</p>
          <div className="flex mt-2 justify-end">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                performLogout(); // Fungsi untuk melakukan logout
              }}
              className="bg-red-500 text-white px-3 py-1 rounded-md mr-2"
            >
              Ya
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="bg-gray-300 text-black px-3 py-1 rounded-md"
            >
              Tidak
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
        position: "top-center",
      }
    );
  };

  const performLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div className="sidebar">
      <Toaster />
      <h2>Admin Panel</h2>
      <nav>
        <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            {role != "admin" && (
              <Link to="/dashboard/user">User Management</Link>
            )}
          </li>
          <li>
            <Link to="/dashboard/setting">Settings</Link>
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
