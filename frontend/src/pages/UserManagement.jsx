import React, { useState, useEffect } from "react";
import "../styles/UserManagement.css";
import axios from "axios";

function UserManagement() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/get-user"
        );
        console.log(response);
        
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setError("Failed to fetch transactions.");
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container">
      <header className="header">
        <h2>User Management</h2>
      </header>
      <main className="main">
        <table className="user-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Password</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.password}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="no-data">
                  Tidak ada data pengguna
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default UserManagement;
