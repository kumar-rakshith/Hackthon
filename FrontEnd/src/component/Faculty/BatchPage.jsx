import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const DepartmentDetails = () => {
  const { departmentName, batchName } = useParams();  // Capture both departmentName and batchName from URL params
  const navigate = useNavigate();

  const [timetable, setTimetable] = useState([]);
  const [faculty, setFaculty] = useState([]);

  return (
    <div className="p-6">
      {/* Display department name and batch name */}
      <h1 className="text-2xl font-bold mb-4">{batchName} Batch</h1>
      {batchName && <h2 className="text-xl font-semibold mb-4">Batch: {batchName}</h2>}  {/* Display batchName if it exists */}

      {/* Section with boxes for different actions */}
      <div className="flex justify-between mb-8 space-x-8">
        <div
          onClick={() => navigate(`/Faculty/batch/AddAttendees`)}
          className="w-1/3 bg-gray-900 text-white p-6 rounded-lg shadow-lg cursor-pointer hover:bg-gray-800 transition duration-200"
        >
          <h3 className="text-xl font-semibold mb-2">Add Attendees</h3>
          <p>Manage attendees for your department's classes.</p>
        </div>

        <div
          onClick={() => navigate(`/Faculty/batch/InternalMarks`)}
          className="w-1/3 bg-gray-900 text-white p-6 rounded-lg shadow-lg cursor-pointer hover:bg-gray-800 transition duration-200"
        >
          <h3 className="text-xl font-semibold mb-2">Add Internal Marks</h3>
          <p>Manage internal marks for the department's courses.</p>
        </div>

        <div
          onClick={() => navigate(`/faculty/batch/timetabel`)}
          className="w-1/3 bg-gray-900 text-white p-6 rounded-lg shadow-lg cursor-pointer hover:bg-gray-800 transition duration-200"
        >
          <h3 className="text-xl font-semibold mb-2">View Timetable</h3>
          <p>View the timetable for the department.</p>
        </div>

        <div
          onClick={() => navigate(`/faculty/batch/report`)}
          className="w-1/3 bg-gray-900 text-white p-6 rounded-lg shadow-lg cursor-pointer hover:bg-gray-800 transition duration-200"
        >
          <h3 className="text-xl font-semibold mb-2">Genrate Report</h3>
          <p></p>
        </div>
      </div>

      {/* Section to display timetable */}
      {/* You can add your timetable here, if necessary */}
    </div>
  );
};

export default DepartmentDetails;
