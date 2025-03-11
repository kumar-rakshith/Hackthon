import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ViewBatches = () => {
  const { departmentName } = useParams();  // Getting department name from the URL

  const [batchData, setBatchData] = useState([]);  // State to store batch data
  const [selectedBatch, setSelectedBatch] = useState(null);  // To track the selected batch
  const [subjects, setSubjects] = useState([]);  // State to store the entered subjects

  // Fetch existing batches when the component mounts
  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/department/get-batches/${departmentName}`
        );
        setBatchData(response.data);  // Set the retrieved batches to state
      } catch (error) {
        console.error("Error fetching batches:", error.response ? error.response.data : error.message);
      }
    };

    fetchBatches();
  }, [departmentName]);

  // Fetch subjects when a batch is selected
  useEffect(() => {
    if (selectedBatch) {
      const fetchSubjects = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/department/get-subjects/${departmentName}`,
            {
              params: { year: selectedBatch.year, section: selectedBatch.section }
            }
          );
          setSubjects(response.data.length > 0 ? response.data : Array(5).fill(''));
        } catch (error) {
          console.error("Error fetching subjects:", error.response ? error.response.data : error.message);
        }
      };

      fetchSubjects();
    }
  }, [selectedBatch, departmentName]);

  const handleBatchClick = (batch) => {
    setSelectedBatch(batch);  // Set the selected batch
  };

  const handleSubjectChange = (index, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index] = value;
    setSubjects(updatedSubjects);
  };

  const handleAddSubjects = async () => {
    if (subjects.some(subject => subject.trim() === "")) {
      alert("Please fill in all subject fields.");
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/api/department/set-subjects/${departmentName}`,
        { batch: selectedBatch, subjects }
      );
      alert("Subjects added successfully!");
      setSelectedBatch(null);  // Reset the selected batch
      setSubjects([]);
    } catch (error) {
      console.error("Error adding subjects:", error.response ? error.response.data : error.message);
      alert("Failed to add subjects.");
    }
  };

  const handleUpdateSubjects = async () => {
    if (subjects.some(subject => subject.trim() === "")) {
      alert("Please fill in all subject fields.");
      return;
    }

    try {
      await axios.put(
        `http://localhost:5000/api/department/update-subjects/${departmentName}`,
        { batch: selectedBatch, subjects }
      );
      alert("Subjects updated successfully!");
    } catch (error) {
      console.error("Error updating subjects:", error.response ? error.response.data : error.message);
      alert("Failed to update subjects.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{departmentName} Department - Manage Batches</h1>

      {/* Display Existing Batches */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Existing Batches</h3>
        <div className="space-y-4">
          {batchData.length === 0 ? (
            <p>No batches found for this department.</p>
          ) : (
            batchData.map((batch, index) => (
              <div key={index} className="flex justify-between p-4 bg-gray-300 rounded-lg shadow-md">
                <div>
                  <h4 className="text-lg font-semibold">{batch.year} - Section {batch.section}</h4>
                </div>
                <button
                  onClick={() => handleBatchClick(batch)}
                  className="text-white bg-sky-800 hover:bg-blue-700 p-2 rounded-xl"
                >
                  Manage Subjects
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Input for subjects */}
      {selectedBatch && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">
            Manage Subjects for {selectedBatch.year} - Section {selectedBatch.section}
          </h3>
          <div className="space-y-4">
            {subjects.map((subject, index) => (
              <div key={index} className="flex items-center space-x-4">
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => handleSubjectChange(index, e.target.value)}
                  placeholder={`Subject ${index + 1}`}
                  className="p-2 border border-gray-300 rounded-lg w-1/3"
                />
              </div>
            ))}
            <div className="flex space-x-4 mt-4">
              <button
                onClick={handleAddSubjects}
                className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Add Subjects
              </button>
              <button
                onClick={handleUpdateSubjects}
                className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition duration-200"
              >
                Update Subjects
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewBatches;
