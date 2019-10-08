-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 
-- 伺服器版本： 10.3.16-MariaDB
-- PHP 版本： 7.3.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `cy_cinemas`
--

-- --------------------------------------------------------

--
-- 資料表結構 `courts`
--

CREATE TABLE `courts` (
  `id` int(11) NOT NULL,
  `seats` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `courts`
--

INSERT INTO `courts` (`id`, `seats`, `name`) VALUES
(1, '80', '第五廳');

-- --------------------------------------------------------

--
-- 資料表結構 `members`
--

CREATE TABLE `members` (
  `id` int(11) NOT NULL,
  `name` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `account` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `wallet` tinyint(4) DEFAULT 0,
  `point` tinyint(4) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `members`
--

INSERT INTO `members` (`id`, `name`, `account`, `password`, `email`, `phone`, `wallet`, `point`) VALUES
(1, '劉品宏', 'e6320123', '1234', 'ben@gmail.com', '0953123456', 2, 5);

-- --------------------------------------------------------

--
-- 資料表結構 `order_details`
--

CREATE TABLE `order_details` (
  `id` int(11) NOT NULL,
  `screenings_id` int(11) DEFAULT NULL,
  `members_id` int(11) DEFAULT NULL,
  `num` int(11) DEFAULT NULL,
  `seat` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `total_price` int(11) DEFAULT NULL,
  `discounted_price` int(11) DEFAULT NULL,
  `tickets_num` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `food_drinks_num` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `datetime` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `order_details`
--

INSERT INTO `order_details` (`id`, `screenings_id`, `members_id`, `num`, `seat`, `total_price`, `discounted_price`, `tickets_num`, `food_drinks_num`, `phone`, `email`, `datetime`) VALUES
(1, 1, 1, 1, 'A5', 120, 80, '2', '3', '0953123456', 'ben@gmail.com', '2019-10-08 07:29:52');

-- --------------------------------------------------------

--
-- 資料表結構 `screenings`
--

CREATE TABLE `screenings` (
  `id` int(11) NOT NULL,
  `movies_encoded_id` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `movie_time_time` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `movie_day_date` date DEFAULT NULL,
  `courts_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `screenings`
--

INSERT INTO `screenings` (`id`, `movies_encoded_id`, `movie_time_time`, `movie_day_date`, `courts_id`) VALUES
(1, '{s:s}', '11:30', '2015-06-01', 1);

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `courts`
--
ALTER TABLE `courts`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `account` (`account`);

--
-- 資料表索引 `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `screenings_id` (`screenings_id`),
  ADD KEY `members_id` (`members_id`);

--
-- 資料表索引 `screenings`
--
ALTER TABLE `screenings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `courts_id` (`courts_id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `courts`
--
ALTER TABLE `courts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `members`
--
ALTER TABLE `members`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `order_details`
--
ALTER TABLE `order_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `screenings`
--
ALTER TABLE `screenings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`screenings_id`) REFERENCES `screenings` (`id`),
  ADD CONSTRAINT `order_details_ibfk_2` FOREIGN KEY (`members_id`) REFERENCES `members` (`id`);

--
-- 資料表的限制式 `screenings`
--
ALTER TABLE `screenings`
  ADD CONSTRAINT `screenings_ibfk_1` FOREIGN KEY (`courts_id`) REFERENCES `courts` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
