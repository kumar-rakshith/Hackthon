import React from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router-dom for navigation
import { useParams } from "react-router-dom";

function App() {
  const navigate = useNavigate(); // Initialize the navigate function for navigation
  const { departmentName } = useParams();
  return (
    <div className="min-h-screen flex flex-col space-y-6 p-6">
        <h1 className="text-2xl font-bold mb-4">{departmentName} Faculty's Mangament</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* View Faculty Box */}
        <div
          onClick={() => navigate(`/Admin/dashboard/${departmentName}/faculty/view-faculty`)}
          className="w-full bg-gray-900 text-white p-6 rounded-lg shadow-lg cursor-pointer hover:bg-gray-600 transition duration-200"
        >
          <h3 className="text-xl font-semibold mb-2">View Faculty</h3>
          <p>View and manage faculty members of the department.</p>
        </div>

        {/* Add Faculty Box */}
        <div
          onClick={() => navigate(`/Admin/dashboard/${departmentName}/faculty/add-faculty`)}
          className="w-full bg-gray-900 text-white p-6 rounded-lg shadow-lg cursor-pointer hover:bg-gray-600 transition duration-200"
        >
          <h3 className="text-xl font-semibold mb-2">Add Faculty</h3>
          <p>Add new faculty members to the department.</p>
        </div>

        {/* Assign Subject to Faculty Box */}
        
      </div>
    </div>
  );
}

export default App;
