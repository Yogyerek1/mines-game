import mysql, { Connection } from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const host = process.env.DB_HOST || "localhost";
const user = process.env.DB_USER || "root";
const password = process.env.DB_PASS || "";
const database = process.env.DB_NAME || "mines-game-db";


export const db: Connection = mysql.createConnection({
  host,
  user,
  password,
  database,
  connectTimeout: 5000
});

console.log("Connecting to MySQL with config:", { host, user, password, database });
db.connect((err) => {
  console.log("Connect callback futott!");
  if (err) {
    console.error("MySQL connection error:", err);
  } else {
    console.log("Connected to MySQL database!");
  }
});