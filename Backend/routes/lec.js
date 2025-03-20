const express = require('express');
const pool = require('../config/db');
const router = express.Router();

// Endpoint to submit attendance
router.post("/attendance", async (req, res) => {
    const { date, attendanceData } = req.body;
    try {
        const [existingAttendance] = await pool.query(
            "SELECT * FROM attendancedemo WHERE date = ? LIMIT 1",
            [date]
        );

        if (existingAttendance.length > 0) {
            return res.status(400).json({ error: "Attendance for today has already been submitted." });
        }

        const attendanceRecords = Object.keys(attendanceData).map((studentId) => {
            return [studentId, date, attendanceData[studentId]];
        });

        const result = await pool.query(
            "INSERT INTO attendancedemo (student_id, date, status) VALUES ?",
            [attendanceRecords]
        );

        res.status(200).json({ message: "Attendance recorded successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint to get all students
router.get("/students", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM students");
        res.json(rows); // Return student details in JSON format
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint to check if attendance has been submitted for a specific date
router.get("/attendance/check/:date", async (req, res) => {
    const { date } = req.params;
    try {
        const [rows] = await pool.query("SELECT * FROM attendancedemo WHERE date = ? LIMIT 1", [date]);

        if (rows.length > 0) {
            return res.json({ submitted: true });
        } else {
            return res.json({ submitted: false });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



// API endpoint to save marks
router.post("/marks", (req, res) => {
    const { studentId, marks, finalMarks } = req.body;
    console.log("Marks submission request received:", req.body);

    // Insert marks into the 'marks' table
    pool.query(
        "INSERT INTO marksdemo (student_id, IA1, IA2, assignment1, assignment2, QA1, QA2, finalMarks) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
            studentId,
            marks.IA1,
            marks.IA2,
            marks.assignment1,
            marks.assignment2,
            marks.QA1,
            marks.QA2,
            finalMarks,
        ],
        (err, result) => {
            if (err) {
                console.error("Error saving marks to the database:", err);
                return res.status(500).json({
                    error: "Error saving marks to the database",
                    details: err.message,
                });
            }
            res.status(200).json({ message: "Marks saved successfully!" });
            console.log(result);
        }
    );
});

// API endpoint to fetch all student marks
router.get("/marks", async (req, res) => {
    try {
        // Query to get all student marks
        const [results] = await pool.query("SELECT * FROM subject_grades ");
        res.status(200).json({ marks: results });
    } catch (err) {
        console.error("Error fetching marks from the database:", err);
        res.status(500).json({
            error: "Error fetching marks from the database",
            details: err.message,
        });
    }
});


router.get("/subjectattendances", async (req, res) => {
    try {
        // Query to get all marks from the subjectattendances table
        const [results] = await pool.query("SELECT * FROM subjectattendances");

        // Send the results as JSON
        res.status(200).json({ marks: results });
    } catch (err) {
        console.error("Error fetching marks from the database:", err);
        res.status(500).json({
            error: "Error fetching marks from the database",
            details: err.message,
        });
    }
})





module.exports = router;
