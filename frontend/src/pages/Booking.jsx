import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment/min/moment-with-locales";
import { registerLocale } from "react-datepicker";
import id from "date-fns/locale/id";

const Booking = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [jumlah, setJumlah] = useState(1);
  const [tiket, setTiket] = useState("");
  const [harga, setHarga] = useState(0);
  const [totalHarga, setTotalHarga] = useState(0);

  registerLocale("id", id);
  moment.locale("id");

  const hurufKapital = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const handleTiketChange = (e) => {
    const selectedTiket = e.target.value;
    setTiket(selectedTiket);

    if (selectedTiket == "wisata") {
      let price = 10000;
      setHarga(price);
      setTotalHarga(price * jumlah);
    }
  };

  const handleJumlahChange = (e) => {
    const newJumlah = parseInt(e.target.value);
    setJumlah(newJumlah);

    // let price = 0;
    // if (tiket === "wisata") {
    //   price = 10000;
    // }
    setTotalHarga(harga * newJumlah);
  };

  const handleSubmit = async () => {
    try {
      const data = {
        name: name,
        email: email,
        tanggal: moment(tanggal).format("YYYY-MM-DD"),
        jumlah: jumlah,
        tiket: tiket,
        harga: harga,
        totalHarga: totalHarga,
      };

      const response = await axios.post(
        "http://localhost:3000/api/snap-token",
        data
      );

      const token = response.data.token;

      window.snap.pay(token, {
        onSuccess: function (result) {
          updateStatus(result.order_id);
          sendEmail(result.order_id);
        },
        onPending: function (result) {
          console.log("Payment Pending:", result);
        },
        onError: function (result) {
          console.log("Payment Failed:", result);
        },
        onClose: function () {
          console.log(
            "Customer closed the popup without finishing the payment"
          );
        },
      });
    } catch (error) {
      console.error("Error fetching Snap token:", error);
    }
  };

  const updateStatus = (orderId) => {
    axios.post(`http://localhost:3000/api/update-transaction/${orderId}`);
  };

  const sendEmail = (orderId) => {
    const mail = {
      email: email,
      nama: name,
      jumlah: jumlah,
      tanggal: moment(tanggal).format("dddd DD MMMM, YYYY"),
      tiket: tiket,
      tiketCode: orderId,
    };
    axios.post("http://localhost:3000/api/send-notification", mail);
  };

  return (
    <>
      <div id="form" className="flex p-5 mb-14">
        <div
          id="form-pesan"
          className="flex-col w-1/2 border-r-2 border-black p-14 space-y-5"
        >
          <span className="text-green-600">
            <h1 className="text-2xl">BOOKING NOW</h1>
            <h3>Lengkapi Data Anda untuk Melanjutkan Pemesanan</h3>
          </span>
          <div className="space-y-5">
            <div className="flex space-x-2 items-center">
              <img src="/logos/user.svg" className="h-6" />
              <input
                type="text"
                className="w-full border-2 border-black rounded-md p-1 placeholder-gray-500 text-sm"
                placeholder="Nama Pemesan"
                value={name}
                onChange={(e) => setName(hurufKapital(e.target.value))}
              />
            </div>

            <div className="flex space-x-2 items-center">
              <img src="/logos/envelope.svg" className="h-6" />
              <input
                type="email"
                className="w-full border-2 border-black rounded-md p-1 placeholder-gray-500 text-sm"
                placeholder="Masukkan email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex space-x-2 items-center">
              <img src="/logos/calendar.svg" className="h-6" />
              <DatePicker
                className="w-full border-2 border-black rounded-md p-1 placeholder-gray-500 text-sm"
                wrapperClassName="w-full"
                onChange={(date) => setTanggal(date)}
                selected={tanggal}
                minDate={new Date()}
                dateFormat="dd MMMM, yyyy"
                locale="id"
                placeholderText="Pilih Tanggal"
              />
            </div>

            <div className="flex space-x-2 items-center">
              <img src="/logos/people.svg" className="h-6" />
              <input
                type="text"
                inputMode="numeric"
                className="w-full border-2 border-black rounded-md p-1 placeholder-gray-500 text-sm"
                placeholder="Jumlah Tiket (Otomatis Satu)"
                onChange={handleJumlahChange}
              />
            </div>

            <div className="flex space-x-2 items-center">
              <img src="/logos/ticket.svg" className="h-6" />
              <select
                name="tiket"
                id="tiket"
                className="w-full border-2 border-black rounded-md p-1 text-gray-500 text-sm focus:block"
                value={tiket}
                onChange={handleTiketChange}
              >
                <option value="pilih tiket">Pilih Tiket</option>
                <option value="wisata">Wisata</option>
              </select>
            </div>

            <button
              className="bg-green-600 rounded-md p-1 w-24 text-white float-right"
              onClick={handleSubmit}
            >
              Pesan
            </button>

          </div>
        </div>
        <div id="detail" className="p-14 text-center w-1/2 space-y-6">
          <h1 className="text-green-600 mb-3 text-2xl">Detail Pemesanan</h1>
          <input
            type="text"
            className="w-full border-0 border-b-2 border-black p-1 text-sm placeholder-black capitalize"
            placeholder="Nama Pemesan"
            value={name}
            readOnly
          />
          <input
            type="email"
            className="w-full border-0 border-b-2 border-black p-1 text-sm placeholder-black"
            placeholder="Email"
            value={email}
            readOnly
          />
          <input
            type="text"
            className="w-full border-0 border-b-2 border-black p-1 text-sm placeholder-black"
            placeholder="Tanggal Kunjungan"
            value={tanggal ? moment(tanggal).format("dddd DD MMMM, YYYY") : ""}
            readOnly
          />
          <input
            type="number"
            className="w-full border-0 border-b-2 border-black p-1 text-sm placeholder-black"
            placeholder="Jumlah Anggota"
            value={jumlah}
            readOnly
          />
          <input
            type="number"
            className="w-full border-0 border-b-2 border-black p-1 text-sm placeholder-black"
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
