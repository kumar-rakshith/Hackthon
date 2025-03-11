import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const TimetablePage = () => {
  const { departmentName } = useParams(); // Get the department name from the URL
  const [timetable, setTimetable] = useState({});
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedBatch, setSelectedBatch] = useState(""); // New state for selected batch
  const [subjectSuggestions, setSubjectSuggestions] = useState([
    "Math", "Physics", "Chemistry", "Biology", "Computer Science", "History", "Geography"
  ]);
  const [newTimetable, setNewTimetable] = useState({
    day: "",
    timeSlots: {
      "9:00-10:00": "",
      "10:00-11:00": "",
      "11:00-12:00": "",
      "12:00-1:00": "",
      "1:00-2:00": "",
      "2:00-3:00": "",
      "3:00-4:00": "",
    },
  });

  useEffect(() => {
    // Mock data (replace this with actual data from an API or database)
    setTimetable({
      "First Year": {
        Monday: {
          "9:00-10:00": "Math",
          "10:00-11:00": "Physics",
        },
        Wednesday: {
          "9:00-10:00": "Computer Science",
          "10:00-11:00": "Biology",
        },
      },
      "Second Year": {
        Monday: {
          "9:00-10:00": "History",
          "10:00-11:00": "Geography",
        },
        Wednesday: {
          "9:00-10:00": "Chemistry",
          "10:00-11:00": "Math",
        },
      },
    });
  }, [departmentName]);

  const handleInputChange = (e, day, timeSlot) => {
    const updatedTimetable = { ...timetable };
    updatedTimetable[selectedBatch][day] = {
      ...updatedTimetable[selectedBatch][day],
      [timeSlot]: e.target.value,
    };
    setTimetable(updatedTimetable); // Update the timetable state dynamically
  };

  const handleBatchSelect = (batch) => {
    setSelectedBatch(batch); // Set the selected batch
    setSelectedDay(""); // Reset selected day when changing batches
  };

  const handleDaySelect = (day) => {
    setSelectedDay(day);
  };

  const handleAddTimetable = (e) => {
    e.preventDefault();
    if (selectedDay && selectedBatch) {
      // Update timetable with new time slots for the selected day and batch
      const updatedTimetable = { ...timetable };
      updatedTimetable[selectedBatch][selectedDay] = newTimetable.timeSlots;

      // Update the timetable state with the new timetable
      setTimetable(updatedTimetable);

      // Reset the newTimetable state
      setNewTimetable({
        day: "",
        timeSlots: {
          "9:00-10:00": "",
          "10:00-11:00": "",
          "11:00-12:00": "",
          "12:00-1:00": "",
          "1:00-2:00": "",
          "2:00-3:00": "",
          "3:00-4:00": "",
        },
      });
    }
  };

  const handleSubjectChange = (e, timeSlot) => {
    const updatedNewTimetable = { ...newTimetable };
    updatedNewTimetable.timeSlots[timeSlot] = e.target.value;
    setNewTimetable(updatedNewTimetable);
  };

  // Filter suggestions dynamically based on user input
  const getFilteredSuggestions = (input) => {
    return subjectSuggestions.filter((subject) =>
      subject.toLowerCase().includes(input.toLowerCase())
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">{departmentName} Timetable</h1>

      {/* Batch Buttons */}
      <div className="flex space-x-4 mb-6">
        {["First Year", "Second Year"].map((batch) => (
          <button
            key={batch}
            onClick={() => handleBatchSelect(batch)}
            className={`p-3 w-32 rounded-lg ${selectedBatch === batch ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          >
            {batch}
          </button>
        ))}
      </div>

      {/* Day Buttons (only shows after selecting a batch) */}
      {selectedBatch && (
        <div>
          <div className="flex space-x-4 mb-6">
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
              <button
                key={day}
                onClick={() => handleDaySelect(day)}
                className={`p-3 w-24 rounded-lg ${selectedDay === day ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Time Slot Inputs for the Selected Day */}
          {selectedDay && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Set Timetable for {selectedDay} - {selectedBatch}</h2>

              <div className="grid grid-cols-7 gap-4">
                {Object.keys(newTimetable.timeSlots).map((timeSlot) => (
                  <div key={timeSlot} className="flex flex-col">
                    <label className="text-sm font-semibold mb-2">{timeSlot}</label>
                    <input
                      type="text"
                      value={newTimetable.timeSlots[timeSlot]}
                      onChange={(e) => handleSubjectChange(e, timeSlot)}
                      placeholder="Type subject"
                      className="p-3 border rounded-lg shadow-sm"
                    />
                    {/* Display subject suggestions */}
                    {newTimetable.timeSlots[timeSlot] && (
                      <div className="mt-2 max-h-32 overflow-auto border bg-white shadow-lg rounded-lg">
                        {getFilteredSuggestions(newTimetable.timeSlots[timeSlot]).map((suggestion, index) => (
                          <div
                            key={index}
                            className="p-2 cursor-pointer hover:bg-gray-200"
                            onClick={() => handleSubjectChange({ target: { value: suggestion } }, timeSlot)}
                          >
                            {suggestion}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={handleAddTimetable}
                className="mt-4 p-3 bg-blue-500 text-white rounded-lg w-full"
              >
                Add Timetable
              </button>
            </div>
          )}
        </div>
      )}

      {/* Timetable Display */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4">Current Timetable for {selectedBatch}</h2>
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full table-auto bg-white border-separate border-spacing-0">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="p-3 text-left">Day</th>
                <th className="p-3 text-left">9:00-10:00</th>
                <th className="p-3 text-left">10:00-11:00</th>
                <th className="p-3 text-left">11:00-12:00</th>
                <th className="p-3 text-left">12:00-1:00</th>
                <th className="p-3 text-left">1:00-2:00</th>
                <th className="p-3 text-left">2:00-3:00</th>
                <th className="p-3 text-left">3:00-4:00</th>
              </tr>
            </thead>
            <tbody>
              {selectedBatch &&
                Object.keys(timetable[selectedBatch]).map((day) => (
                  <tr key={day} className="border-b hover:bg-gray-100">
                    <td className="p-3">{day}</td>
                    {["9:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-1:00", "1:00-2:00", "2:00-3:00", "3:00-4:00"].map((timeSlot) => (
                      <td key={timeSlot} className="p-3">
                        {timetable[selectedBatch][day][timeSlot] || "Free"}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TimetablePage;
