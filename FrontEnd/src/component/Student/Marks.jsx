import React, { useEffect, useState } from 'react';

const StudentMarks = () => {
  const [marks, setMarks] = useState([]);

  // Fetch marks data from the backend when the component mounts
  useEffect(() => {
    fetch('http://localhost:5000/marks')
      .then((response) => response.json())
      .then((data) => setMarks(data))
      .catch((error) => console.error('Error fetching marks:', error));
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center text-green-500 mb-6">
        Student Marks
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-green-500 text-white">
              <th className="px-4 py-2 border">Student ID</th>
              <th className="px-4 py-2 border">Subject 1</th>
              <th className="px-4 py-2 border">Subject 2</th>
              <th className="px-4 py-2 border">Subject 3</th>
              <th className="px-4 py-2 border">Subject 4</th>
              <th className="px-4 py-2 border">Subject 5</th>
            </tr>
          </thead>
          <tbody>
            {marks.map((mark) => (
              <tr key={mark.id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border">{mark.subject1}</td>
                <td className="px-4 py-2 border">{mark.subject2}</td>
                <td className="px-4 py-2 border">{mark.subject3}</td>
                <td className="px-4 py-2 border">{mark.subject4}</td>
                <td className="px-4 py-2 border">{mark.subject5}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentMarks;
