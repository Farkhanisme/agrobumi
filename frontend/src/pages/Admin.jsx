import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import moment from "moment/min/moment-with-locales";
import Dashboard from "./Dashboard";
import Sidebar from "../components/Sidebar";
import "../styles/Admin.css";
import toast, { Toaster } from "react-hot-toast";

const Admin = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    if (role == "") {
      navigate("/login");
      return;
    }
    moment.locale("id");
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API}/api/get-transaction`
        );

        setTransactions(response.data.transaction);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    // fetchTransactions();

    toast.promise(fetchTransactions(), {
      loading: "Loading",
      success: "Data berhasil diambil",
      error: "Data gagal diambil",
    });
  }, [token, navigate]);

  return (
    <div className="admin-container">
      <Toaster />
      
      <Sidebar />

      {/* Main Content */}
      <div className="main-content">
        <header>
          <h1>Welcome, Admin!</h1>
          <p>Manage your platform efficiently.</p>
        </header>

        {/* Render the selected section */}
        <section className="data-table">
          <Dashboard />
          <div className="my-10">
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
                  <th>Email</th>
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
                    <td>{transaction.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* )} */}
        </section>
      </div>
    </div>
  );
};

export default Admin;
