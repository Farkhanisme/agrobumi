import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import moment from "moment/min/moment-with-locales";
import Dashboard from "./Dashboard";
import UserManagement from './UserManagement';
import Settings from "./Settings";
import "../styles/Admin.css";

const Admin = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSection, setCurrentSection] = useState("dashboard");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    moment.locale("id");
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/get-transaction"
        );

        setTransactions(response.data.transaction);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setError("Failed to fetch transactions.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [token, navigate]);
  
  const logout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("token");
      navigate("/");
    }
  };
  

  const renderSection = () => {
    switch (currentSection) {
      case "dashboard":
        return <Dashboard />;
      case "userManagement":
        return <UserManagement />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  if (loading) {
    return <div>Loading transactions...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Admin Panel</h2>
        <nav>
          <ul>
            <li>
              <button onClick={() => setCurrentSection("dashboard")}>
                Dashboard
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentSection("userManagement")}>
                User Management
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentSection("settings")}>
                Settings
              </button>
            </li>
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header>
          <h1>Welcome, Admin!</h1>
          <p>Manage your platform efficiently.</p>
        </header>

        {/* Render the selected section */}
        <section className="data-table">
          {renderSection()}
          {currentSection === "dashboard" && transactions.length > 0 && (
            <div>
              <h2>Transaction Table</h2>
              <table>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Order ID</th>
                    <th>Nama</th>
                    <th>Tanggal</th>
                    <th>Jumlah</th>
                    <th>Tiket</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction, index) => (
                    <tr key={transaction.order_id}>
                      <td>{index + 1}</td>
                      <td>{transaction.order_id}</td>
                      <td>{transaction.nama}</td>
                      <td>
                        {moment(transaction.tanggal).format("dddd DD, MMMM Y")}
                      </td>
                      <td>{transaction.jumlah}</td>
                      <td>{transaction.jenis}</td>
                      <td>{transaction.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Admin;
