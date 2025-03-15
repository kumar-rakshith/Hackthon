-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 12, 2025 at 05:51 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hackthon`
--

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `id` int(11) NOT NULL,
  `student_id` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `status` enum('Present','Absent') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attendance`
--

INSERT INTO `attendance` (`id`, `student_id`, `date`, `status`) VALUES
(1, 1, '0000-00-00', 'Present'),
(2, 2, '0000-00-00', 'Present'),
(3, 3, '0000-00-00', 'Present'),
(4, 4, '0000-00-00', 'Present'),
(5, 5, '0000-00-00', 'Present'),
(6, 6, '0000-00-00', 'Present'),
(7, 7, '0000-00-00', 'Present'),
(8, 8, '0000-00-00', 'Present'),
(9, 9, '0000-00-00', 'Present'),
(10, 10, '0000-00-00', 'Present'),
(11, 11, '0000-00-00', 'Present'),
(12, 12, '0000-00-00', 'Present'),
(13, 13, '0000-00-00', 'Present'),
(14, 14, '0000-00-00', 'Present'),
(15, 15, '0000-00-00', 'Present'),
(16, 16, '0000-00-00', 'Present'),
(17, 17, '0000-00-00', 'Present'),
(18, 18, '0000-00-00', 'Present'),
(19, 19, '0000-00-00', 'Present'),
(20, 20, '0000-00-00', 'Present'),
(21, 21, '0000-00-00', 'Present'),
(22, 22, '0000-00-00', 'Present'),
(23, 23, '0000-00-00', 'Present'),
(24, 24, '0000-00-00', 'Present'),
(25, 25, '0000-00-00', 'Present'),
(26, 26, '0000-00-00', 'Present'),
(27, 27, '0000-00-00', 'Present'),
(28, 28, '0000-00-00', 'Present'),
(29, 29, '0000-00-00', 'Present'),
(30, 30, '0000-00-00', 'Present'),
(31, 31, '0000-00-00', 'Present');

-- --------------------------------------------------------

--
-- Table structure for table `batches`
--

CREATE TABLE `batches` (
  `id` int(11) NOT NULL,
  `department_name` varchar(255) NOT NULL,
  `year` varchar(255) NOT NULL,
  `section` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `batches`
--

INSERT INTO `batches` (`id`, `department_name`, `year`, `section`, `created_at`) VALUES
(1, 'AI & Data Science', 'First Year', 'A', '2025-03-10 15:37:01'),
(2, 'Computer Science & Engineering (Data Science)', 'second', 'v', '2025-03-10 15:41:17'),
(3, 'Computer Science & Engineering (Data Science)', 'a', 's', '2025-03-10 15:47:28'),
(4, 'Computer Science', 'Second ', 'g', '2025-03-10 15:48:14');

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`id`, `name`) VALUES
(1, 'AI & ML'),
(2, 'Civil'),
(3, 'Computer Science'),
(4, 'Computer Science & Engineering (Data Science)'),
(5, 'Computer Science and Business Systems'),
(6, 'Electrical & Electronics'),
(7, 'Electronics & Communication'),
(8, 'Humanities Department');

-- --------------------------------------------------------

--
-- Table structure for table `faculty`
--

CREATE TABLE `faculty` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `department_name` varchar(255) NOT NULL,
  `contact` varchar(20) NOT NULL,
  `address` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `faculty`
--

INSERT INTO `faculty` (`id`, `name`, `department_name`, `contact`, `address`, `subject`) VALUES
(1, 'Aarav Sharma', 'AI & ML', '123-456-7890', '12, Red Fort, Delhi', 'Machine Learning'),
(2, 'Aditya Mehta', 'Civil', '987-654-3210', '14, MG Road, Bangalore', 'Structural Engineering'),
(3, 'Rohan Kapoor', 'Computer Science', '555-123-4567', '22, Bandra West, Mumbai', 'Programming'),
(4, 'Rahul Gupta', 'Computer Science & Engineering (Data Science)', '666-555-4444', '56, Koramangala, Bangalore', 'Data Science'),
(5, 'Aryan Verma', 'Computer Science and Business Systems', '444-333-2222', '78, Salt Lake, Kolkata', 'Business Systems'),
(6, 'Arjun Patel', 'Electrical & Electronics', '333-444-5555', '23, Ellisbridge, Ahmedabad', 'Electronics Engineering'),
(7, 'Vikram Desai', 'Electronics & Communication', '222-333-4444', '89, Juhu Beach, Mumbai', 'Communication Systems'),
(8, 'Kunal Joshi', 'Humanities Department', '111-222-3333', '11, Indore, Madhya Pradesh', 'Mechanical Engineering'),
(9, 'Rohit Agarwal', 'AI & ML', '555-666-7777', '45, Park Street, Kolkata', 'Data Science'),
(10, 'Priya Patel', 'Electrical & Electronics', '555-111-2222', '24, Pusa Road, Delhi', 'Electrical Engineering'),
(11, 'Manoj Verma', 'Computer Science', '777-888-9999', '10, Banjara Hills, Hyderabad', 'Computer Science'),
(12, 'Sneha Rao', 'Civil', '444-555-6666', '33, HSR Layout, Bangalore', 'Structural Engineering'),
(13, 'Amit Kumar', 'Computer Science & Engineering (Data Science)', '333-555-7777', '12, BTM Layout, Bangalore', 'Data Science'),
(14, 'Simran Kaur', 'Computer Science and Business Systems', '555-123-9876', '18, Sector 15, Noida', 'Business Systems'),
(15, 'Shivani Mehta', 'Electronics & Communication', '666-777-8888', '5, Navi Mumbai, Mumbai', 'Communication Systems'),
(16, 'Rajesh Soni', 'Computer Science', '222-333-5555', '60, Bandra East, Mumbai', 'Programming'),
(17, 'Anjali Gupta', 'AI & ML', '333-444-2222', '56, Connaught Place, Delhi', 'Machine Learning'),
(18, 'Madhur Gupta', 'Electrical & Electronics', '444-555-1111', '48, Satellite Road, Ahmedabad', 'Electronics Engineering'),
(19, 'Sanya Verma', 'Computer Science & Engineering (Data Science)', '999-888-7777', '11, Koramangala, Bangalore', 'Data Science'),
(20, 'Krishna Desai', 'Humanities Department', '333-222-1111', '28, Juhu, Mumbai', 'Mechanical Engineering'),
(21, 'Varun Yadav', 'Civil', '555-111-0000', '34, MG Road, Kolkata', 'Structural Engineering'),
(22, 'Nisha Sharma', 'Electrical & Electronics', '888-777-6666', '17, Mylapore, Chennai', 'Electrical Engineering'),
(23, 'Vishal Mehta', 'Computer Science', '555-999-8888', '40, Lower Parel, Mumbai', 'Programming'),
(24, 'Tanvi Joshi', 'AI & ML', '777-222-5555', '76, Dadar, Mumbai', 'Data Science'),
(25, 'Sunil Kumar', 'Electrical & Electronics', '333-444-5555', '60, Gandhinagar, Ahmedabad', 'Electronics Engineering'),
(26, 'Shubham Patil', 'Computer Science and Business Systems', '555-111-4444', '45, Sakinaka, Mumbai', 'Business Systems'),
(27, 'Geeta Verma', 'Computer Science', '111-222-4444', '55, Whitefield, Bangalore', 'Computer Science'),
(28, 'Alok Kumar', 'Electrical & Electronics', '999-555-1111', '77, Pune, Maharashtra', 'Electrical Engineering'),
(29, 'Ritika Shah', 'Civil', '888-555-7777', '9, Whitefield, Bangalore', 'Structural Engineering'),
(30, 'Siddharth Gupta', 'Electronics & Communication', '444-333-5555', '68, Santacruz, Mumbai', 'Communication Systems'),
(31, 'Tarun Agarwal', 'Computer Science & Engineering (Data Science)', '555-333-6666', '12, Whitefield, Hyderabad', 'Data Science'),
(32, 'Preeti Joshi', 'AI & ML', '888-555-4444', '45, Kanpur, UP', 'Machine Learning'),
(33, 'Shankar Iyer', 'Computer Science', '777-888-1111', '25, Bangalore West', 'Programming'),
(34, 'Pooja Yadav', 'Electrical & Electronics', '222-444-7777', '99, Indore, Madhya Pradesh', 'Electronics Engineering'),
(35, 'Naveen Kumar', 'Humanities Department', '555-666-9999', '8, Borivali, Mumbai', 'Mechanical Engineering'),
(36, 'Neha Mehta', 'Computer Science and Business Systems', '444-333-2222', '60, Parel, Mumbai', 'Business Systems'),
(37, 'Sushant Gupta', 'Electronics & Communication', '333-222-1111', '34, Dadar, Mumbai', 'Communication Systems'),
(38, 'Rakshith Kumar', 'Civil', '07349431204', '#1-157F Sindhura 10th Thokur Haleyangadi post Mangalore', 'maths'),
(39, 'rahul', 'Civil', '07349431204', '#1-157F Sindhura 10th Thokur Haleyangadi post Mangalore', 'maths'),
(40, 'Rakshith Kumar', 'Computer Science & Engineering (Data Science)', '07349431204', '#1-157F Sindhura 10th Thokur Haleyangadi post Mangalore', 'maths');

-- --------------------------------------------------------

--
-- Table structure for table `faculty_batch`
--

CREATE TABLE `faculty_batch` (
  `id` int(11) NOT NULL,
  `batch_name` varchar(255) NOT NULL,
  `year` varchar(10) NOT NULL,
  `department_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `faculty_batch`
--

INSERT INTO `faculty_batch` (`id`, `batch_name`, `year`, `department_name`) VALUES
(1, '2nd Year MCA A', '2nd Year', 'MCA'),
(2, '2nd Year MCA B', '2nd Year', 'MCA'),
(3, '1st Year MCA A', '1st Year', 'MCA'),
(4, '1st Year MCA B', '1st Year', 'MCA');

-- --------------------------------------------------------

--
-- Table structure for table `marks`
--

CREATE TABLE `marks` (
  `id` int(11) NOT NULL,
  `student_id` int(11) DEFAULT NULL,
  `subject1` int(11) DEFAULT NULL,
  `subject2` int(11) DEFAULT NULL,
  `subject3` int(11) DEFAULT NULL,
  `subject4` int(11) DEFAULT NULL,
  `subject5` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `marks`
--

INSERT INTO `marks` (`id`, `student_id`, `subject1`, `subject2`, `subject3`, `subject4`, `subject5`) VALUES
(1, 2, 20, 30, 60, 7, 45),
(2, 2, 20, 30, 60, 7, 45),
(3, 1, 23, 23, 65, 67, 6),
(4, 21, 45, 67, 89, 56, 45),
(5, 21, 45, 67, 89, 56, 45),
(6, 21, 45, 67, 89, 56, 45),
(7, 18, 34, 67, 78, 88, 87),
(8, 18, 34, 67, 78, 88, 87);

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `name`) VALUES
(1, 'Aarav Sharma'),
(2, 'Aditya Mehta'),
(3, 'Rohan Kapoor'),
(4, 'Priya Patel'),
(5, 'Manoj Verma'),
(6, 'Sneha Rao'),
(7, 'Amit Kumar'),
(8, 'Simran Kaur'),
(9, 'Shivani Mehta'),
(10, 'Rajesh Soni'),
(11, 'Anjali Gupta'),
(12, 'Madhur Gupta'),
(13, 'Sanya Verma'),
(14, 'Krishna Desai'),
(15, 'Varun Yadav'),
(16, 'Nisha Sharma'),
(17, 'Vishal Mehta'),
(18, 'Tanvi Joshi'),
(19, 'Sunil Kumar'),
(20, 'Shubham Patil'),
(21, 'Geeta Verma'),
(22, 'Alok Kumar'),
(23, 'Ritika Shah'),
(24, 'Siddharth Gupta'),
(25, 'Tarun Agarwal'),
(26, 'Preeti Joshi'),
(27, 'Shankar Iyer'),
(28, 'Pooja Yadav'),
(29, 'Naveen Kumar'),
(30, 'Neha Mehta'),
(31, 'Sushant Gupta');

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

CREATE TABLE `subjects` (
  `id` int(11) NOT NULL,
  `department_name` varchar(255) DEFAULT NULL,
  `year` varchar(255) DEFAULT NULL,
  `section` varchar(255) DEFAULT NULL,
  `subject_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`id`, `department_name`, `year`, `section`, `subject_name`) VALUES
(16, 'Computer Science', 'Second ', 'g', '1'),
(17, 'Computer Science', 'Second ', 'g', 't'),
(18, 'Computer Science', 'Second ', 'g', 'o'),
(19, 'Computer Science', 'Second ', 'g', 't'),
(20, 'Computer Science', 'Second ', 'g', 'o'),
(26, 'Computer Science & Engineering (Data Science)', 'a', 's', 'd'),
(27, 'Computer Science & Engineering (Data Science)', 'a', 's', 's'),
(28, 'Computer Science & Engineering (Data Science)', 'a', 's', 'nd'),
(29, 'Computer Science & Engineering (Data Science)', 'a', 's', 'knd'),
(30, 'Computer Science & Engineering (Data Science)', 'a', 's', 'nd');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','hod','exam_department','faculty','student') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role`) VALUES
(1, 'admin', '123', 'admin'),
(2, 'student', '123', 'student'),
(3, 'faculty', '123', 'faculty');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `batches`
--
ALTER TABLE `batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `faculty`
--
ALTER TABLE `faculty`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `faculty_batch`
--
ALTER TABLE `faculty_batch`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `marks`
--
ALTER TABLE `marks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attendance`
--
ALTER TABLE `attendance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `batches`
--
ALTER TABLE `batches`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `faculty`
--
ALTER TABLE `faculty`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `faculty_batch`
--
ALTER TABLE `faculty_batch`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `marks`
--
ALTER TABLE `marks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `subjects`
--
ALTER TABLE `subjects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attendance`
--
ALTER TABLE `attendance`
  ADD CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`);

--
-- Constraints for table `marks`
--
ALTER TABLE `marks`
  ADD CONSTRAINT `marks_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
