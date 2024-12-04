import React, { useState } from "react";
import "../styles/Settings.css";

function Settings() {
  const [holidays, setHolidays] = useState([]);
  const [form, setForm] = useState({ date: "", description: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setHolidays([...holidays, form]);
    setForm({ date: "", description: "" });
  };

  return (
    <div className="container">
      <header>
        <h2>Settings</h2>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <label>
            Tanggal Hari Libur:
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Deskripsi:
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Tambah</button>
        </form>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Tanggal</th>
              <th>Deskripsi</th>
            </tr>
          </thead>
          <tbody>
            {holidays.map((holiday, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{holiday.date}</td>
                <td>{holiday.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default Settings;
