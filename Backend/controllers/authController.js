// controllers/authController.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connection = require('../config/db');

// Login handler
const userLogin = (req, res) => {
  const { username, password, role } = req.body;

  // Check if all fields are provided
  if (!username || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Query to check if the user exists in the database
  const query = 'SELECT * FROM users WHERE username = ? AND role = ?';
  
  connection.query(query, [username, role], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: 'Invalid username or role' });
    }

    const user = results[0];

    // Compare the entered password with the stored password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ message: 'Error comparing passwords', error: err });
      }

      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid password' });
      }

      // Generate JWT token if the login is successful
      const token = jwt.sign(
        { userId: user.id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      // Respond with success and the JWT token
      res.json({
        message: 'Login successful',
        token,
        user: {
          username: user.username,
          role: user.role,
        },
      });
    });
  });
};

module.exports = { userLogin };
