import bcrypt from "bcrypt";
import pool from "../config/db.js";
import jwt from "jsonwebtoken";


// REGISTER CONTROLLER
export const register = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    // Basic verification
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    // Check if user exists
    const existing = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (existing.rows.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const result = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1 , $2) RETURNING id,email,created_at",
      [email, hashedPassword]
    );

    res
      .status(201)
      .json({
        success: true,
        message: "User registered successfully",
        user: result.rows[0],
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};



// LOGIN CONTROLLER
export const login = async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    // Find user
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length === 0) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const user = result.rows[0];

    // compare password
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Create JWT
    const token = await jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res
      .status(200)
      .json({ success: true, token, user: { id: user.id, email: user.email } });

  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({success : false,message: "Server error"})
  }
};
