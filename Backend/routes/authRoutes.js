const express = require("express");
const pool = require("../config/db"); // MySQL database connection

const router = express.Router();

// Login endpoint
router.post("/userLogin", async (req, res) => {
  const { username, password, role } = req.body;

  try {
    // Check if the user exists in the MySQL database with the correct role
    const [rows] = await pool.execute(
      "SELECT * FROM users WHERE username = ? AND role = ?",
      [username, role]
    );

    if (rows.length === 0) {
      return res.status(400).json({ message: "Invalid credentials or role." });
    }

    // Get the user object
    const user = rows[0];

    // Check if the password matches (plaintext comparison)
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials or role." });
    }

    // Successful login, send the user data
    res.json({
      message: "Login successful",
      user: {
        username: user.username,
        role: user.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

