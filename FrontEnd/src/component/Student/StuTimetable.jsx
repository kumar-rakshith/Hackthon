import React, { useState } from "react";

const TimeTable = () => {
  // Sample Time Table Data (You can modify this according to your actual schedule)
  const [timetable, setTimetable] = useState({
    Monday: ["Math", "English", "Physics", "Chemistry", "Computer Science"],
    Tuesday: ["Biology", "History", "Math", "Art", "PE"],
    Wednesday: ["Computer Science", "English", "Math", "Physics", "Biology"],
    Thursday: ["Chemistry", "History", "Math", "Music", "PE"],
    Friday: ["Physics", "Chemistry", "Biology", "Art", "English"],
    Saturday: ["Math", "Computer Science", "History", "Biology", "Physics"],
  });

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
        Weekly Time Table
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8">
        {/* Days of the week */}
        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
          <div
            key={day}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <h2 className="text-xl font-semibold text-center text-blue-600 mb-4">{day}</h2>
            {/* Render the timetable for the day */}
            <ul className="list-none space-y-3">
              {timetable[day]?.map((subject, index) => (
                <li
                  key={index}
                  className="text-lg text-gray-700 font-medium px-4 py-2 rounded-lg hover:bg-blue-100 transition-all duration-300"
                >
                  {subject}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeTable;
