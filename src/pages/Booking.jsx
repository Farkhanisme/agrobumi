import React, { useEffect, useState } from "react";
import axios from "axios";

const Booking = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [jumlah, setJumlah] = useState(1);
  const [tiket, setTiket] = useState("pilih tiket");
  const [totalHarga, setTotalHarga] = useState(0);
  const [order_id, setOrder_id] = useState(0);

  const [token, setToken] = useState("");

  const generateOrderId = (name) => {
    const date = new Date().toISOString().split("T")[0];
    const namePart = name.slice(0, 3).toUpperCase();
    const randomString = Math.random().toString(36).substring(2, 8);
    return `${date}-${namePart}-${randomString}`;
  };

  const handleTiketChange = (e) => {
    const selectedTiket = e.target.value;
    setTiket(selectedTiket);

    setTotalHarga(selectedTiket * jumlah);
  };

  const handleJumlahChange = (e) => {
    const newJumlah = parseInt(e.target.value);
    setJumlah(newJumlah);

    // let price = 0;
    // if (tiket === "wisata") {
    //   price = 10000;
    // }
    setTotalHarga(tiket * newJumlah);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newOrderId = generateOrderId(name);
    setOrder_id(newOrderId);

    const data = {
      order_id: order_id,
      name: name,
      email: email,
      tanggal: tanggal,
      jumlah: jumlah,
      tiket: tiket,
      totalHarga: totalHarga,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(
      "http://localhost:1000/api/payment/process-transaction",
      data,
      config
    );
    setToken(response.data.token);
  };

  useEffect(() => {
    if (token) {
      window.snap.pay(token, {
        onSuccess: (result) => {
          //   localStorage.setItem("Pembayaran", JSON.stringify(result));
          setToken("");
          setName("");
          setEmail("");
          setTanggal("");
          setJumlah(0);
          setTiket("pilih tiket");
          setTotalHarga(0);
          setOrder_id(0);
        },
        onPending: (result) => {
          //   localStorage.setItem("Pembayaran", JSON.stringify(result));
          setToken("");
        },
        onError: (error) => {
          console.log(error);
          setToken("");
        },
        onClose: () => {
          console.log("Pembayaran belum selesai");
          setToken("");
        },
      });
    }
  }, [token]);

  useEffect(() => {
    const midtransUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    let scriptTag = document.createElement("script");
    scriptTag.src = midtransUrl;

    const midtransClientKey = "SB-Mid-client-kAcidp2Ky-4mrVCH";
    scriptTag.setAttribute("data-client-key", midtransClientKey);
    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  return (
    <>
      <div id="form" className="flex p-5">
        <div
          id="form-pesan"
          className="flex-col w-1/2 border-r-2 border-black p-14 space-y-5"
        >
          <span className="text-green-600">
            <h1 className="text-2xl">BOOKING NOW</h1>
            <h3>Lengkapi Data Anda untuk Melanjutkan Pemesanan</h3>
          </span>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <input
              type="text"
              className="w-full border border-black rounded-md p-1 placeholder-gray-500 text-sm"
              placeholder="Nama Pemesan"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              className="w-full border border-black rounded-md p-1 placeholder-gray-500 text-sm"
              placeholder="Masukkan email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="date"
              className="w-full border border-black rounded-md p-1 text-sm text-gray-500"
              placeholder="Tanggal Kunjungan"
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
            />
            <input
              type="number"
              className="w-full border border-black rounded-md p-1 placeholder-gray-500 text-sm"
              placeholder="Jumlah Anggota"
              value={jumlah}
              onChange={handleJumlahChange}
            />
            <select
              name="tiket"
              id="tiket"
              className="w-full border border-black rounded-md p-1 text-gray-500 text-sm focus:block"
              value={tiket}
              onChange={handleTiketChange}
            >
              <option value="pilih tiket">Pilih Tiket</option>
              <option value="10000">Wisata</option>
            </select>
            <button
              className="bg-green-600 rounded-md p-1 w-24 text-white float-right"
              type="submit"
            >
              Pesan
            </button>
          </form>
        </div>
        <div id="detail" className="p-14 text-center w-1/2 space-y-7">
          <h1 className="text-green-600 mb-3 text-2xl">Detail Pemesanan</h1>
          <input
            type="text"
            className="w-full border-0 border-b border-black p-1 text-sm placeholder-black"
            placeholder="Nama Pemesan"
            value={name}
            readOnly
          />
          <input
            type="email"
            className="w-full border-0 border-b border-black p-1 text-sm placeholder-black"
            placeholder="Email"
            value={email}
            readOnly
          />
          <input
            type="text"
            className="w-full border-0 border-b border-black p-1 text-sm placeholder-black"
            placeholder="Tanggal Kunjungan"
            value={tanggal}
            readOnly
          />
          <input
            type="number"
            className="w-full border-0 border-b border-black p-1 text-sm placeholder-black"
            placeholder="Jumlah Anggota"
            value={jumlah}
            readOnly
          />
          <input
            type="number"
            className="w-full border-0 border-b border-black p-1 text-sm placeholder-black"
            placeholder="Total Harga"
            value={totalHarga}
            readOnly
          />
        </div>
      </div>
    </>
  );
};

export default Booking;
