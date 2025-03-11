import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [marks, setMarks] = useState({
    subject1: "",
    subject2: "",
    subject3: "",
    subject4: "",
    subject5: "",
  });
  const [resultMessage, setResultMessage] = useState(""); // State to hold result message
  const [isResultModalOpen, setIsResultModalOpen] = useState(false); // State to handle result modal visibility

  // Fetch students from the backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/students")
      .then((response) => {
        setStudents(response.data); // Set students data
        setLoading(false); // Stop loading
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
        setLoading(false); // Stop loading even in case of an error
      });
  }, []);

  // Handle the opening of the modal and selecting a student
  const handleStudentClick = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true); // Open the modal
  };

  // Handle marks input change
  const handleMarkChange = (e) => {
    const { name, value } = e.target;
    setMarks((prevMarks) => ({
      ...prevMarks,
      [name]: value,
    }));
  };

  // Handle marks form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      // Send the marks data to the backend
      const response = await axios.post("http://localhost:5000/marks", {
        studentId: selectedStudent.id,
        marks,
      });

      console.log("Response from server:", response); // Debug log to check the response

      if (response) {
        setResultMessage("Marks saved successfully!"); // Set success message
        setIsResultModalOpen(true); // Show result modal
        setIsModalOpen(false); // Close the input modal
      }
    } catch (error) {
      console.error("Error submitting marks:", error);
      setResultMessage("Failed to save marks."); // Set failure message
      setIsResultModalOpen(true); // Show result modal
    }
  };

  // Close result modal
  const closeResultModal = () => {
    setIsResultModalOpen(false);
    setResultMessage(""); // Reset the message
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-semibold text-gray-500">Loading students...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Student List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Map through the students and display them in a box layout */}
        {students.map((student) => (
          <div
            key={student.id}
            className="bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 cursor-pointer"
            onClick={() => handleStudentClick(student)}
          >
            <h2 className="text-xl font-semibold text-white mb-4">{student.name}</h2>
          </div>
        ))}
      </div>

      {/* Modal for entering marks */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg w-96">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Enter Marks for {selectedStudent.name}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {["subject1", "subject2", "subject3", "subject4", "subject5"].map((subject) => (
                <div key={subject}>
                  <label className="block text-sm font-medium text-gray-600">{subject}</label>
                  <input
                    type="number"
                    name={subject}
                    value={marks[subject]}
                    onChange={handleMarkChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
              ))}
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Submit Marks
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Result Message Modal */}
      {isResultModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg w-96">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{resultMessage}</h2>
            <button
              onClick={closeResultModal}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;
