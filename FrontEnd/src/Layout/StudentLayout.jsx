import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

const AdminDashboardLayout = ({ children }) => {
  const location = useLocation(); // Get the current location (route)
  const navigate = useNavigate(); // Use navigate for programmatic navigation

  // Admin Info (mocked data)
  const adminInfo = {
    name: "Student",
    profilePicture: "https://randomuser.me/api/portraits/men/75.jpg",
    contact: "Student@example.com",
  };

  // Helper function to determine if the current route matches
  const isActive = (path) =>
    location.pathname.includes(path)
      ? "bg-blue-600 text-white hover:bg-blue-700"
      : "bg-gray-200 text-gray-600 hover:bg-gray-300";

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      // Clear any authentication data (e.g., remove tokens from localStorage)
      // localStorage.removeItem('authToken'); // Example

      // Navigate to the home page (or login page)
      navigate("/"); // Or wherever you want to navigate after logout
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Sidebar */}
      <nav className="w-full bg-blue-600 shadow-md py-4 px-6 flex justify-between items-center">
        {/* Left: Admin Info */}
        <div className="flex flex-col items-start space-y-1 text-white">
          <h2 className="text-xl font-bold">{adminInfo.name}</h2>
          <p className="text-sm">{adminInfo.contact}</p>
        </div>
        {/* Right: Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          <FiLogOut className="text-lg" />
          <span>Logout</span>
        </button>
      </nav>

      <div className="flex flex-1">
        <div className="w-64 bg-white shadow-lg py-6 px-4 flex flex-col space-y-6">
          {/* Sidebar Links */}
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Dropdown for Departments */}
          </div>

          {/* Sidebar Navigation Links */}
          <Link
            to="/student/dashboard"
            className={`block text-center w-full py-2 rounded-md ${isActive("/student/dashboard")}`}
          >
            View Time Table
          </Link>
          <Link
            to="/student/marks"
            className={`block text-center w-full py-2 rounded-md ${isActive("/student/marks")}`}
          >
            View Marks
          </Link>
          <Link
            to="/student/attendance"
            className={`block text-center w-full py-2 rounded-md ${isActive("/student/attendance")}`}
          >
            View Attendance
          </Link>

          <Link
            to="/student/hallticket"
            className={`block text-center w-full py-2 rounded-md ${isActive("/student/hallticket")}`}
          >
            Hall Ticket
          </Link>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6">
          {/* Render children content here */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
