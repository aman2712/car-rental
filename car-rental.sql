-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 15, 2024 at 08:01 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `car-rental`
--

-- --------------------------------------------------------

--
-- Table structure for table `cars`
--

CREATE TABLE `cars` (
  `id` int(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `rating` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  `transmission` varchar(255) NOT NULL,
  `seats` varchar(255) NOT NULL,
  `fuel` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cars`
--

INSERT INTO `cars` (`id`, `title`, `image`, `type`, `rating`, `price`, `transmission`, `seats`, `fuel`) VALUES
(1, 'Hyundai Exter', 'exter.png', 'SUV', '4.5', '5000', 'automatic', '7', 'petrol'),
(2, 'MG Hector', 'hector.png', 'luxury', '4', '4500', 'manual', '5', 'diesel'),
(7, 'Toyota Urban Cruiser', 'urban-cruiser.png', 'Luxury', '4.9', '4500', 'automatic', '9', 'petrol'),
(8, 'XUV 360', 'xuv-3xo.png', 'SUV', '4.8', '4700', 'automatic', '5', 'petrol'),
(9, 'Mahindra Thar', 'thar.png', 'Jeep', '4.5', '4000', 'manual', '4', 'diesel'),
(10, 'Maruti Suzuki Swift', 'swift.png', 'Supermini', '4', '2500', 'manual', '5', 'petrol');

-- --------------------------------------------------------

--
-- Table structure for table `reservations`
--

CREATE TABLE `reservations` (
  `id` int(255) NOT NULL,
  `car_id` int(255) NOT NULL,
  `user_id` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `pickup` varchar(255) NOT NULL,
  `dropoff` varchar(255) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `preferences` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reservations`
--

INSERT INTO `reservations` (`id`, `car_id`, `user_id`, `name`, `email`, `phone`, `pickup`, `dropoff`, `start_date`, `end_date`, `preferences`) VALUES
(1, 1, 2, 'Rahul', 'rahul@gmail.com', '7318739001', '324 Maple Street, Springfield, IL 627324 Maple Street, Springfield, IL 62704', '57 Elmwood Avenue, New York, NY 10021', '2024-06-18', '2024-06-24', 'none'),
(14, 1, 2, 'Rahul', 'rahul@gmail.com', '7318739001', '980 Pine Drive, Atlanta, GA 30318', '213 Oak Lane, San Francisco, CA 94109', '0000-00-00', '2024-07-12', 'none'),
(15, 2, 1, 'Aman', 'aman@gmail.com', '7318739001', '1452 Cedar Boulevard, Miami, FL 33132', '768 Birch Road, Dallas, TX 75201', '2024-08-12', '2024-08-19', 'none'),
(16, 1, 1, 'Aman', 'aman@gmail.com', '7318739001', '303 Willow Way, Seattle, WA 98101', '611 Poplar Street, Boston, MA 02115', '2024-08-13', '2024-08-20', 'none'),
(17, 8, 1, 'Aman', 'aman@gmail.com', '07318739001', '1203 Sycamore Court, Denver, CO 80204', '890 Chestnut Drive, Chicago, IL 60657', '2024-06-23', '2024-06-30', 'none');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `admin`) VALUES
(1, 'Aman', 'aman@gmail.com', '$2b$10$kOA88EVj9rADDrYmhNdY9e8T6.m32HYPhoF1/k.Z/E2/riaxANQwm', 1),
(2, 'Rahul', 'rahul@gmail.com', '$2b$10$1gQ6HDU5hKEn2CoUWnlHZ.w.r6YfjsiSy0uRxG/bCFyYC6THkel.K', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `car_id` (`car_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cars`
--
ALTER TABLE `cars`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `reservations`
--
ALTER TABLE `reservations`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `reservations_ibfk_2` FOREIGN KEY (`car_id`) REFERENCES `cars` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
