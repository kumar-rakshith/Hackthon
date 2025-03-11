import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 

const UserLogin = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [role, setRole] = useState(""); 
  const navigate = useNavigate(); 
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log({ username, password, role });

      const response = await axios.post(
        "http://localhost:5000/api/auth/userLogin",
        { username, password, role }
      );

      if (response.data) {
        const { username, role } = response.data.user;
        // Navigate based on the role
        if (role === "admin") {
          navigate("/admin/dashboard", { state: { username } });
        } else if (role === "hod") {
          navigate("/hod/dashboard", { state: { username } });
        } else if (role === "exam_department") {
          navigate("/exam-department/dashboard", { state: { username } });
        } else if (role === "faculty") {
          navigate("/faculty/dashboard", { state: { username } });
        } else if (role === "student") {
          navigate("/student/dashboard", { state: { username } });
        }
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Login failed");
      console.log("Error during login:", error);
    }
  };
  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url("https://sjec.ac.in/storage/sliders/1713459246_6621502ed9332.png")' }}
    >
      <div className="wrapper bg-white bg-opacity-20 p-16 rounded-3xl shadow-lg backdrop-blur-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h1 className="text-2xl text-white text-center uppercase mb-6 font-Poppins">User Panel</h1>

          {/* Username Field */}
          <div className="relative mb-6">
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="font-Poppins peer w-full py-2 px-3 bg-transparent border-b-2 border-gray-300 text-white placeholder-transparent focus:outline-none focus:border-white"
            />
            <label
              htmlFor="username"
              className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white text-sm transition-all duration-200 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:transform-none peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-white peer-focus:scale-80 peer-valid:top-0 peer-valid:text-xs peer-valid:scale-80"
            >
              Enter Your Username
            </label>
          </div>

          {/* Password Field */}
          <div className="relative mb-6">
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="font-Poppins peer w-full py-2 px-3 bg-transparent border-b-2 border-gray-300 text-white placeholder-transparent focus:outline-none focus:border-white"
            />
            <label
              htmlFor="password"
              className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white text-sm transition-all duration-200 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:transform-none peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-white peer-focus:scale-80 peer-valid:top-0 peer-valid:text-xs peer-valid:scale-80"
            >
              Enter Your Password
            </label>
          </div>

          {/* Role Dropdown */}
          <div className="relative mb-6">
            <select
              id="role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="font-Poppins peer w-full py-2 px-3 bg-transparent border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-white"
            >
              <option value="" disabled></option>
              <option value="admin">Admin</option>
              <option value="hod">HOD</option>
              <option value="faculty">Faculty</option>
              <option value="exam_department">Exam Department</option>
              <option value="student">Student</option>
            </select>
            <label
              htmlFor="role"
              className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white text-sm transition-all duration-200 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:transform-none peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-white peer-focus:scale-80 peer-valid:top-0 peer-valid:text-xs peer-valid:scale-80"
            >
              Select Your Role
            </label>
          </div>

          {errorMessage && (
            <div className="text-red-500 font-semibold italic mb-4">
              {errorMessage}
            </div>
          )}

          {/* Show Password Checkbox */}
          <div className="flex items-center mb-8 text-white">
            <input
              type="checkbox"
              checked={passwordVisible}
              onChange={() => setPasswordVisible(!passwordVisible)}
              id="showPasswordCheckbox"
              className="mr-2 accent-white"
            />
            <label htmlFor="showPasswordCheckbox" className="font-italic text-sm">
              Show Password
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-white text-black font-semibold rounded-lg transition duration-300 ease-in-out hover:bg-gray-100 focus:outline-none"
          >
            LOG IN
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
