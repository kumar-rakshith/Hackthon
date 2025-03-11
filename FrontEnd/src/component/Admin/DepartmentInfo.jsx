import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const DepartmentDetails = () => {
  const { departmentName } = useParams();
  const navigate = useNavigate();

  const [timetable, setTimetable] = useState([]);
  const [faculty, setFaculty] = useState([]);

  useEffect(() => {
    // Initialize mock data for timetable and faculty
    setTimetable([
      { day: "Monday", hours: "9 AM - 12 PM" },
      { day: "Wednesday", hours: "1 PM - 4 PM" }
    ]);
    setFaculty([
      { name: "Dr. John Doe", title: "Professor" },
      { name: "Dr. Jane Smith", title: "Associate Professor" }
    ]);
  }, [departmentName]);

  return (
    <div className="  p-6 ">
      <h1 className="text-2xl font-bold mb-4 ">{departmentName} Department</h1>

      {/* Section with buttons to navigate */}
      <div className="flex justify-between mb-8 space-x-8">
        <div
          onClick={() => navigate(`/Admin/dashboard/${departmentName}/Batch`)}
          className="w-1/3 bg-gray-900 text-white p-6 rounded-lg shadow-lg cursor-pointer hover:bg-gray-600 transition duration-200"
        >
          <h3 className="text-xl font-semibold mb-2">Set Batch</h3>
          <p>Manage the batches for the department.</p>
        </div>
        <div
          onClick={() => navigate(`/Admin/dashboard/${departmentName}/Timetable`)}
          className="w-1/3 bg-gray-900 text-white p-6 rounded-lg shadow-lg cursor-pointer hover:bg-gray-600 transition duration-200"
        >
          <h3 className="text-xl font-semibold mb-2">Set Timetable</h3>
          <p>Manage the timetable for the department.</p>
        </div>



        <div
          onClick={() => navigate(`/Admin/dashboard/${departmentName}/Faculty`)}
          className="w-1/3 bg-gray-900 text-white p-6 rounded-lg shadow-lg cursor-pointer hover:bg-gray-600  transition duration-200"
        >
          <h3 className="text-xl font-semibold mb-2">Add Faculty</h3>
          <p>Add and manage faculty members for the department.</p>
        </div>

        <div
          onClick={() => navigate(`/Admin/dashboard/${departmentName}/Subject`)}
          className="w-1/3 bg-gray-900 text-white p-6 rounded-lg shadow-lg cursor-pointer hover:bg-gray-600  transition duration-200"
        >
          <h3 className="text-xl font-semibold mb-2">Add Subject</h3>
          <p>Add and manage faculty members for the department.</p>
        </div>
      </div>
    </div>
  );
};

export default DepartmentDetails;
