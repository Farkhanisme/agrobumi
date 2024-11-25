import React, { useState } from "react";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
    </div>
  );
};

export default Login;
