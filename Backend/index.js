const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const pool = require("./config/db.js");
const departmentRoutes = require("./routes/departmentRoutes");
const ExcelJS = require("exceljs");
const PDFDocument = require("pdfkit");
const moment = require('moment');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);

app.get("/api/departments", async (req, res) => {
  const query = "SELECT * FROM departments";
  try {
    // Use async/await with the promise API of mysql2
    const [rows] = await pool.query(query);
    res.status(200).json(rows);
  } catch (err) {
    console.error("Database query failed", err);
    res.status(500).json({ error: "Database query failed" });
  }
});

app.use("/api/department", departmentRoutes);

// Endpoint to retrieve faculty members by department
app.get("/api/faculty/:department", async (req, res) => {
  const { department } = req.params;
  const query = "SELECT * FROM faculty WHERE department = ?";
  try {
    const [rows] = await pool.query(query, [department]);

    // Send the list of faculty members as JSON
    res.status(200).json(rows);
  } catch (err) {
    console.error("Database query failed", err);
    res.status(500).json({ error: "Failed to retrieve faculty data" });
  }
});

app.get("/data", async (req, res) => {
  try {
    // Use async/await with promise-based query
    const [rows] = await pool.query("SELECT * FROM faculty");
    res.json(rows); // Send the results as JSON
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).send("Error fetching data");
  }
});

app.post("/add-faculty", async (req, res) => {
  const { name, department, contact, address, subject } = req.body;

  // Validation (You can add more validation if needed)
  if (!name || !contact || !address || !subject) {
    return res.status(400).json({ message: "Please fill in all fields." });
  }

  try {
    // Insert faculty data into the database
    const [result] = await pool.query(
      "INSERT INTO faculty (name, department_name, contact, address, subject) VALUES (?, ?, ?, ?, ?)",
      [name, department, contact, address, subject]
    );

    console.log(result);

    // Send a success response
    res.status(200).json({ message: "Faculty added successfully!" });
  } catch (error) {
    console.error("Error adding faculty:", error);
    res.status(500).json({ message: "Failed to add faculty." });
  }
});

// Faculty

app.get("/api/faculty-batch", async (req, res) => {
  const query = "SELECT * FROM faculty_batch";
  try {
    // Use async/await with the promise API of mysql2
    const [rows] = await pool.query(query);
    res.status(200).json(rows);
  } catch (err) {
    console.error("Database query failed", err);
    res.status(500).json({ error: "Database query failed" });
  }
});

// Retrieve all students
app.get("/students", async (req, res) => {
  try {
    // Query the database to get all students
    const [rows] = await pool.query("SELECT * FROM students");
    res.json(rows); // Return student details in JSON format
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// attendances
app.post("/attendance", async (req, res) => {
  const { date, attendanceData } = req.body;
  try {
    const [existingAttendance] = await pool.query(
      "SELECT * FROM attendance WHERE date = ? LIMIT 1",
      [date]
    );

    if (existingAttendance.length > 0) {
      return res
        .status(400)
        .json({ error: "Attendance for today has already been submitted." });
    }
    const attendanceRecords = Object.keys(attendanceData).map((studentId) => {
      return [studentId, date, attendanceData[studentId]];
    });
    const result = await pool.query(
      "INSERT INTO attendance (student_id, date, status) VALUES ?",
      [attendanceRecords]
    );

    res.status(200).json({ message: "Attendance recorded successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Check if attendance for today has already been submitted
app.get("/attendance/check/:date", async (req, res) => {
  const { date } = req.params;
  try {
    const [rows] = await pool
      .promise()
      .query("SELECT * FROM attendance WHERE date = ? LIMIT 1", [date]);

    if (rows.length > 0) {
      return res.json({ submitted: true });
    } else {
      return res.json({ submitted: false });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Example of handling the "marks" POST route
app.post("/marks", (req, res) => {
  const { studentId, marks } = req.body;

  pool.query(
    "INSERT INTO marks (student_id, subject1, subject2, subject3, subject4, subject5) VALUES (?, ?, ?, ?, ?, ?)",
    [
      studentId,
      marks.subject1,
      marks.subject2,
      marks.subject3,
      marks.subject4,
      marks.subject5,
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
    }
  );
});

app.get("/attendance-report", async (req, res) => {
  try {
    const [attendanceData] = await pool.query("SELECT * FROM attendance");
    const format = req.query.format;

    if (format === "excel") {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Attendance");
      worksheet.columns = [
        { header: "Student ID", key: "student_id" },
        { header: "Date", key: "date" },
        { header: "Status", key: "status" },
      ];

      worksheet.addRows(attendanceData);

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=attendance-report.xlsx"
      );

      await workbook.xlsx.write(res);
      res.end();
    } else if (format === "pdf") {
      const doc = new PDFDocument();
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=attendance-report.pdf"
      );

      doc.pipe(res);
      doc.fontSize(18).text("Attendance Report", { align: "center" });

      // Adding table header
      doc.moveDown();
      doc.fontSize(12).text("Student ID   |   Date   |   Status");
      doc.moveDown();

      // Adding table rows
      attendanceData.forEach((row) => {
        doc.text(`${row.student_id}   |   ${row.date}   |   ${row.status}`);
      });

      doc.end();
    } else {
      res.status(400).json({ error: "Invalid format" });
    }
  } catch (err) {
    console.error("Error generating attendance report:", err);
    res.status(500).json({
      error: "Server error while generating the report",
      details: err.message,
    });
  }
});

app.get("/marks-report", async (req, res) => {
  try {
    const [marksData] = await pool.query("SELECT * FROM marks");
    const format = req.query.format;

    if (format === "excel") {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Marks");

      worksheet.columns = [
        { header: "Student ID", key: "student_id" },
        { header: "Subject1", key: "subject1" },
        { header: "Subject2", key: "subject2" },
        { header: "Subject3", key: "subject3" },
        { header: "Subject4", key: "subject4" },
        { header: "Subject5", key: "subject5" },
      ];

      worksheet.addRows(marksData);

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=marks-report.xlsx"
      );

      await workbook.xlsx.write(res);
      res.end();
    } else if (format === "pdf") {
      const doc = new PDFDocument();
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=marks-report.pdf"
      );

      doc.pipe(res);
      doc.fontSize(18).text("Marks Report", { align: "center" });

      // Adding table header
      doc.moveDown();
      doc
        .fontSize(12)
        .text(
          "Student ID   |   Subject1   |   Subject2  |   Subject3   |   subject4  |     subject5"
        );
      doc.moveDown();

      // Adding table rows
      marksData.forEach((row) => {
        doc.text(
          `${row.student_id}   |   ${row.subject1}   |   ${row.subject2}   |     ${row.subject3}   |     ${row.subject4}   | ${row.subject5}`
        );
      });

      doc.end();
    } else {
      res.status(400).json({ error: "Invalid format" });
    }
  } catch (err) {
    console.error("Error generating marks report:", err);
    res.status(500).json({
      error: "Server error while generating the report",
      details: err.message,
    });
  }
});

// Fetch student marks and name by student_id

app.get('/marks', async (req, res) => {
  try {
    // Query the database using async/await
    const [results] = await pool.execute('SELECT * FROM marks where student_id = 1');
    res.json(results); // Send the query results as a JSON response
  } catch (err) {
    // Catch any errors and send a response
    console.error('Error fetching marks:', err);
    res.status(500).json({ error: err.message });
  }
});


// Route to fetch attendance data from the database
app.get('/attendance', async (req, res) => {
  try {
    const [results] = await pool.execute('SELECT * FROM attendance where student_id =1');
    
    // Format the date in each record
    const formattedResults = results.map(record => ({
      ...record,
      date: moment(record.date).format('YYYY-MM-DD') // Format the date
    }));

    res.json(formattedResults); // Send formatted results
  } catch (err) {
    console.error('Error fetching attendance:', err);
    res.status(500).json({ error: err.message });
  }
});



// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
