import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { query } from "../database/db.js";

dotenv.config();

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  try {
    const checkUserQuery = 'SELECT * FROM users WHERE username = ?';
    const checkUserResults = await query(checkUserQuery, [username]);

    if (checkUserResults.length === 0) {
      return res.status(400).json({ message: 'Incorrect username or password.' });
    }

    const user = checkUserResults[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Incorrect username or password.' });
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      userId: user.id,
      username: user.username,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Login failed.' });
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
