const express = require("express");
const pool = require("../config/db.js"); // Make sure the pool is being imported correctly
const router = express.Router();

router.post("/set-batch/:departmentName", async (req, res) => {
  const { departmentName } = req.params;
  const { year, section } = req.body;

  // Log the received data to check if it's valid
  console.log("Received data:", departmentName, year, section);

  try {
    // Validate if the required fields are provided
    if (!departmentName || !year || !section) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Query to insert the new batch data
    const query =
      "INSERT INTO batches (department_name, year, section) VALUES (?, ?, ?)";

    // Use async/await for database operations with promises
    const [result] = await pool.query(query, [departmentName, year, section]);

    console.log("Batch added:", result); // Log the result of the query

    // Respond with success message
    res.status(200).json({ message: "Batch added successfully!" });
  } catch (err) {
    console.error("Error adding batch:", err); // Log the error for debugging
    res
      .status(500)
      .json({ error: "Failed to add batch. Please try again later." });
  }
});

// In your departmentRoutes.js or equivalent
router.put("/update-batch/:departmentName", async (req, res) => {
  const { departmentName } = req.params;
  const { oldBatch, updatedBatch } = req.body;

  try {
    const query =
      "UPDATE batches SET year = ?, section = ? WHERE department_name = ? AND year = ? AND section = ?";
    const [result] = await pool.query(query, [
      updatedBatch.year,
      updatedBatch.section,
      departmentName,
      oldBatch.year,
      oldBatch.section,
    ]);

    res.status(200).json({ message: "Batch updated successfully" });
  } catch (err) {
    console.error("Error updating batch:", err);
    res.status(500).json({ error: "Failed to update batch" });
  }
});

// In your departmentRoutes.js or equivalent
router.get("/get-batches/:departmentName", async (req, res) => {
  const { departmentName } = req.params;

  try {
    // Query to fetch the batches for the department
    const query = "SELECT year, section FROM batches WHERE department_name = ?";
    const [batches] = await pool.query(query, [departmentName]);

    // Respond with the list of batches
    res.status(200).json(batches);
  } catch (err) {
    console.error("Error fetching batches:", err);
    res
      .status(500)
      .json({ error: "Failed to fetch batches. Please try again later." });
  }
});

router.get("/get-subjects/:departmentName", async (req, res) => {
  const { departmentName } = req.params;
  const { year, section } = req.query; // Extract year and section from the query params

  try {
    // Query to fetch the subjects for a batch (year and section)
    const query =
      "SELECT subject_name FROM subjects WHERE department_name = ? AND year = ? AND section = ?";
    const [subjects] = await pool.query(query, [departmentName, year, section]);

    // Respond with the list of subjects
    res.status(200).json(subjects);
  } catch (err) {
    console.error("Error fetching subjects:", err);
    res
      .status(500)
      .json({ error: "Failed to fetch subjects. Please try again later." });
  }
});
router.put("/update-subjects/:departmentName", async (req, res) => {
  const { departmentName } = req.params;
  const { batch, subjects } = req.body;

  try {
    // Delete existing subjects for this batch (optional, depending on your use case)
    const deleteQuery =
      "DELETE FROM subjects WHERE department_name = ? AND year = ? AND section = ?";
    await pool.query(deleteQuery, [departmentName, batch.year, batch.section]);

    // Insert the updated subjects into the database
    const query =
      "INSERT INTO subjects (department_name, year, section, subject_name) VALUES (?, ?, ?, ?)";
    for (let subject of subjects) {
      await pool.query(query, [
        departmentName,
        batch.year,
        batch.section,
        subject,
      ]);
    }

    res.status(200).json({ message: "Subjects updated successfully!" });
  } catch (err) {
    console.error("Error updating subjects:", err);
    res
      .status(500)
      .json({ error: "Failed to update subjects. Please try again later." });
  }
});






module.exports = router;
