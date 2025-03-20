import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [marks, setMarks] = useState({
    IA1: "",
    IA2: "",
    assignment1: "",
    assignment2: "",
    QA1: "",
    QA2: "",
  });
  const [finalMarks, setFinalMarks] = useState(0); // Final marks out of 50
  const [resultMessage, setResultMessage] = useState("");
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state

  const maxMarks = {
    IA1: 30,
    IA2: 30,
    assignment1: 5,
    assignment2: 5,
    QA1: 5,
    QA2: 5,
  };

  // Fetch students from the backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/students")
      .then((response) => {
        setStudents(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
        setLoading(false);
      });
  }, []);

  // Handle the opening of the modal and selecting a student
  const handleStudentClick = (student) => {
    setSelectedStudent(student);
    setMarks({
      IA1: "",
      IA2: "",
      assignment1: "",
      assignment2: "",
      QA1: "",
      QA2: "",
    }); // Reset marks when selecting a new student
    setIsSubmitting(false); // Reset isSubmitting state
    setIsModalOpen(true);
  };

  // Handle marks input change with validation
  const handleMarkChange = (e) => {
    const { name, value } = e.target;

    // Ensure the value does not exceed the max allowed marks
    if (value > maxMarks[name]) {
      alert(`The maximum marks for ${name} is ${maxMarks[name]}`);
      return;
    }

    // Update the marks state
    setMarks((prevMarks) => ({
      ...prevMarks,
      [name]: value,
    }));
  };

  // Calculate final marks (out of 50)
  const calculateFinalMarks = () => {
    const IA1 = parseFloat(marks.IA1) || 0;
    const IA2 = parseFloat(marks.IA2) || 0;
    const assignment1 = parseFloat(marks.assignment1) || 0;
    const assignment2 = parseFloat(marks.assignment2) || 0;
    const QA1 = parseFloat(marks.QA1) || 0;
    const QA2 = parseFloat(marks.QA2) || 0;

    const averageIA = (IA1 + IA2) / 2; // Average of IA1 and IA2
    const totalMarks = averageIA + assignment1 + assignment2 + QA1 + QA2;

    setFinalMarks(totalMarks);
  };

  // Handle marks form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Disable the submit button on submission
    try {
      // Send the marks data to the backend
      const response = await axios.post("http://localhost:5000/api/lec/marks", {
        studentId: selectedStudent.id,
        marks,
        finalMarks,
      });

      if (response) {
        setResultMessage("Thank you for submitting! Marks saved successfully.");
        setIsResultModalOpen(true);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error submitting marks:", error);
      setResultMessage("Failed to save marks. Please try again.");
      setIsResultModalOpen(true);
    } finally {
      setIsSubmitting(false); // Re-enable the button after the process completes
    }
  };

  // Close result modal
  const closeResultModal = () => {
    setIsResultModalOpen(false);
    setResultMessage(""); // Reset the message
  };

  useEffect(() => {
    calculateFinalMarks();
  }, [marks]); // Recalculate final marks whenever marks are updated

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
          <div className="bg-white p-8 rounded-lg w-full sm:w-96 md:w-[500px] shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Enter Marks for {selectedStudent.name}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Input fields for each subject */}
              {["IA1", "IA2", "assignment1", "assignment2", "QA1", "QA2"].map((subject) => (
                <div key={subject}>
                  <label className="block text-sm font-medium text-gray-600">
                    {subject} ({maxMarks[subject]} max)
                  </label>
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
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-600">
                  Average IA Marks: {((parseFloat(marks.IA1) + parseFloat(marks.IA2)) / 2).toFixed(2)} / 30
                </p>
                <p className="text-sm font-medium text-gray-600">
                  Final Marks: {finalMarks.toFixed(2)} / 50
                </p>
              </div>
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
                  disabled={isSubmitting} // Disable button while submitting
                  className={`px-4 py-2 ${isSubmitting ? "bg-gray-400" : "bg-blue-600"} text-white rounded-lg hover:bg-blue-700`}
                >
                  {isSubmitting ? "Submitting..." : "Submit Marks"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Result Message Modal */}
      {isResultModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg w-full sm:w-96 md:w-[500px] shadow-lg">
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
