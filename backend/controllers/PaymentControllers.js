import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import dotenv from "dotenv";
import db from "../database/db.js";
import nodemailer from "nodemailer";
import fs from "node:fs";
import { promisify } from "node:util";

dotenv.config();

export const getSnapToken = async (req, res) => {
  const { name, email, tanggal, jumlah, tiket, harga, totalHarga } = req.body;
  const orderId = uuidv4();

  const parameter = {
    transaction_details: {
      order_id: orderId,
      gross_amount: totalHarga,
    },
    customer_details: {
      first_name: name,
      email: email,
    },
  };

  const insert =
    "INSERT INTO booking (order_id, nama, tanggal, jumlah, jenis, status) VALUES (?, ?, ?, ?, ?, ?)";

  try {
    db.query(
      insert,
      [orderId, name, tanggal, jumlah, tiket, "pending"],
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

  const readFileAsync = promisify(fs.readFile);
  const imageAttachment = await readFileAsync("email/brand.png");
  const htmlTemplate = await readFileAsync("email/email.html", "utf-8");

  const personalizedHtml = htmlTemplate
    .replace("{{ nama }}", nama)
    .replace("{{ jumlah }}", jumlah)
    .replace("{{ tanggal }}", tanggal)
    .replace("{{ tiket }}", tiket)
    .replace("{{ ticketCode }}", ticketCode);

  //   const transport = nodemailer.createTransport({
  //     host: "sandbox.smtp.mailtrap.io",
  //     port: 2525,
  //     auth: {
  //       user: "996f553054b946",
  //       pass: "c108a12b3d31f6",
  //     },
  //   });

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
    subject: "Narmada Tiket Code",
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

  transport.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Error:", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
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
