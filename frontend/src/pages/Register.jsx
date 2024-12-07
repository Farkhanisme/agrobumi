import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post("http://localhost:3000/sign-up", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "Ada kesalahan membuat akun!");
    }
  };

  return (
    <div className="login-page">
      {/* Kolom Kiri: Form Registrasi */}
      <div className="login-container">
        <div className="login-header">
          <h1>Narmada Botanic Garden</h1>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="username">Nama</label>
          <input
            type="text"
            id="username"
            placeholder="Masukkan Nama"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Masukkan Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-button">
            Registrasi
          </button>
        </form>
        {error && <span className="error-message">{error}</span>}
      </div>

      
      <div className="image-container">
        <div className="img">
          <img className="image image1" src="/images/gambar1.png" alt="Image 1" />
          <img className="image image2" src="/images/gambar2.png" alt="Image 2" />
          <img className="image image3" src="/images/gambar3.png" alt="Image 3" />
        </div>
      </div>
    </div>
  );
};

export default Register;
