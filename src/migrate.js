import fs from "fs"
import pool from "../db/db.js";

const sql = fs.readFileSync("./migrations/schema.sql","utf8");

try{
  await pool.query(sql);
  console.log("Database tables craeted successfully!");
}catch(error){
  console.error("Error creating tables:");
  console.error(error);
}finally{
  await pool.end();
}
