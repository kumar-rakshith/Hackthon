import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // To access URL parameters

function App() {
  const { departmentName } = useParams(); // Get department name from the URL
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [selectedFaculty, setSelectedFaculty] = useState(null); // Selected faculty for update
  const [updatedName, setUpdatedName] = useState('');
  const [updatedContact, setUpdatedContact] = useState('');
  const [updatedAddress, setUpdatedAddress] = useState('');
  const [updatedSubject, setUpdatedSubject] = useState('');

  useEffect(() => {
    // Fetch data from backend (simulate with a fetch request)
    fetch('http://localhost:5000/data') // Make sure your backend is running here
      .then((response) => response.json())
      .then((data) => {
        // Filter faculties based on department name
        const filteredData = data.filter(item => item.department_name === departmentName);
        setData(filteredData); // Set filtered data
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [departmentName]);

  // Open modal with faculty details for update
  const openUpdateModal = (faculty) => {
    setSelectedFaculty(faculty);
    setUpdatedName(faculty.name);
    setUpdatedContact(faculty.contact);
    setUpdatedAddress(faculty.address);
    setUpdatedSubject(faculty.subject || '');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFaculty(null);
  };

  const handleUpdate = () => {
    const updatedFaculty = {
      ...selectedFaculty,
      name: updatedName,
      contact: updatedContact,
      address: updatedAddress,
      subject: updatedSubject,
    };

    // Update the faculty in the state (simulating the update on the frontend)
    setData(data.map(faculty => faculty.id === selectedFaculty.id ? updatedFaculty : faculty));
    closeModal();
  };

  const handleDelete = (id) => {
    // Remove the faculty from the state (simulating the delete operation on the frontend)
    setData(data.filter(faculty => faculty.id !== id));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Faculties in {departmentName} Department</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Loop over the faculties and display them in boxes */}
        {data.length > 0 ? (
          data.map((item) => (
            <div
              key={item.id}
              className="w-full bg-gray-900 text-white p-6 rounded-lg shadow-lg cursor-pointer hover:bg-gray-600 transition duration-200"
            >
              <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
              <p className="mb-2">Contact: {item.contact}</p>
              <p className="mb-2">Address: {item.address}</p>
              <p className="mb-2">Subject: {item.subject || "N/A"}</p>
              <p className="text-sm">Department: {item.department_name}</p>
              
              {/* Update Button */}
              <button
                onClick={() => openUpdateModal(item)} // Open modal for updating faculty
                className="mt-4 w-full bg-blue-500 hover:bg-blue-400 text-white font-semibold p-2 rounded-md"
              >
                Update
              </button>
              
              {/* Delete Button */}
              <button
                onClick={() => handleDelete(item.id)} // Delete faculty directly from the state
                className="mt-2 w-full bg-red-500 hover:bg-red-400 text-white font-semibold p-2 rounded-md"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center p-4">No faculties found in this department.</div>
        )}
      </div>

      {/* Modal for updating faculty */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">Update Faculty</h2>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-semibold">Name</label>
              <input
                id="name"
                type="text"
                className="w-full p-3 border rounded-md"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="contact" className="block text-sm font-semibold">Contact</label>
              <input
                id="contact"
                type="text"
                className="w-full p-3 border rounded-md"
                value={updatedContact}
                onChange={(e) => setUpdatedContact(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-semibold">Address</label>
              <input
                id="address"
                type="text"
                className="w-full p-3 border rounded-md"
                value={updatedAddress}
                onChange={(e) => setUpdatedAddress(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="subject" className="block text-sm font-semibold">Subject</label>
              <input
                id="subject"
                type="text"
                className="w-full p-3 border rounded-md"
                value={updatedSubject}
                onChange={(e) => setUpdatedSubject(e.target.value)}
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleUpdate} // Update faculty in the state
                className="bg-blue-500 hover:bg-blue-400 text-white font-semibold p-2 rounded-md"
              >
                Update
              </button>
              <button
                onClick={closeModal} // Close modal without saving
                className="bg-gray-500 hover:bg-gray-400 text-white font-semibold p-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
