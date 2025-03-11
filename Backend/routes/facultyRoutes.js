const express = require('express');
const pool = require('../config/db');
const router = express.Router();

router.post('/add-faculty', async (req, res) => {
    const { name, subject, departmentName } = req.body;
 
    try {
      // Check if the department exists in the database
      const departmentQuery = 'SELECT id FROM departments WHERE name = ?';
      const [departmentRows] = await pool.query(departmentQuery, [departmentName]);
 
      if (departmentRows.length === 0) {
        return res.status(404).json({ error: 'Department not found' });
      }
 
      const departmentId = departmentRows[0].id;
 
      // Insert new faculty record
      const query = 'INSERT INTO faculty (name, subject, department_id) VALUES (?, ?, ?)';
      const [result] = await pool.query(query, [name, subject, departmentId]);
 
      res.status(201).json({ message: 'Faculty added successfully', id: result.insertId });
    } catch (err) {
      console.error('Error adding faculty:', err);
      res.status(500).json({ error: 'Error adding faculty to the database' });
    }
 });
 

module.exports = router;
