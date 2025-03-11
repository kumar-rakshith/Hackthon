import React, { useEffect, useState } from 'react';
import moment from 'moment'; // You can install moment or use Date API for this

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);

  // Fetch attendance data from the backend when the component mounts
  useEffect(() => {
    fetch('http://localhost:5000/attendance')
      .then((response) => response.json())
      .then((data) => setAttendance(data))
      .catch((error) => console.error('Error fetching attendance:', error));
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center text-blue-500 mb-6">
        Student Attendance
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="px-4 py-2 border">Student ID</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((record) => (
              <tr key={record.id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border">{record.student_id}</td>
                <td className="px-4 py-2 border">{moment(record.date).format('YYYY-MM-DD')}</td> {/* Format Date */}
                <td className="px-4 py-2 border">{record.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;
