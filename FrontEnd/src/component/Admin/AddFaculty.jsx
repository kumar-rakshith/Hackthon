import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function AddFaculty() {
  const { departmentName } = useParams();
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!name || !contact || !address || !subject) {
      setMessage('');
      setError('Please fill in all fields.');
      return;
    }

    const faculty = {
      name,
      department: departmentName, // Store the department name
      contact,
      address,
      subject,
    };

    try {
      // Make a POST request to the backend API
      const response = await fetch('http://localhost:5000/add-faculty', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(faculty),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message); // Success message
        setError(''); // Reset error
      } else {
        setMessage(''); // Reset success message
        setError(data.message); // Show error message
      }
    } catch (err) {
      console.error('Error:', err);
      setMessage('');
      setError('Failed to add faculty. Please try again.');
    }

    // Reset the form fields
    setName('');
    setContact('');
    setAddress('');
    setSubject('');
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Add Faculty - {departmentName} Department</h1>
      <form onSubmit={handleSubmit} className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-semibold mb-2">Faculty Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600"
            placeholder="Enter faculty name"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="contact" className="block text-sm font-semibold mb-2">Contact Number:</label>
          <input
            type="text"
            id="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600"
            placeholder="Enter contact number"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-semibold mb-2">Address:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600"
            placeholder="Enter address"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="subject" className="block text-sm font-semibold mb-2">Subject:</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600"
            placeholder="Enter subject assigned"
          />
        </div>

        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-400 text-white font-semibold p-3 rounded-md">
          Add Faculty
        </button>

        {message && <p className="mt-4 text-center text-sm font-semibold text-green-500">{message}</p>}
        {error && <p className="mt-4 text-center text-sm font-semibold text-red-500">{error}</p>}
      </form>
    </div>
  );
}

export default AddFaculty;
