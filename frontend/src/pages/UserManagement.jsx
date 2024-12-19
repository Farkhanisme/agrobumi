import React, { useState, useEffect } from "react";
import "../styles/UserManagement.css";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import toast, { Toaster } from "react-hot-toast";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  // Fetch users from API
  useEffect(() => {
    const { search } = window.location;
    const notificationParams = new URLSearchParams(search).get(
      "notificationParams"
    );

    if (notificationParams === "1") {
      toast.success("Users berhasil ditambahkan");
      const url = new URL(window.location.href);
      url.searchParams.delete("notificationParams");
      window.history.replaceState(null, "", url.toString());
    } else if (notificationParams === "2") {
      toast.error("Users gagal ditambahkan");
      const url = new URL(window.location.href);
      url.searchParams.delete("notificationParams");
      window.history.replaceState(null, "", url.toString());
    } else if (notificationParams === "3") {
      toast.success("Users berhasil dihapus");
      const url = new URL(window.location.href);
      url.searchParams.delete("notificationParams");
      window.history.replaceState(null, "", url.toString());
    } else if (notificationParams === "4") {
      toast.error("Users gagal dihapus");
      const url = new URL(window.location.href);
      url.searchParams.delete("notificationParams");
      window.history.replaceState(null, "", url.toString());
    } else if (notificationParams === "5") {
      toast.success("Users berhasil diverifikasi");
      const url = new URL(window.location.href);
      url.searchParams.delete("notificationParams");
      window.history.replaceState(null, "", url.toString());
    } else if (notificationParams === "6") {
      toast.error("Users gagal diverifikasi");
      const url = new URL(window.location.href);
      url.searchParams.delete("notificationParams");
      window.history.replaceState(null, "", url.toString());
    }

    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API}/api/get-user`);
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
  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_API}/sign-up`, {
        username,
        password,
        role,
      });
      window.location.href = window.location.pathname + "?notificationParams=1";
    } catch (error) {
      console.log(error);
      window.location.href = window.location.pathname + "?notificationParams=2";

    }
  };

  // Delete a user
  const handleDeleteUser = async (id) => {
    try {
      const response = axios.post(`${import.meta.env.VITE_APP_API}/delete-users/${id}`);
      window.location.href = window.location.pathname + "?notificationParams=3";
    } catch (error) {
      window.location.href = window.location.pathname + "?notificationParams=4";
    }
  };

  const handleUpdateUser = async (id) => {
    try {
      const response = axios.post(`${import.meta.env.VITE_APP_API}/update-users/${id}`);
      window.location.href = window.location.pathname + "?notificationParams=5";
    } catch (error) {
      window.location.href = window.location.pathname + "?notificationParams=6";
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
              value={username.name}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="Password"
              value={password}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
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
                    <td className="text-center space-x-5">
                      <button
                        className="bg-danger-1 text-white"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Hapus
                      </button>
                      <button
                        className="bg-succes-1 text-white"
                        onClick={() => handleUpdateUser(user.id)}
                      >
                        Verifikasi
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
