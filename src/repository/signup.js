import pool from "../../db/db.js";

export const user = async (
  fname,
  lname,
  age,
  email,
  password,
  role,
  usn,
  batch,
  designation,
  bio,
  phone,
) => {
  try {
    const result = await pool.query(
      "INSERT INTO users(fname,lname,age,email,password,role,usn,batch, designation,bio,phone) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *",
      [
        fname,
        lname,
        age,
        email,
        password,
        role,
        usn,
        batch,
        designation,
        bio,
        phone,
      ],
    );

    if (result) {
      return {
        status: true,
        message: "User Created Successfully!",
        data: result.rows[0],
      };
    }
  } catch (error) {
    return {
      status: false,
      message: "User not created in the database",
      debugmessage: error.message,
      data: null,
    };
  }
};

export const findUser = async (email, password) => {
  try {
    const result = await pool.query(
  `SELECT id, fname, lname, age, email, role, usn, batch,
          designation, bio, phone
   FROM users
   WHERE email=$1 AND password=$2`,
  [email, password]
    );

    if (result.rows.length === 0) {
      return {
        status: false,
        message: "Invalid email or user",
        data: null,
      };
    }

    return {
      status: true,
      message: "User found",
      data: result.rows[0],
    };
  } catch (err) {
    return {
      status: false,
      message: "Could not fetch from Database",
      debugmessage: err.message,
      data: null,
    };
  }
};
