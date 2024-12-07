import React, { useState, useEffect } from "react";
import "../styles/UserManagement.css";
import axios from "axios";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "" });

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {

        const response = await fetch("http://localhost:5000/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);

        const response = await axios.get(
          "http://localhost:3000/api/get-user"
        );
        console.log(response);
        
        setUsers(response.data.users);
    
        console.error("Error fetching transactions:", error);
        setError("Failed to fetch transactions.");

      }
    };

    fetchUsers();
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
      await fetch(`http://localhost:5000/users/${id}`, { method: "DELETE" });
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="container">
      <h2>User Management</h2>
      <div className="add-user-form">
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
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
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
