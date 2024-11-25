import React from "react";
import "../styles/UserManagement.css";

function UserManagement() {
  const users = [
    { id: 1, name: "yaya", email: "yaya@gmail.com", role: "Admin" },
    { id: 2, name: "ying", email: "ying@gmail.com", role: "User" },
    // Tambahkan data lainnya jika perlu
  ];

  return (
    <div className="container">
      <header>
        <h2>User Management</h2>
      </header>
      <main>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default UserManagement;
