import React from "react";
import "./Admin.css";

const Admin = () => {
  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Admin Panel</h2>
        <nav>
          <ul>
            <li><a href="#">Dashboard</a></li>
            <li><a href="#">User Management</a></li>
            <li><a href="#">Posts</a></li>
            <li><a href="#">Settings</a></li>
            <li><a href="#">Logout</a></li>
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
          <h2>Users</h2>
          <table>
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
          </table>
        </section>
      </div>
    </div>
  );
};

export default Admin;
