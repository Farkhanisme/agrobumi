import React, { useState, useEffect } from "react";
import "../styles/UserManagement.css";

function UserManagement() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost/react-php-backend/get_users.php") 
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

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
