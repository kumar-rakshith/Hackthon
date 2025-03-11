import React from 'react';
import { jsPDF } from 'jspdf';

const HallTicket = () => {
  
  // Function to generate and download the PDF
  const generatePDF = () => {
    const doc = new jsPDF();

    // Title of the Hall Ticket
    doc.setFontSize(18);
    doc.text('Hall Ticket', 105, 20, null, null, 'center');

    // Student Name
    doc.setFontSize(14);
    doc.text('Student Name: John Doe', 20, 40);  // You can replace with dynamic name

    // Exam Time Table Header
    doc.setFontSize(12);
    doc.text('Exam Timetable:', 20, 60);

    // Define the table columns and data
    const timetableData = [
      ['Subject', 'Time'],
      ['Subject 1', '9:00 AM - 11:00 AM'],
      ['Subject 2', '12:00 PM - 2:00 PM'],
      ['Subject 3', '3:00 PM - 5:00 PM'],
    ];

    // Set table styles
    doc.setFontSize(10);
    const tableWidth = 180;  // Define table width
    const columnWidths = [100, 80];  // Define column widths

    // Draw table headers
    doc.setFillColor(0, 123, 255);  // Set background color for header
    doc.setTextColor(255, 255, 255);  // Set text color for header
    for (let i = 0; i < timetableData[0].length; i++) {
      doc.rect(20 + columnWidths[i] * i, 70, columnWidths[i], 10, 'F');  // Draw background for header
      doc.text(timetableData[0][i], 20 + columnWidths[i] * i + 5, 75);  // Add header text
    }

    // Draw the table rows
    doc.setTextColor(0, 0, 0);  // Reset text color for the rest of the table
    for (let row = 1; row < timetableData.length; row++) {
      for (let col = 0; col < timetableData[row].length; col++) {
        doc.rect(20 + columnWidths[col] * col, 80 + row * 10, columnWidths[col], 10);  // Draw cell borders
        doc.text(timetableData[row][col], 20 + columnWidths[col] * col + 5, 85 + row * 10);  // Add cell text
      }
    }

    // Exam Rules
    doc.setFontSize(12);
    doc.text('Exam Rules:', 20, 120);
    doc.setFontSize(10);
    doc.text('1. No electronic devices allowed.', 20, 130);
    doc.text('2. Be seated 30 minutes before the exam.', 20, 140);
    doc.text('3. Bring your ID card for verification.', 20, 150);
    doc.text('4. Follow the instructions of the invigilator.', 20, 160);
    // Add more rules if needed

    // Save the PDF
    doc.save('hall_ticket.pdf');
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center text-blue-500 mb-6">Hall Ticket</h1>

      {/* Button to download PDF */}
      <button
        onClick={generatePDF}
        className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Download Hall Ticket PDF
      </button>
    </div>
  );
};

export default HallTicket;
