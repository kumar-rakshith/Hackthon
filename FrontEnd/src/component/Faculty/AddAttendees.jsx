import React, { useState, useEffect } from "react";
import axios from "axios";

const AddAttendees = () => {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false); // To track if attendance is submitted
  const [alreadySubmitted, setAlreadySubmitted] = useState(false); // To check if attendance for today is already submitted

  // Get today's date
  const today = new Date();
  const currentDate = today.toLocaleDateString();

  // Fetch student details and check if attendance has been submitted for today
  useEffect(() => {
    axios
      .get("http://localhost:5000/students")
      .then((response) => {
        setStudents(response.data);
        setAttendance(
          response.data.reduce((acc, student) => {
            acc[student.id] = "Absent"; // Default attendance status
            return acc;
          }, {})
        );
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
        setLoading(false);
      });

    // Check if attendance for today is already submitted
    axios
      .get(`http://localhost:5000/attendance/check/${currentDate}`)
      .then((response) => {
        if (response.data.submitted) {
          setAlreadySubmitted(true); // Attendance already submitted for today
        }
      })
      .catch((error) => {
        console.error("Error checking attendance submission:", error);
      });
  }, []);

  // Handle radio button change for attendance
  const handleAttendanceChange = (studentId, status) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  // Handle form submission (send data to the server)
  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5000/attendance", {
        date: currentDate,
        attendanceData: attendance,
      });

      setIsSubmitted(true); // Mark attendance as submitted
      alert("Attendance recorded successfully!");
      console.log(response.data); // Placeholder for handling submission (e.g., save data)
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.error); // Show error if attendance has already been submitted for the day
      } else {
        console.error("Error submitting attendance:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-semibold text-gray-500">Loading students...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 bg-white shadow-xl rounded-lg">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Student Attendance</h1>
      <p className="text-lg text-center text-gray-600 mb-6">Today's Date: {currentDate}</p>

      {alreadySubmitted ? (
        <div className="text-center text-green-600 mt-4">
          <p>Attendance for today has already been submitted.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Student Attendance Section */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-700 mb-6">Student Attendance</h2>
            {students.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm mb-4 hover:bg-gray-50 transition duration-200">
                <span className="text-lg text-gray-800">{student.name}</span>

                <div className="flex items-center space-x-6">
                  {/* Radio Buttons for Present/Absent */}
                  <label className="flex items-center space-x-2 text-sm text-gray-600">
                    <input
                      type="radio"
                      name={`attendance-${student.id}`}
                      value="Present"
                      checked={attendance[student.id] === "Present"}
                      onChange={() => handleAttendanceChange(student.id, "Present")}
                      className="text-blue-500"
                    />
                    <span>Present</span>
                  </label>

                  <label className="flex items-center space-x-2 text-sm text-gray-600">
                    <input
                      type="radio"
                      name={`attendance-${student.id}`}
                      value="Absent"
                      checked={attendance[student.id] === "Absent"}
                      onChange={() => handleAttendanceChange(student.id, "Absent")}
                      className="text-red-500"
                    />
                    <span>Absent</span>
                  </label>
                </div>
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white py-3 px-8 rounded-lg text-lg font-semibold shadow-md hover:bg-blue-700 transition duration-200"
              disabled={isSubmitted} // Disable submit button after submission
            >
              {isSubmitted ? "Attendance Submitted" : "Submit Attendance"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddAttendees;
