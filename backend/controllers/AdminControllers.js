import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import db, { query } from "../database/db.js";

dotenv.config();

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  try {
    const checkUserQuery = "SELECT * FROM users WHERE username = ?";
    const checkUserResults = await query(checkUserQuery, [username]);

    if (checkUserResults.length === 0) {
      return res
        .status(400)
        .json({ message: "Incorrect username or password." });
    }

    const user = checkUserResults[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Incorrect username or password." });
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      userId: user.id,
      username: user.username,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Login failed." });
  }
};

export const signup = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username, and password are required." });
  }

  try {
    const checkUserQuery = "SELECT * FROM users WHERE username = ?";
    const checkUserResults = await query(checkUserQuery, [username]);

    if (checkUserResults.length > 0) {
      return res
        .status(400)
        .json({ message: "Username or email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertQuery = "INSERT INTO users (username, password) VALUES (?, ?)";
    const results = await query(insertQuery, [username, hashedPassword]);

    const token = jwt.sign(
      { userId: results.insertId, username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "User created successfully.",
      token,
      userId: results.insertId,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error saving user to database." });
  }
};

export const tambahLibur = async (req, res) => {
  const { tanggal_mulai, tanggal_selesai } = req.body;
  try {
    await query(
      "INSERT INTO libur (tanggal_mulai, tanggal_selesai) VALUES (?, ?)",
      [tanggal_mulai, tanggal_selesai || null]
    );
    res.status(201).send("Libur Ditambahkan");
  } catch (error) {
    res.status(500).send("Libur Gagal Ditambahkan");
  }
};

export const ambilLibur = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM libur"); 

    const excludedDates = rows.map((row) => {
      if (row.tanggal_selesai) {
        return {
          id: row.id,
          start: row.tanggal_mulai,
          end: row.tanggal_selesai,
        };
      } else {
        return {
          id: row.id,
          start: row.tanggal_mulai,
        };
      }
    });

    res.json({ exclude: excludedDates });
  } catch (error) {
    console.error("Error saat mengambil data libur:", error);
    res.status(500).send("Error fetching excluded dates");
  }
};


export const hapusLibur = (req, res) => {
  const { id } = req.params;

  const hapus = "DELETE FROM libur WHERE id = ?";
  db.query(hapus, id, (err, result) => {
    if (err) {
      console.error("data gagal diupdate", err);
      return res.status(500).json({ error: "transaksi gagal dihapus" });
    }

    if (result.affectedRows === 0) {
      console.log("tidak ada data yang memiliki id tersebut");
      return res.status(404).json({ error: "data tidak ditemukan" });
    }
    res.status(200).json({ message: "data berhasil dihapus" });
  });
};
