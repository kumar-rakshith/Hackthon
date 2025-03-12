import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import axios from "axios"; // Import axios to make the API request

const AdminDashboardLayout = ({ children }) => {
  const location = useLocation(); // Get the current location (route)
  const navigate = useNavigate(); // Use navigate for programmatic navigation
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to handle dropdown visibility
  const [departments, setDepartments] = useState([]); // Departments state

  // Admin Info (mocked data)
  const adminInfo = {
    name: "Admin",
    profilePicture: "https://randomuser.me/api/portraits/men/75.jpg",
    contact: "admin@example.com",
  };

  // Fetch department data from backend on component mount
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/departments"); // Replace with your backend URL
        setDepartments(response.data); // Store the fetched data in state
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments(); // Call the function to fetch departments
  }, []);

  // Helper function to determine if the current route matches
  const isActive = (path) =>
    location.pathname.includes(path)
      ? "bg-blue-600 text-white hover:bg-blue-700"
      : "bg-gray-200 text-gray-600 hover:bg-gray-300";

  const handleDepartmentClick = (department) => {
    setIsDropdownOpen(false);
    navigate(`/Admin/dashboard/${department.name}`);
  };

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
            <Link
              to="/Admin/dashboard"
              className={`block text-center w-full py-2 rounded-md ${isActive("/Admin/dashboard")}`}
            >
              Department
            </Link>

            {/* Department Dropdown */}
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isDropdownOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="mt-2 bg-white rounded-md">
                <ul>
                  {departments.map((dept, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 cursor-pointer rounded-2xl m-2 hover:bg-gray-200"
                      onClick={() => handleDepartmentClick(dept)}
                    >
                      <h2 className="text-sm font-semibold">{dept.name}</h2>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6">
          {children} {/* This renders the page content passed to the layout */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
