import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker"; // Import DatePicker
import "react-datepicker/dist/react-datepicker.css"; // Import styles for DatePicker

const AddAttendees = () => {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null); // Initially no date selected

  // Fetch student details and check if attendance has been submitted for selected date
  useEffect(() => {
    if (selectedDate) {
      setLoading(true); // Set loading to true whenever date is selected
      axios
        .get("http://localhost:5000/api/lec/students")
        .then((response) => {
          setStudents(response.data);
          setAttendance(
            response.data.reduce((acc, student) => {
              acc[student.id] = "Present"; // Default attendance status set to "Present"
              return acc;
            }, {})
          );
        })
        .catch((error) => {
          console.error("Error fetching students:", error);
        });

      // Check if attendance for selected date is already submitted
      const currentDateString = selectedDate.toISOString().split('T')[0]; // Using ISO format 'YYYY-MM-DD'
      axios
        .get(`http://localhost:5000/api/lec/attendance/check/${currentDateString}`)
        .then((response) => {
          if (response.data.submitted) {
            setAlreadySubmitted(true); // Attendance already submitted for selected date
          } else {
            setAlreadySubmitted(false); // Attendance has not been submitted yet
          }
        })
        .catch((error) => {
          console.error("Error checking attendance submission:", error);
        })
        .finally(() => {
          setLoading(false); // Stop loading when everything is fetched or errors are caught
        });
    }
  }, [selectedDate]); // Re-fetch attendance submission on date change

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
      const currentDateString = selectedDate.toISOString().split('T')[0]; // Using ISO format 'YYYY-MM-DD'
      const response = await axios.post("http://localhost:5000/api/lec/attendance", {
        date: currentDateString,
        attendanceData: attendance,
      });

      setIsSubmitted(true); // Mark attendance as submitted
      alert("Attendance recorded successfully!");
      console.log(response.data);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.error); // Show error if attendance has already been submitted for the day
      } else {
        console.error("Error submitting attendance:", error);
      }
    }
  };

  // Reset isSubmitted when the date changes
  useEffect(() => {
    setIsSubmitted(false); // Reset the submit state whenever the date changes
  }, [selectedDate]);

  return (
    <div className="container mx-auto p-8 bg-white shadow-xl rounded-lg">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Student Attendance</h1>

      {/* Date Picker */}
      <div className="mb-6 text-center">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)} // Update selected date
          dateFormat="MM/dd/yyyy"
          className="px-4 py-2 border rounded-lg shadow-sm"
        />
      </div>

      {/* Show Selected Date */}
      {selectedDate && (
        <p className="text-lg text-center text-gray-600 mb-6">
          Selected Date: {selectedDate.toLocaleDateString()}
        </p>
      )}

      {/* Display message if no date is selected */}
      {!selectedDate && (
        <div className="text-center text-gray-500 mt-4">
          <p>Please select a date to proceed.</p>
        </div>
      )}

      {/* Display loading while fetching data */}
      {loading && selectedDate ? (
        <div className="flex justify-center items-center h-screen">
          <div className="text-lg font-semibold text-gray-500">Loading...</div>
        </div>
      ) : (
        <>
          {/* Display message if attendance is already submitted */}
          {alreadySubmitted ? (
            <div className="text-center text-green-600 mt-4">
              <p>Attendance for selected date has already been submitted.</p>
            </div>
          ) : (
            selectedDate && (
              <div className="space-y-6">
                {/* Student Attendance Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 bg-gray-100 p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-700 mb-6 col-span-3">Student Attendance</h2>
                  {students.map((student) => (
                    <div key={student.id} className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition duration-200">
                      <span className="text-lg text-gray-800 mb-4">{student.name}</span>

                      {/* Radio Buttons for Present/Absent */}
                      <div className="flex space-x-4 mb-4">
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
                    disabled={isSubmitted || !selectedDate} // Disable submit button after submission
                  >
                    {isSubmitted ? "Attendance Submitted" : "Submit Attendance"}
                  </button>
                </div>
              </div>
            )
          )}
        </>
      )}
    </div>
  );
};

export default AddAttendees;
