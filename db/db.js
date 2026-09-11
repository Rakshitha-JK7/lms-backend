import pg from "pg";
import dotenv from "dotenv";
const { Pool } = pg;

dotenv.config();
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "lms",
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
});

export default pool;
