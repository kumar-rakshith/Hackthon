import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registering the necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StudentAttendance = () => {
  const [marksData, setMarksData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all marks data from the backend
    axios
      .get("http://localhost:5000/api/lec/subjectattendances") // Your endpoint for marks
      .then((response) => {
        setMarksData(response.data.marks);  // Extract the marks array from the response
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching marks.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-xl font-semibold">
        {error}
      </div>
    );
  }

  // Prepare data for the bar chart when a subject is selected
  const getChartData = () => {
    // Assuming we only have one object of marks, as seen in the response
    const subjectMarks = marksData[0];

    return {
      labels: ["Mathematics", "Physics", "Chemistry", "Biology", "English"],
      datasets: [
        {
          label: "Attendance for Subjects",
          data: [
            parseFloat(subjectMarks.mathematics),
            parseFloat(subjectMarks.physics),
            parseFloat(subjectMarks.chemistry),
            parseFloat(subjectMarks.biology),
            parseFloat(subjectMarks.english),
          ],
          backgroundColor: "rgba(75, 192, 192, 0.5)", // Color of the bars
          borderColor: "rgba(75, 192, 192, 1)", // Border color of bars
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-8">Student Attendance</h1>

      {/* Flexbox layout: Left (Bar Chart) and Right (Detailed Marks) */}
      <div className="flex space-x-8">

        {/* Left Section: Bar Chart */}
        <div className="w-2/3 bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-center mb-4">Attendance for Subjects</h2>
          <Bar data={getChartData()} options={{ responsive: true }} />
        </div>

        {/* Right Section: Detailed Marks */}
        <div className="w-1/3 bg-gray-50 p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold text-center mb-6">Detailed Attendance</h3>
          <ul className="space-y-4 text-lg">
            {marksData.length > 0 && (
              <div className="space-y-4">
                {/* Displaying the marks for each subject */}
                <li className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700">Mathematics:</span>
                  <span className="text-blue-600">{marksData[0].mathematics}</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700">Physics:</span>
                  <span className="text-blue-600">{marksData[0].physics}</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700">Chemistry:</span>
                  <span className="text-blue-600">{marksData[0].chemistry}</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700">Biology:</span>
                  <span className="text-blue-600">{marksData[0].biology}</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700">English:</span>
                  <span className="text-blue-600">{marksData[0].english}</span>
                </li>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudentAttendance;
