import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminDepartment = () => {
  const [departments, setDepartments] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch departments from backend API on component mount
    axios
      .get("http://localhost:5000/api/departments")
      .then((response) => {
        // Update state with department data
        setDepartments(response.data);
      })
      .catch((error) => {
        // Handle error and display error message
        setErrorMessage("Failed to load departments.");
        console.error("Error fetching departments:", error);
      });
  }, []);  // Empty array means this runs only once after the first render

  const handleDepartmentClick = (department) => {
    // Navigate to the department info page
    navigate(`/Admin/dashboard/${department.name}`);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Departments</h1>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.length > 0 ? (
          departments.map((dept, index) => (
            <div
              key={index}
              className="bg-gray-700 p-6 rounded-lg shadow-lg flex flex-col items-start cursor-pointer hover:bg-gray-600 transition duration-300"
              onClick={() => handleDepartmentClick(dept)}
            >
              <h2 className="text-xl font-semibold text-white mb-4">{dept.name}</h2>
            </div>
          ))
        ) : (
          <p className="text-center text-xl text-gray-600">No departments available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDepartment;
