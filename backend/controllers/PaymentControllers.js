import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import dotenv from "dotenv";
import db from "../database/db.js";
import nodemailer from "nodemailer";
import fs from "node:fs";
import { promisify } from "node:util";

dotenv.config();

export const getSnapToken = async (req, res) => {
  const { name, email, tanggal, jumlah, tiket, harga, totalHarga, created_at } =
    req.body;
  const orderId = uuidv4();

  let nama_tiket;
  switch (tiket) {
    case "cooking_class":
      nama_tiket = "Tiket Cooking Class";
      break;
    case "education_class":
      nama_tiket = "Tiket Education Class";
      break;
    case "paket_1_party":
      nama_tiket = "Reservasi Garden Party Paket 1";
      break;
    case "paket_2_party":
      nama_tiket = "Reservasi Garden Party Paket 2";
      break;
    case "paket_3_party":
      nama_tiket = "Reservasi Garden Party Paket 3";
      break;
    case "paket_1_foto":
      nama_tiket = "Tiket Spot Foto Paket 1";
      break;
    case "paket_2_foto":
      nama_tiket = "Tiket Spot Foto Paket 2";
      break;
  }

  const parameter = {
    transaction_details: {
      order_id: orderId,
      gross_amount: totalHarga,
    },
    customer_details: {
      first_name: name,
      email: email,
    },
    item_details: [
      {
        price: harga,
        quantity: jumlah,
        name: nama_tiket,
      },
    ],
  };

  const insert =
    "INSERT INTO booking (order_id, nama, tanggal, jumlah, jenis, status, harga, email, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

  try {
    db.query(
      insert,
      [
        orderId,
        name,
        tanggal,
        jumlah,
        nama_tiket,
        "pending",
        totalHarga,
        email,
        created_at,
      ],
      (err, result) => {
        if (err) {
          console.error(
            "pemesanan gagal ditambahkan ke database, error: ",
            err
          );
          return res
            .status(500)
            .json({ error: "pesanan gagal ditambahkan ke database" });
        }
      }
    );
    const midtransToken = await axios.post(
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
    );

    if (midtransToken.data.token) {
      res.json({ token: midtransToken.data.token, order_id: orderId });
    } else {
      console.error("Unexpected response from Midtrans:", midtransToken.data);
      res
        .status(500)
        .json({ error: "Gagal membuat snap token, respons tidak terduga" });
    }
  } catch (error) {
    console.error(
      "snap token gagal dibuat:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "gagal membuat snap token" });
  }
};

export const emailNotif = async (req, res) => {
  const { email, nama, jumlah, tanggal, tiket, ticketCode } = req.body;

  let nama_tiket;
  switch (tiket) {
    case "cooking_class":
      nama_tiket = "Tiket Cooking Class";
      break;
    case "education_class":
      nama_tiket = "Tiket Education Class";
      break;
    case "paket_1_party":
      nama_tiket = "Reservasi Garden Party Paket 1";
      break;
    case "paket_2_party":
      nama_tiket = "Reservasi Garden Party Paket 2";
      break;
    case "paket_3_party":
      nama_tiket = "Reservasi Garden Party Paket 3";
      break;
    case "paket_1_foto":
      nama_tiket = "Tiket Spot Foto Paket 1";
      break;
    case "paket_2_foto":
      nama_tiket = "Tiket Spot Foto Paket 2";
      break;
  }

  try {
    const readFileAsync = promisify(fs.readFile);
    const imageAttachment = await readFileAsync("email/brand.png");
    const htmlTemplate = await readFileAsync("email/email.html", "utf-8");

    const personalizedHtml = htmlTemplate
      .replace("{{ nama }}", nama)
      .replace("{{ jumlah }}", jumlah)
      .replace("{{ tanggal }}", tanggal)
      .replace("{{ tiket }}", nama_tiket)
      .replace("{{ ticketCode }}", ticketCode);

    let transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.MAIL_CLIENT_ID,
        clientSecret: process.env.MAIL_CLIENT_SECRET,
        refreshToken: process.env.MAIL_REFRESH_TOKEN,
      },
    });

    const mailOptions = {
      from: "narmadabotanicgarden@gmail.com",
      to: email,
      subject: "Narmada Ticket Code",
      html: personalizedHtml,
      attachments: [
        {
          filename: "brand.png",
          content: imageAttachment,
          encoding: "base64",
          cid: "brand",
        },
      ],
    };

    const info = transport.sendMail(mailOptions);
    return res.json({ message: "Email sent successfully", response: info.response });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ error: "Failed to send email", details: error.message });
  }
};

export const getTransaction = async (req, res) => {
  const select = "SELECT * FROM booking ORDER BY tanggal ASC";
  try {
    const [rows] = await db.query(select);
    res.json({ transaction: rows });
  } catch (error) {
    console.error("data gagal diambil", error);
    return res.status(500).json({ error: "gagal mengambil data transaksi" });
  }
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

export const getUser = async (req, res) => {
  const select = "SELECT * FROM users";
  try {
    const [rows] = await db.query(select);
    res.json({ users: rows });
  } catch (error) {
    console.error("data gagal diambil", error);
    return res.status(500).json({ error: "gagal mengambil data transaksi" });
  }
};

export const getTransactionDetails = async (req, res) => {
  const select = `SELECT 
    (SELECT SUM(CASE WHEN status = 'success' THEN harga ELSE 0 END) FROM booking) AS income,
    (SELECT COUNT(*) FROM users) AS user,
    (SELECT COUNT(*) FROM booking WHERE DATE(created_at) = CURDATE()) AS new_order,
    (SELECT COUNT(DISTINCT order_id) FROM booking) AS customers`;
  try {
    const [rows] = await db.query(select);
    res.json({ rows });
  } catch (error) {
    console.error("Data gagal diambil", error);
    return res.status(500).json({ error: "Gagal mengambil data transaksi" });
  }
};
