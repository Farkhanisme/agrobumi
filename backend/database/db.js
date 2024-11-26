import mysql2 from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const db = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export async function testConnection() {
  try {
    await db.getConnection();
    console.log("connected to database");
  } catch (error) {
    console.log("failed: ", error);
  }
}

export async function query(command, values) {
  try {
    const [value] = await db.query(command, values ?? []);
    return value;
  } catch (error) {
    console.log("error: ", error);
  }
}

export default db;
