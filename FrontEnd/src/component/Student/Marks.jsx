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

const StudentMarks = () => {
  const [marksData, setMarksData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null); // Initially no subject is selected

  useEffect(() => {
    // Fetch all marks from the backend
    axios
      .get("http://localhost:5000/api/lec/marks") // Update URL based on your backend API
      .then((response) => {
        setMarksData(response.data.marks);
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
  const getChartData = (subject) => {
    const subjectData = marksData.find((mark) => mark.Subject === subject);

    return {
      labels: ["IA1", "IA2", "Assignment 1", "Assignment 2", "QA1", "QA2", "Final Marks"],
      datasets: [
        {
          label: `Marks for ${subject}`,
          data: [
            subjectData.IA1,
            subjectData.IA2,
            subjectData.Assignment1,
            subjectData.Assignment2,
            subjectData.QA1,
            subjectData.QA2,
            subjectData.FinalMarks,
          ],
          backgroundColor: "rgba(75, 192, 192, 0.5)", // Color of the bars
          borderColor: "rgba(75, 192, 192, 1)", // Border color of bars
          borderWidth: 1,
        },
      ],
    };
  };

  // Handle when a subject button is clicked
  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject); // Set the selected subject
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-8">Student Marks</h1>
      <h2 className="text-2xl font-bold text-center mb-4">Select a Subject</h2>
          <div className="flex flex-wrap justify-center space-x-4 mb-8">
            {marksData.map((mark, index) => (
              <button
                key={index}
                onClick={() => handleSubjectClick(mark.Subject)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 mb-2"
              >
                {mark.Subject}
              </button>
            ))}
          </div>
      {/* Main Layout using Flexbox */}
      <div className="flex space-x-8">
        {/* Left Section: Subject Buttons and Bar Chart */}
        <div className="w-2/3 bg-gray-50 p-6 rounded-lg shadow-md">
          

          {/* Bar Chart for selected subject */}
          {selectedSubject && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-center mb-4">
                Marks Distribution for {selectedSubject}
              </h3>
              <Bar data={getChartData(selectedSubject)} options={{ responsive: true }} />
            </div>
          )}
        </div>

        {/* Right Section: Detailed Marks */}
        {selectedSubject && (
          <div className="w-1/3 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-3xl font-bold text-gray-800 mb-6">Detailed Marks for {selectedSubject}</h3>
          <ul className="space-y-4 text-lg">
            {/* IA1 */}
            <li className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">IA1:</span>
              <span className="text-blue-600">{marksData.find((mark) => mark.Subject === selectedSubject).IA1}</span>
            </li>
        
            {/* IA2 */}
            <li className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">IA2:</span>
              <span className="text-blue-600">{marksData.find((mark) => mark.Subject === selectedSubject).IA2}</span>
            </li>
        
            {/* Assignment 1 */}
            <li className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">Assignment 1:</span>
              <span className="text-blue-600">{marksData.find((mark) => mark.Subject === selectedSubject).Assignment1}</span>
            </li>
        
            {/* Assignment 2 */}
            <li className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">Assignment 2:</span>
              <span className="text-blue-600">{marksData.find((mark) => mark.Subject === selectedSubject).Assignment2}</span>
            </li>
        
            {/* QA1 */}
            <li className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">QA1:</span>
              <span className="text-blue-600">{marksData.find((mark) => mark.Subject === selectedSubject).QA1}</span>
            </li>
        
            {/* QA2 */}
            <li className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">QA2:</span>
              <span className="text-blue-600">{marksData.find((mark) => mark.Subject === selectedSubject).QA2}</span>
            </li>
        
            {/* Final Marks */}
            <li className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">Final Marks:</span>
              <span className="text-blue-600">{marksData.find((mark) => mark.Subject === selectedSubject).FinalMarks}</span>
            </li>
          </ul>
        </div>
        
        )}
      </div>
    </div>
  );
};

export default StudentMarks;
