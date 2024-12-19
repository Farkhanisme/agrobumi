import React, { useEffect, useState } from "react";
import "../styles/Settings.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment/min/moment-with-locales";
import { registerLocale } from "react-datepicker";
import id from "date-fns/locale/id";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import toast, { Toaster } from "react-hot-toast";

function Settings() {
  const [tanggalMulai, setTanggalMulai] = useState(null);
  const [tanggalSelesai, setTanggalSelesai] = useState(null);
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    const { search } = window.location;
    const notificationParams = new URLSearchParams(search).get(
      "notificationParams"
    );

    if (notificationParams === "1") {
      toast.success("Libur berhasil ditambahkan");
      const url = new URL(window.location.href);
      url.searchParams.delete("notificationParams");
      window.history.replaceState(null, "", url.toString());
    } else if (notificationParams === "2") {
      toast.success("Libur berhasil dihapus");
      const url = new URL(window.location.href);
      url.searchParams.delete("notificationParams");
      window.history.replaceState(null, "", url.toString());
    } else if (notificationParams === "3") {
      toast.error("Libur gagal ditambahkan");
      const url = new URL(window.location.href);
      url.searchParams.delete("notificationParams");
      window.history.replaceState(null, "", url.toString());
    } else if (notificationParams === "4") {
      toast.error("Libur gagal dihapus");
      const url = new URL(window.location.href);
      url.searchParams.delete("notificationParams");
      window.history.replaceState(null, "", url.toString());
    }
  }, []);

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
        `${import.meta.env.VITE_APP_API}/tambah-libur`,
        data
      );
      window.location.href = window.location.pathname + "?notificationParams=1";
    } catch (error) {
      console.error("Error adding excluded date:", error);
      window.location.href = window.location.pathname + "?notificationParams=3";
    }
  };

  useEffect(() => {
    const fetchExcludedDates = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API}/ambil-libur`);
        setHolidays(response.data.exclude);
      } catch (error) {
        console.error("Error fetching excluded dates:", error);
      }
    };

    fetchExcludedDates();
  }, []);

  const hapusLibur = async (id) => {
    try {
      const response = axios.post(`${import.meta.env.VITE_APP_API}/hapus-libur/${id}`);
      window.location.href = window.location.pathname + "?notificationParams=2";
    } catch (error) {
      window.location.href = window.location.pathname + "?notificationParams=4";
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="container">
        <Toaster />
        <header>
          <h2>Settings</h2>
        </header>
        <main>
          <form>
            <div className="flex space-x-5">
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
            </div>
            <button onClick={handleSubmit}>Tambah</button>
          </form>
          <table>
            <thead>
              <tr>
                <th className="text-center">No</th>
                <th className="text-center">Tanggal Mulai</th>
                <th className="text-center">Tanggal Selesai</th>
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
                  <td className="space-x-5">
                    <button
                      className="bg-danger-1 text-white"
                      onClick={() => hapusLibur(holiday.id)}
                    >
                      Hapus
                    </button>
                    {/* <button className="bg-succes-1 text-white">Edit</button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
}

export default Settings;
