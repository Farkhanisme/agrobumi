import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import dotenv from "dotenv";
import db from "../database/db.js";
dotenv.config();

export const getSnapToken = async (req, res) => {
  const orderId = uuidv4();

  const parameter = {
    transaction_details: {
      order_id: orderId,
      gross_amount: req.body.totalHarga,
    },
    item_details: [
      {
        price: req.body.harga,
        quantity: req.body.jumlah,
        name: req.body.tiket,
      },
    ],
    customer_details: {
      name: req.body.name,
      email: req.body.email,
      tanggal: req.body.tanggal,
    },
  };

  const insert =
    "INSERT INTO booking (order_id, nama, tanggal, jumlah, jenis, status) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    insert,
    [
      orderId,
      req.body.name,
      req.body.tanggal,
      req.body.jumlah,
      req.body.tiket,
      "pending",
    ],
    (err, result) => {
      if (err) {
        console.error("pemesanan gagal ditambahkan ke database, error: ", err);
        return res
          .status(500)
          .json({ error: "pesanan gagal ditambahkan ke database" });
      }

      axios
        .post(
          "https://app.sandbox.midtrans.com/snap/v1/transactions",
          parameter,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Basic ${Buffer.from(
                process.env.MIDTRANS_SERVER_KEY
              ).toString("base64")}`,
            },
          }
        )
        .then((response) => {
          res.json({ token: response.data.token, order_id: orderId });
        })
        .catch((error) => {
          console.error(
            "snap token gagal dibuat:",
            error.response?.data || error.message
          );
          res.status(500).json({ error: "gagal membuat snap token" });
        });
    }
  );
};

export const getTransaction = (req, res) => {
  const select = "SELECT * FROM booking";
  db.query(select, (err, result) => {
    if (err) {
      console.error("data gagal diambil", err);
      return res.status(500).json({ error: "gagal mengambil data transaksi" });
    }
    res.json({ transaction: result });
  });
};

export const updateTransaction = (req, res) => {
  const { order_id } = req.params;

  const update = "UPDATE booking SET status = ? WHERE order_id = ?";
  db.query(update, ["success", order_id], (err, result) => {
    if (err) {
      console.error("data gagal diupdate", err);
      return res.status(500).json({ error: "transaksi gagal diupdate" });
    }

    if (result.affectedRows === 0) {
      console.log("tidak ada data yang memiliki id tersebut");
      return res.status(404).json({ error: "data tidak ditemukan" });
    }
    res.status(200).json({ message: "data berhasil diupdate" });
  });
};
