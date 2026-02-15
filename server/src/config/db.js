import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: {
    rejectUnauthorized: false, // REQUIRED for Neon
  },
});

pool.on("connect", () => {
  console.log("PostgreSQL connected (SSL enabled)");
});

pool.on("error", (err) => {
  console.error("PostgreSQL connection error:", err);
});

export default pool;
