import React, { useState } from 'react';
import axios from 'axios';

const Report = () => {
  const [loading, setLoading] = useState(false);
  const [format, setFormat] = useState('excel');  // Default format is Excel

  const handleDownload = async (reportType) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/${reportType}-report`, {
        params: {
          format: format,  // Pass selected format (excel or pdf)
        },
        responseType: 'blob', // Important for downloading files
      });

      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${reportType}-report.${format}`;  // Filename with .excel or .pdf extension
      link.click();
    } catch (error) {
      console.error(`Error generating ${reportType} report:`, error);
    }
    setLoading(false);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Generate Reports</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Attendance Report Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-all duration-300">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Generate Attendance Report</h2>
          
          {/* Dropdown for format selection */}
          <div className="mb-4">
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="p-2 border rounded-md"
            >
              <option value="excel">Excel</option>
              <option value="pdf">PDF</option>
            </select>
          </div>

          <button
            onClick={() => handleDownload('attendance')}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg"
          >
            Download Attendance Report ({format.toUpperCase()})
          </button>
        </div>

        {/* Internal Marks Report Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-all duration-300">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Generate Internal Marks Report</h2>
          
          {/* Dropdown for format selection */}
          <div className="mb-4">
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="p-2 border rounded-md"
            >
              <option value="excel">Excel</option>
              <option value="pdf">PDF</option>
            </select>
          </div>

          <button
            onClick={() => handleDownload('marks')}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg"
          >
            Download Internal Marks Report ({format.toUpperCase()})
          </button>
        </div>
      </div>

      {loading && <p className="text-center text-gray-500 mt-4">Generating Report...</p>}
    </div>
  );
};

export default Report;
