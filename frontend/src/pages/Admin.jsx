import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment/min/moment-with-locales";
import "../styles/Admin.css";

const Admin = () => {
  moment.locale("id");

  const [transactions, setTransactions] = useState([]);

  let i = 1;

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/get-transaction")
      .then((response) => {
        console.log(response);

        setTransactions(response.data.transaction);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
  }, []);

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
              <a href="#">Posts</a>
            </li>
            <li>
              <a href="#">Settings</a>
            </li>
            <li>
              <a href="#">Logout</a>
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
          {/* <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>John Doe</td>
                <td>john.doe@example.com</td>
                <td>Admin</td>
                <td>
                  <button className="edit">Edit</button>
                  <button className="delete">Delete</button>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jane Smith</td>
                <td>jane.smith@example.com</td>
                <td>User</td>
                <td>
                  <button className="edit">Edit</button>
                  <button className="delete">Delete</button>
                </td>
              </tr>
            </tbody>
          </table> */}

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
              {transactions.map((transaction) => (
                <tr key={transaction.order_id}>
                  <td>{i++}</td>
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
