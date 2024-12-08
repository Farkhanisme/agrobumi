import React, { useState, useEffect } from "react";
import "../styles/UserManagement.css";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import toast, { Toaster } from "react-hot-toast";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", password: "", role: "" });

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/get-user");
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
        console.error("Error fetching transactions:", error);
        setError("Failed to fetch transactions.");
      }
    };

    toast.promise(fetchUsers(), {
      loading: "Loading",
      success: "Got the data",
      error: "Error when fetching",
    });
  }, []);

  // Add a new user
  const handleAddUser = async () => {
    try {
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      const data = await response.json();
      setUsers([...users, data]);
      setNewUser({ name: "", email: "", role: "" });
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  // Delete a user
  const handleDeleteUser = async (id) => {
    try {
      await fetch(`http://localhost:3000/delete-users/${id}`, {
        method: "DELETE",
      });
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="flex">
      <Toaster />
      <div>
        <Sidebar />
      </div>
      <div className="container">
        <header className="header">
          <h2>User Management</h2>
        </header>
        <main className="main">
          <div className="add-user-form">
            <input
              type="text"
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Role"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            />
            <button onClick={handleAddUser}>Add User</button>
          </div>
          <table className="user-table">
            <thead>
              <tr>
                <th className="text-center">No</th>
                <th className="text-center">Nama</th>
                <th className="text-center">Role</th>
                <th className="text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={user.id}>
                    <td className="text-center">{index + 1}</td>
                    <td>{user.username}</td>
                    <td>{user.role}</td>
                    <td className="text-center">
                      <button
                        className="bg-danger-1 text-white"
                        onClick={handleAddUser(user.id)}
                      >
                        Hapus
                      </button>
                    </td>
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
    </div>
  );
}

export default UserManagement;
