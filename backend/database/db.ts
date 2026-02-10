import mysql, { Pool } from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const host = process.env.DB_HOST || "localhost";
const user = process.env.DB_USER || "root";
const password = process.env.DB_PASS || "";
const database = process.env.DB_NAME || "mines-game-db";



export const db: Pool = mysql.createPool({
  host,
  user,
  password,
  database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 5000
});

console.log("MySQL pool created, ready for connections.");