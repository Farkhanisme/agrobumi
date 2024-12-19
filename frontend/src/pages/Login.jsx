import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Nama dan Password harus diisi!");
      return;
    }

    try {
      const respon = await axios.post(`${import.meta.env.VITE_APP_API}/login`, {
        username,
        password,
      });
      localStorage.setItem("token", respon.data.token);
      localStorage.setItem("role", respon.data.role);
      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Login gagal :(");
    }
  };

  return (
    <div className="login-page">
      {/* Kolom Kiri: Form Login */}
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
            Login
          </button>
          <div className="register-link">
            <p>
              Belum punya akun? <Link to="/register">Daftar</Link>
            </p>
          </div>
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

export default Login;
