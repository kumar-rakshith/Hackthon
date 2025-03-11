
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";



// UserLogin
import Login from './Pages/Login';


//admin
import AdminLayout from "./Layout/AdminLayout";
import AdminDepartment from "./component/Admin/Department";
import AdminDepartmentInfo from "./component/Admin/DepartmentInfo";
import FacultyPage from "./component/Admin/FacultyPage";
import SetBatch from "./component/Admin/SetBatch";
import TimetablePage from "./component/Admin/TimetablePage";
import Subject from './component/Admin/Subject';
import AddFaculty from "./component/Admin/AddFaculty";
import ViewFaculty from "./component/Admin/ViewFaculty";


// faculty routes 
import FacultyLayout from "./Layout/FacultyLayout";
import Batchpage from "./component/Faculty/BatchPage";
import AddAttendees from "./component/Faculty/AddAttendees";
import InternalMarks from "./component/Faculty/InternalMarks";
import TimeTable from './component/Faculty/TimeTable';
import Report from './component/Faculty/Report';


//Student 
import StuTimetable from "./component/Student/StuTimetable";
import StudentLayout from "./Layout/StudentLayout";
import Marks from "./component/Student/Marks";
import HallTicket from "./component/Student/HallTicket";
import StudentAttendces from "./component/Student/StudentAttendces";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* login Route */}
        <Route path="/" element={<Login />} />


        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={
          <AdminLayout>
            <AdminDepartment />
          </AdminLayout>
        } />
        <Route path="/admin/dashboard/:departmentName" element={
          <AdminLayout>
            <AdminDepartmentInfo />
          </AdminLayout>
        } />

        <Route path="/Admin/dashboard/:departmentName/Timetable" element={
          <AdminLayout>
            <TimetablePage />
          </AdminLayout>
        } />
        <Route path="/Admin/dashboard/:departmentName/Faculty" element={
          <AdminLayout>
            <FacultyPage />
          </AdminLayout>
        } />


        <Route path="/Admin/dashboard/:departmentName/Batch" element={
          <AdminLayout>
            <SetBatch />
          </AdminLayout>
        } />

        <Route path="/Admin/dashboard/:departmentName/Subject" element={
          <AdminLayout>
            <Subject />
          </AdminLayout>
        } />



        <Route path="/Admin/dashboard/:departmentName/faculty/view-faculty" element={
          <AdminLayout>
            <ViewFaculty />
          </AdminLayout>
        } />


        <Route path="/Admin/dashboard/:departmentName/faculty/add-faculty" element={
          <AdminLayout>
            <AddFaculty />
          </AdminLayout>
        } />

        <Route path="/Admin/dashboard/:departmentName/faculty/assign-subject" element={
          <AdminLayout>
            <Subject />
          </AdminLayout>
        } />




        {/* Faculty */}

        <Route path="/faculty/dashboard" element={
          <FacultyLayout>
            <Batchpage />
          </FacultyLayout>
        } />


        <Route path="/faculty/dashboard/:batch" element={
          <FacultyLayout>
            <Batchpage />
          </FacultyLayout>
        } />

        <Route path="/faculty/batch/AddAttendees" element={
          <FacultyLayout>
            <AddAttendees />
          </FacultyLayout>
        } />


        <Route path="/faculty/batch/InternalMarks" element={
          <FacultyLayout>
            <InternalMarks />
          </FacultyLayout>
        } />


        <Route path="/faculty/batch/timetabel" element={
          <FacultyLayout>
            <TimeTable />
          </FacultyLayout>
        } />


        <Route path="/faculty/batch/report" element={
          <FacultyLayout>
            <Report />
          </FacultyLayout>
        } />


        <Route path="/student/dashboard" element={
          <StudentLayout>
            <StuTimetable />
          </StudentLayout>
        } />



        <Route path="/student/marks" element={
          <StudentLayout>
            <Marks studentId={1} />
          </StudentLayout>
        } />


        <Route path="/student/attendance" element={
          <StudentLayout>
            <StudentAttendces />
          </StudentLayout>
        } />

        <Route path="/student/hallticket" element={
          <StudentLayout>
            <HallTicket />
          </StudentLayout>
        } />

      </Routes>
    </Router>
  );
};

export default App;
