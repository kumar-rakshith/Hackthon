import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const SetBatch = () => {
  const { departmentName } = useParams();
  const navigate = useNavigate();

  const [batchData, setBatchData] = useState([]);
  const [newBatch, setNewBatch] = useState({
    year: "",
    section: ""
  });
  const [editingBatch, setEditingBatch] = useState(null);

  // Fetch existing batches when the component mounts
  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/department/get-batches/${departmentName}`
        );
        setBatchData(response.data);
      } catch (error) {
        console.error("Error fetching batches:", error.response ? error.response.data : error.message);
      }
    };

    fetchBatches();
  }, [departmentName]); // This effect runs every time the departmentName changes

  // Handle adding a batch
  const handleAddBatch = async () => {
    if (newBatch.year && newBatch.section) {
      try {
        const response = await axios.post(
          `http://localhost:5000/api/department/set-batch/${departmentName}`,
          newBatch
        );
        console.log("Batch added successfully:", response.data);
        setBatchData([...batchData, newBatch]);
        setNewBatch({ year: "", section: "" });
      } catch (error) {
        console.error("Error adding batch:", error.response ? error.response.data : error.message);
      }
    } else {
      console.error("Invalid batch data");
    }
  };

  // Handle editing a batch
  const handleEditBatch = (batch) => {
    setEditingBatch(batch);
    setNewBatch({ year: batch.year, section: batch.section });
  };

  // Handle updating a batch
  const handleUpdateBatch = async () => {
    if (newBatch.year && newBatch.section && editingBatch) {
      try {
        const response = await axios.put(
          `http://localhost:5000/api/department/update-batch/${departmentName}`,
          { oldBatch: editingBatch, updatedBatch: newBatch }
        );
        console.log("Batch updated successfully:", response.data);

        const updatedBatchData = batchData.map((batch) =>
          batch === editingBatch ? { ...batch, ...newBatch } : batch
        );
        setBatchData(updatedBatchData);
        setEditingBatch(null);
        setNewBatch({ year: "", section: "" });
      } catch (error) {
        console.error("Error updating batch:", error.response ? error.response.data : error.message);
      }
    } else {
      console.error("Invalid batch data");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{departmentName} Department - Set Batch</h1>

      {/* Add/Edit Batch Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">{editingBatch ? "Edit Batch" : "Add New Batch"}</h3>
        <div className="flex space-x-4">
          <input
            type="text"
            value={newBatch.year}
            onChange={(e) => setNewBatch({ ...newBatch, year: e.target.value })}
            placeholder="Year (e.g. First Year)"
            className="p-2 border border-gray-300 rounded-lg w-1/3"
          />
          <input
            type="text"
            value={newBatch.section}
            onChange={(e) => setNewBatch({ ...newBatch, section: e.target.value })}
            placeholder="Section (e.g. A)"
            className="p-2 border border-gray-300 rounded-lg w-1/3"
          />
          <button
            onClick={editingBatch ? handleUpdateBatch : handleAddBatch}
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            {editingBatch ? "Update Batch" : "Add Batch"}
          </button>
        </div>
      </div>

      {/* Display Existing Batches */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Existing Batches</h3>
        <div className="space-y-4">
          {batchData.map((batch, index) => (
            <div key={index} className="flex justify-between p-4 bg-gray-300 rounded-lg shadow-md">
              <div>
                <h4 className="text-lg font-semibold">{batch.year} - Section {batch.section}</h4>
              </div>
              <div className="space-x-4">
                <button
                  onClick={() => handleEditBatch(batch)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    // Handle batch deletion (you may also want to delete from backend)
                    setBatchData(batchData.filter((_, i) => i !== index));
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Back Button */}
      <div className="mt-8">
        <button
          onClick={() => navigate(`/Admin/dashboard/${departmentName}`)}
          className="bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600 transition duration-200"
        >
          Back to Department Details
        </button>
      </div>
    </div>
  );
};




export default SetBatch;
