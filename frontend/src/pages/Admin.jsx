import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import moment from "moment/min/moment-with-locales";
import "../styles/Admin.css";

const Admin = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
  }
  
  moment.locale("id");

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/get-transaction")
      .then((response) => {
        setTransactions(response.data.transaction);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Admin Panel</h2>
        <nav>
          <ul>
            <li>
              <a href="#">Dashboard</a>
            </li>
            <li>
              <a href="#">User Management</a>
            </li>
            <li>
              <a href="#">Settings</a>
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

        {/* Data Table */}
        <section className="data-table">
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
        </section>
      </div>
    </div>
  );
};

export default Admin;
