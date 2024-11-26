import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const respon = await axios.post("http://localhost:3000/login", {
        username,
        password,
      });
      localStorage.setItem("token", respon.data.token);
      console.log(respon.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      if (error.response) {
        setError(error.response.data.message || "Ada Kesalahan!");
      } else {
        setError("Login gagal :(");
      }
    }
  };

  return (
    <div className="login-container mt-16 mb-28 mx-auto">
      <div className="login-header">
        <h1>Narmada Botanic Garden</h1>
      </div>
      <form onSubmit={handleSubmit} className="login-form">
        <label htmlFor="email">Nama</label>
        <input
          className="w-full"
          type="text"
          id="email"
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
        <div className="login-options">
          <a href="/" className="forgot-password">
            Lupa Password?
          </a>
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
        <div className="register-link">
          <p>
            Belum punya akun? <a href="/register">Daftar</a>
          </p>
        </div>
      </form>
      <span>{error}</span>
    </div>
  );
};

export default Login;
