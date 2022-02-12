-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 12, 2022 at 12:53 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jobportal`
--

-- --------------------------------------------------------

--
-- Table structure for table `addjob`
--

CREATE TABLE `addjob` (
  `jobId` int(11) NOT NULL,
  `companyId` int(11) DEFAULT NULL,
  `companyName` varchar(255) DEFAULT NULL,
  `jobRole` varchar(255) DEFAULT NULL,
  `expRequired` varchar(255) DEFAULT NULL,
  `skills` varchar(255) DEFAULT NULL,
  `educationalQualifications` varchar(255) DEFAULT NULL,
  `jobDescription` varchar(255) DEFAULT NULL,
  `jobType` varchar(255) DEFAULT NULL,
  `resume` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'no',
  `userId` int(255) NOT NULL,
  `postedDate` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `addjob`
--

INSERT INTO `addjob` (`jobId`, `companyId`, `companyName`, `jobRole`, `expRequired`, `skills`, `educationalQualifications`, `jobDescription`, `jobType`, `resume`, `status`, `userId`, `postedDate`) VALUES
(3, 1, 'Lagoon', 'Software Engineer', '4-6', 'ASP.Net', 'Software Engineer', 'Thia is a template job', 'Full-Time', NULL, 'applied', 0, '2022-02-11 07:01:54'),
(4, 1, 'Lagoon', 'Node JS Developer', '4', 'Node', 'Web Developer', 'this is template', 'Full-Time', NULL, 'no', 0, '2022-02-11 14:36:29'),
(5, 1, 'Lagoon', 'Node JS Developer', '3', 'Node Js,Angular', 'Web Developer', 'this is a node js job', 'Full-Time', NULL, 'no', 0, '2022-02-11 18:07:19'),
(8, 1, 'Lagoon', 'Angular Developer', '6', 'Angular,HTML,CSS', 'Angular Developer', 'This is an Angular Developer Job', 'Full-Time', NULL, 'no', 0, '2022-02-12 11:49:05');

-- --------------------------------------------------------

--
-- Table structure for table `applyjob`
--

CREATE TABLE `applyjob` (
  `Id` int(255) NOT NULL,
  `jobId` int(255) DEFAULT NULL,
  `companyId` int(255) NOT NULL,
  `companyName` varchar(255) DEFAULT NULL,
  `jobRole` varchar(255) DEFAULT NULL,
  `expRequired` varchar(255) DEFAULT NULL,
  `skills` varchar(255) DEFAULT NULL,
  `educationalQualifications` varchar(255) DEFAULT NULL,
  `jobDescription` varchar(255) DEFAULT NULL,
  `jobType` varchar(255) DEFAULT NULL,
  `resume` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `userId` int(255) DEFAULT NULL,
  `postedDate` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `applyjob`
--

INSERT INTO `applyjob` (`Id`, `jobId`, `companyId`, `companyName`, `jobRole`, `expRequired`, `skills`, `educationalQualifications`, `jobDescription`, `jobType`, `resume`, `status`, `userId`, `postedDate`) VALUES
(1, 1, 1, 'Lagoon', 'Software Developer', '4', 'ASP.Net', 'B.E', 'software', 'Full-Time', NULL, 'applied', 1, NULL),
(2, 2, 1, 'Lagoon', 'Software Developer', '4', 'ASP.Net', 'B.E', 'software', 'Full-Time', NULL, 'applied', 1, NULL),
(3, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-02-12 14:09:44'),
(5, 3, 1, 'Lagoon', 'Software Engineer', '2-4', 'ASP.Net', 'Engineering', 'Thia is a template job', 'Full-Time', NULL, 'applied', 1, '2022-02-11 07:01:54'),
(6, 4, 1, 'Lagoon', 'Node JS Developer', '4', 'Node', 'Web Developer', 'this is template', 'Full-Time', NULL, 'applied', 1, '2022-02-11 14:36:29'),
(7, 1, 1, 'Lagoon', 'Software Developer', '4', 'ASP.Net', 'B.E', 'software', 'Full-Time', NULL, 'applied', 2, NULL),
(8, 8, 1, 'Lagoon', 'Angular Developer', '6', 'Angular,HTML,CSS', 'Angular Developer', 'This is an Angular Developer Job', 'Full-Time', NULL, 'applied', 2, '2022-02-12 11:49:05'),
(9, 4, 1, 'Lagoon', 'Node JS Developer', '4', 'Node', 'Web Developer', 'this is template', 'Full-Time', NULL, 'applied', 2, '2022-02-11 14:36:29');

-- --------------------------------------------------------

--
-- Table structure for table `recruiter`
--

CREATE TABLE `recruiter` (
  `Id` int(255) NOT NULL,
  `companyName` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `companyMail` varchar(255) NOT NULL,
  `industryType` varchar(255) NOT NULL,
  `yearsofExp` varchar(255) NOT NULL,
  `About` varchar(255) NOT NULL,
  `CreatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `recruiter`
--

INSERT INTO `recruiter` (`Id`, `companyName`, `password`, `companyMail`, `industryType`, `yearsofExp`, `About`, `CreatedAt`) VALUES
(1, 'Lagoon', 'Lagoon', 'lagoon@gmail.com', 'IT', '3', 'i am a recruiter', '2022-02-11 13:12:08'),
(3, 'FCFleets', 'FCFleets', 'fcfleet@gmail.com', 'IT', '3', 'This is IT development Company', '2022-02-11 13:17:54');

-- --------------------------------------------------------

--
-- Table structure for table `seeker`
--

CREATE TABLE `seeker` (
  `Id` int(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `mail` varchar(255) DEFAULT NULL,
  `gender` varchar(255) NOT NULL,
  `mobile` int(11) NOT NULL,
  `education` varchar(255) DEFAULT NULL,
  `dateofeducation` datetime DEFAULT NULL,
  `experience` int(11) NOT NULL,
  `currentLocation` int(11) NOT NULL,
  `lastjobexp` int(11) NOT NULL,
  `lastjobDesig` varchar(255) NOT NULL,
  `department` varchar(255) NOT NULL,
  `industry` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `jobtitle` varchar(255) DEFAULT NULL,
  `company` varchar(255) DEFAULT NULL,
  `datestarted` datetime DEFAULT NULL,
  `skills` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `seeker`
--

INSERT INTO `seeker` (`Id`, `username`, `password`, `mail`, `gender`, `mobile`, `education`, `dateofeducation`, `experience`, `currentLocation`, `lastjobexp`, `lastjobDesig`, `department`, `industry`, `createdAt`, `jobtitle`, `company`, `datestarted`, `skills`) VALUES
(1, 'ruhina', '', 'ruhina@gmail.com', 'female', 2147483647, 'High School', '2022-03-03 00:00:00', 5, 0, 0, '', '', 'IT', '2022-02-11 18:23:20', 'Software', 'Lagoon', '2022-02-16 00:00:00', 'Node Js'),
(2, 'anjali', 'anjali', 'anjali@gmail.com', 'Female', 2147483647, NULL, NULL, 4, 0, 2, 'Node JS Developer', 'Service', NULL, '2022-02-11 18:33:14', NULL, NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `addjob`
--
ALTER TABLE `addjob`
  ADD PRIMARY KEY (`jobId`);

--
-- Indexes for table `applyjob`
--
ALTER TABLE `applyjob`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `recruiter`
--
ALTER TABLE `recruiter`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `seeker`
--
ALTER TABLE `seeker`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `addjob`
--
ALTER TABLE `addjob`
  MODIFY `jobId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `applyjob`
--
ALTER TABLE `applyjob`
  MODIFY `Id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `recruiter`
--
ALTER TABLE `recruiter`
  MODIFY `Id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `seeker`
--
ALTER TABLE `seeker`
  MODIFY `Id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
