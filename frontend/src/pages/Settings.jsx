import React, { useEffect, useState } from "react";
import "../styles/Settings.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment/min/moment-with-locales";
import { registerLocale } from "react-datepicker";
import id from "date-fns/locale/id";
import axios from "axios";

function Settings() {
  const [tanggalMulai, setTanggalMulai] = useState(null);
  const [tanggalSelesai, setTanggalSelesai] = useState(null);
  const [holidays, setHolidays] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        tanggal_mulai: tanggalMulai
          ? moment(tanggalMulai).format("YYYY-MM-DD")
          : null,
        tanggal_selesai: tanggalSelesai
          ? moment(tanggalSelesai).format("YYYY-MM-DD")
          : null,
      };
      const response = await axios.post(
        "http://localhost:3000/tambah-libur",
        data
      );
      console.log("Server response:", response);
      alert("Tanggal berhasil ditambahkan");
      window.location.reload();  
    } catch (error) {
      console.error("Error adding excluded date:", error);
      alert("Gagal menambahkan tanggal");
    }
  };

  useEffect(() => {
    const fetchExcludedDates = async () => {
      try {
        const response = await axios.get("http://localhost:3000/ambil-libur");
        setHolidays(response.data.exclude);
      } catch (error) {
        console.error("Error fetching excluded dates:", error);
      }
    };

    fetchExcludedDates();
  }, []);

  const hapusLibur = (id) => {
    axios
      .post(`http://localhost:3000/hapus-libur/${id}`)
      .then((response) => {
        alert("Transaction status updated successfully");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating transaction status:", error);
      });
  };

  return (
    <div className="container">
      <header>
        <h2>Settings</h2>
      </header>
      <main>
        <form>
          <label>
            Tanggal Mulai:
            <DatePicker
              selected={tanggalMulai}
              onChange={(date) => setTanggalMulai(date)}
              dateFormat="dd MMMM, yyyy"
              className="border rounded p-1"
            />
          </label>
          <label>
            Tanggal Akhir (Opsional):
            <DatePicker
              selected={tanggalSelesai}
              onChange={(date) => setTanggalSelesai(date)}
              dateFormat="dd MMMM, yyyy"
              className="border rounded p-1"
            />
          </label>
          {/* <label>
            Deskripsi:
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              required
            />
          </label> */}
          <button onClick={handleSubmit}>Tambah</button>
        </form>
        <table>
          <thead>
            <tr>
              <th className="text-center">No</th>
              <th className="text-center">Tanggal Mulai</th>
              <th className="text-center">Tanggal Selesai</th>
              <th className="text-center">Deskripsi</th>
              <th className="text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {holidays.map((holiday, index) => (
              <tr key={holiday.id}>
                <td className="text-center">{index + 1}</td>
                <td className="text-center">
                  {moment(holiday.start).format("dddd DD MMMM, YYYY")}
                </td>
                <td className="text-center">
                  {holiday.end
                    ? moment(holiday.end).format("dddd DD MMMM, YYYY")
                    : ""}
                </td>
                <td className="text-center">{holiday.description}</td>
                <td className="space-x-5">
                  <button
                    className="bg-danger-1 text-white"
                    onClick={hapusLibur(holiday.id)}
                  >
                    Hapus
                  </button>
                  <button className="bg-succes-1 text-white">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default Settings;
