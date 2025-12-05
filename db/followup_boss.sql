-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 04, 2025 at 04:24 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `followup_boss`
--

-- --------------------------------------------------------

--
-- Table structure for table `followups`
--

CREATE TABLE `followups` (
  `id` int(11) NOT NULL,
  `source` enum('WhatsApp','Call','Verbal','Email','Other') NOT NULL,
  `who` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `due_date` date DEFAULT NULL,
  `priority` enum('Low','Medium','High') DEFAULT 'Low',
  `status` enum('Pending','Done','Snoozed') DEFAULT 'Pending',
  `snoozed_till` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `followups`
--

INSERT INTO `followups` (`id`, `source`, `who`, `message`, `due_date`, `priority`, `status`, `snoozed_till`, `created_at`, `updated_at`) VALUES
(1, 'Call', 'Suman Kumar Das', 'test', '2025-12-05', 'Medium', 'Done', NULL, '2025-12-04 14:08:38', '2025-12-04 15:13:14'),
(2, 'WhatsApp', 'Suman Two', 'test two', '2025-12-12', 'High', 'Snoozed', '2025-12-19', '2025-12-04 14:09:13', '2025-12-04 15:19:38'),
(3, 'WhatsApp', 'Sam Test', 'test Three', '2025-12-06', 'Low', 'Pending', NULL, '2025-12-04 14:09:42', '2025-12-04 15:20:12'),
(4, 'Call', 'suman', 'dsdsd', '2025-12-05', 'Medium', 'Pending', NULL, '2025-12-04 15:01:59', '2025-12-04 15:10:41'),
(5, 'Verbal', 'Final Test', 'test again', '2025-12-12', 'Medium', 'Done', NULL, '2025-12-04 15:20:00', '2025-12-04 15:23:52');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followups`
--
ALTER TABLE `followups`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `followups`
--
ALTER TABLE `followups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
