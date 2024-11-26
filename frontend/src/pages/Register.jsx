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
      navigate("/Login");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Ada Kesalahan Membuat Akun!");
      } else {
        setError("pendaftaran berhasil :)");
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
        
        <button type="submit" className="login-button">
          Registrasi
        </button>
        
      </form>
      <span>{error}</span>
    </div>
  );
};

export default Register;
