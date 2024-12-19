import React, { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment/min/moment-with-locales";
import { registerLocale } from "react-datepicker";
import id from "date-fns/locale/id";
import toast, { Toaster } from "react-hot-toast";

const Booking = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [jumlah, setJumlah] = useState(1);
  const [tiket, setTiket] = useState("");
  const [harga, setHarga] = useState(0);
  const [totalHarga, setTotalHarga] = useState(0);
  const [excludedDates, setExcludedDates] = useState([]);
  const [paketParty, setPaketParty] = useState(false);
  const [paketFoto, setPaketFoto] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [map, setMap] = useState(false);

  registerLocale("id", id);
  moment.locale("id");

  const hurufKapital = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);

    if (!validateEmail(inputEmail)) {
      setEmailError("Format email tidak valid");
    } else {
      setEmailError("");
    }
  };

  const handleTiketChange = (e) => {
    const selectedTiket = e.target.value;
    setTiket(selectedTiket);

    let price = 0;
    switch (selectedTiket) {
      case "cooking_class":
        price = 450000;
        setHarga(price);
        setTotalHarga(price * jumlah);
        setPaketParty(false);
        setPaketFoto(false);
        break;
      case "education_class":
        price = 350000;
        setHarga(price);
        setTotalHarga(price * jumlah);
        setPaketParty(false);
        setPaketFoto(false);
        break;
      case "garden_party":
        setTotalHarga(0);
        setPaketParty(true);
        setPaketFoto(false);
        break;
      case "paket_1_party":
        setPaketParty(true);
        setPaketFoto(false);
        price = 2000000;
        setHarga(price);
        setTotalHarga(price * jumlah);
        break;
      case "paket_2_party":
        setPaketParty(true);
        setPaketFoto(false);
        price = 5000000;
        setHarga(price);
        setTotalHarga(price * jumlah);
        break;
      case "paket_3_party":
        setPaketParty(true);
        setPaketFoto(false);
        price = 10000000;
        setHarga(price);
        setTotalHarga(price * jumlah);
        break;
      case "foto_korea_jepang":
        setTotalHarga(0);
        setPaketFoto(true);
        setPaketParty(false);
        break;
      case "paket_1_foto":
        setPaketFoto(true);
        setPaketParty(false);
        price = 50000;
        setHarga(price);
        setTotalHarga(price * jumlah);
        break;
      case "paket_2_foto":
        setPaketFoto(true);
        setPaketParty(false);
        price = 10000;
        setHarga(price);
        setTotalHarga(price * jumlah);
        break;
    }
  };

  function formatRupiah(angka) {
    let number_string = angka.toString().replace(/[^,\d]/g, ""),
      split = number_string.split(","),
      sisa = split[0].length % 3,
      rupiah = split[0].substr(0, sisa),
      ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    if (ribuan) {
      let separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }

    rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
    return "Rp. " + rupiah;
  }

  const handleJumlahChange = (e) => {
    const newJumlah = parseInt(e.target.value);
    setJumlah(newJumlah);
    setTotalHarga(harga * newJumlah);
  };

  const handleSubmit = async () => {
    if (!name || !email || !tanggal || !tiket || jumlah <= 0) {
      toast.error("Harap lengkapi semua data sebelum melanjutkan!", {
        icon: "",
        className: "text-center",
      });
      return;
    } else {
      toast.success("Tolong tunggu sebentar...");
    }

    if (!validateEmail(email)) {
      toast.error("Format email tidak valid!");
      return;
    }

    try {
      const data = {
        name: name,
        email: email,
        tanggal: moment(tanggal).format("YYYY-MM-DD"),
        jumlah: jumlah,
        tiket: tiket,
        harga: harga,
        totalHarga: totalHarga,
        created_at: moment().format("YYYY-MM-DD"),
      };

      const response = await axios.post(
        `https:\\agrobumi-production.up.railway.app/api/snap-token`,
        data
      );

      const token = response.data.token;

      window.snap.pay(token, {
        onSuccess: function (result) {
          updateStatus(result.order_id);
          setMap(true);
          sendEmail(result.order_id);
        },
        onPending: function (result) {
          toast.error("Pembayaran Pending", result);
        },
        onError: function (result) {
          toast.error("Pembayaran Gagal", result);
        },
        onClose: function () {
          toast.error("Anda Menutup Tanpa Menyelesaikan Pembayaran");
        },
      });
    } catch (error) {
      console.error("Error fetching Snap token:", error);
    }
  };

  const closeMap = () => {
    setMap(false);
  };

  const updateStatus = (orderId) => {
    axios.post(
      `https:\\agrobumi-production.up.railway.app/api/update-transaction/${orderId}`
    );
  };

  const sendEmail = (orderId) => {
    try {
      const mail = {
        email: email,
        nama: name,
        jumlah: jumlah,
        tanggal: moment(tanggal).format("dddd DD MMMM, YYYY"),
        tiket: tiket,
        ticketCode: orderId,
      };
      const response = axios.post(
        `https:\\agrobumi-production.up.railway.app/api/send-notification`,
        mail
      );

      toast.custom(
        <div className="w-fit bg-white p-4 text-center rounded-md shadow-xl">
          <p>
            Pembayaran Berhasil! <br /> <br />
            Terima kasih atas pesanan Anda. <br /> Tiket Anda telah dikirim
            melalui
            <br />
            <span className="text-button-3">Email</span>.
          </p>
        </div>
      );
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error(
        "Email gagal dikirim. Silakan hubungi kami di narmadabotanicgarden@mail.com."
      );
    }
  };

  useEffect(() => {
    const fetchExcludedDates = async () => {
      try {
        const response = await axios.get(
          `https:\\agrobumi-production.up.railway.app/ambil-libur`
        );
        const dates = response.data.exclude.flatMap((date) => {
          if (date.end) {
            const range = [];
            let current = moment(date.start);
            const end = moment(date.end);
            while (current <= end) {
              range.push(new Date(current));
              current = current.add(1, "days");
            }
            return range;
          } else {
            return [new Date(date.start)];
          }
        });
        setExcludedDates(dates);
      } catch (error) {
        console.log(error);
        
      }
    };

    setInterval(() => {
      fetchExcludedDates();
    }, 1000);
  }, []);

  return (
    <>
      <div id="form" className="flex p-5 mb-14">
        <Toaster />
        <div
          id="form-pesan"
          className="flex-col w-1/2 border-r-2 border-black p-14 space-y-5"
        >
          <span style={{ color: "#88C273" }}>
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

            <div className="flex flex-col space-y-2">
              <div className="flex space-x-2 items-center">
                <img src="/logos/envelope.svg" className="h-6" />
                <input
                  type="email"
                  className="w-full border-2 border-black rounded-md p-1 placeholder-gray-500 text-sm"
                  placeholder="Masukkan email (digunakan untuk mengirim kode tiket atau reservasi)"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              {emailError && (
                <p className="text-red-500 text-sm">{emailError}</p>
              )}
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
                excludeDates={excludedDates}
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
                // value={tiket}
                onChange={handleTiketChange}
              >
                <option value="pilih tiket">Pilih Tiket</option>
                <option value="cooking_class">Cooking Class</option>
                <option value="education_class">Education Class</option>
                <option value="garden_party">Garden Party</option>
                <option value="foto_korea_jepang">
                  Spot Foto Ala Korea Jepang
                </option>
              </select>
            </div>

            {paketParty && (
              <div className="flex space-x-2 items-center">
                <img src="/logos/ticket.svg" className="h-6" />
                <select
                  name="tiket"
                  id="tiket"
                  className="w-full border-2 border-black rounded-md p-1 text-gray-500 text-sm focus:block"
                  value={tiket}
                  onChange={handleTiketChange}
                >
                  <option value="pilih paket">Pilih Paket</option>
                  <option value="paket_1_party">Paket 1 10-20 orang</option>
                  <option value="paket_2_party">Paket 2 20-50 orang</option>
                  <option value="paket_3_party">
                    Paket 1 lebih dari 50 orang
                  </option>
                </select>
              </div>
            )}

            {paketFoto && (
              <div className="flex space-x-2 items-center">
                <img src="/logos/ticket.svg" className="h-6" />
                <select
                  name="tiket"
                  id="tiket"
                  className="w-full border-2 border-black rounded-md p-1 text-gray-500 text-sm focus:block"
                  value={tiket}
                  onChange={handleTiketChange}
                >
                  <option value="pilih paket">Pilih Paket</option>
                  <option value="paket_1_foto">
                    Foto + Peminjaman Aksesoris
                  </option>
                  <option value="paket_2_foto">Foto</option>
                </select>
              </div>
            )}

            <button
              className="bg-green-600 rounded-md p-1 w-24 text-white float-right"
              onClick={handleSubmit}
            >
              Pesan
            </button>
          </div>
        </div>
        {map && (
          <div className="fixed z-10 w-full h-fit flex flex-col items-center justify-center">
            <div className="flex w-full justify-center space-x-10">
              <input
                type="text"
                value="https://maps.app.goo.gl/HiS7yYQ7cJWv5PVW7"
                readOnly
                className="w-1/3 rounded-md mb-2 text-center border border-black"
              />
              <span
                className="font-medium text-gray-400 text-4xl cursor-pointer"
                onClick={closeMap}
              >
                &times;
              </span>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.0402477079047!2d116.20591789999999!3d-8.592128899999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dcdb86cd9a8363f%3A0xb0684580815801d3!2sNarmada%20Botanic%20Garden!5e0!3m2!1sid!2sid!4v1734236861390!5m2!1sid!2sid"
              width="600"
              height="450"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        )}
        <div id="detail" className="p-14 text-center w-1/2 space-y-6">
          <h1 style={{ color: "#88C273" }} className="mb-3 text-2xl">
            Detail Pemesanan
          </h1>
          <input
            type="text"
            className="w-full border-0 border-b-2 focus:outline-none border-black p-1 text-sm placeholder-black capitalize"
            placeholder="Nama Pemesan"
            value={name}
            readOnly
          />
          <input
            type="email"
            className="w-full border-0 border-b-2 focus:outline-none border-black p-1 text-sm placeholder-black"
            placeholder="Email"
            value={email}
            readOnly
          />
          <input
            type="text"
            className="w-full border-0 border-b-2 focus:outline-none border-black p-1 text-sm placeholder-black"
            placeholder="Tanggal Kunjungan"
            value={tanggal ? moment(tanggal).format("dddd DD MMMM, YYYY") : ""}
            readOnly
          />
          <input
            type="number"
            className="w-full border-0 border-b-2 focus:outline-none border-black p-1 text-sm placeholder-black"
            placeholder="Jumlah Anggota"
            value={jumlah}
            readOnly
          />
          <input
            type="text"
            className="w-full border-0 border-b-2 focus:outline-none border-black p-1 text-sm placeholder-black"
            placeholder="Total Harga"
            value={formatRupiah(totalHarga)}
            readOnly
          />
        </div>
      </div>
    </>
  );
};

export default Booking;
