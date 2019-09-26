DROP DATABASE IF EXISTS `cy_cinemas`;
CREATE DATABASE `cy_cinemas` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 選擇資料庫
USE `cy_cinemas`;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

-- 最新消息
DROP TABLE IF EXISTS `news`;
CREATE TABLE `news` (
    `news_id` INT AUTO_INCREMENT NOT NUll,
    `news_title` VARCHAR(50) NOT NUll,
    `news_content` TEXT NOT NUll,
    `news_imgurl` VARCHAR(50) NOT NUll,
    `news_date` TIMESTAMP NOT NUll,
    PRIMARY KEY (`news_id`)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 會員
DROP TABLE IF EXISTS `members`;
CREATE TABLE `members` (
    `members_id` INT AUTO_INCREMENT NOT NUll,
    `members_name` VARCHAR(50) NOT NUll,
    `members_account` VARCHAR(20) NOT NUll,
    `members_password` VARCHAR(20) NOT NUll,
    `members_email` VARCHAR(50) NOT NUll,
    `members_phone` VARCHAR(10) NOT NUll,
    `members_wallet` INT DEFAULT 0,
    `members_point`  INT DEFAULT 0,
    PRIMARY KEY (`members_id`),
    UNIQUE KEY (`members_account`)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 餐點
DROP TABLE IF EXISTS `food_drinks`;
CREATE TABLE `food_drinks` (
    `food_drinks_id` INT AUTO_INCREMENT NOT NUll,
    `food_drinks_name` VARCHAR(20) NOT NULL,
    `food_drinks_size` VARCHAR(5) NOT NULL,
    `food_drinks_price` INT NOT NULL,
    PRIMARY KEY (`food_drinks_id`)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 正在上映的電影
DROP TABLE IF EXISTS `movies`;
CREATE TABLE `movies`
(
  `movies_id` INT AUTO_INCREMENT NOT NUll,
  `movies_encoded_id` VARCHAR(50),
  `movies_name` VARCHAR(20),
  `movies_enname` VARCHAR(30),
  `movies_rating` VARCHAR(20),
  `movies_run_time` VARCHAR(10),
  `movies_info` TEXT,
  `movies_actor` VARCHAR(20),
  `movies_genre` VARCHAR(10),
  `movies_play_date` VARCHAR(20),
  `movies_poster` TEXT,
  `movies_trailer` TEXT,
  PRIMARY KEY (`movies_id`),
  UNIQUE KEY (`movies_encoded_id`)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 即將上映電影
DROP TABLE IF EXISTS `coming_movies`;
CREATE TABLE `coming_movies`
(
  `coming_movies_id` INT AUTO_INCREMENT NOT NUll,
  `coming_movies_encoded_id` VARCHAR(50),
  `coming_movies_name` VARCHAR(20),
  `coming_movies_enname` VARCHAR(30),
  `coming_movies_info` TEXT,
  `coming_movies_actor` VARCHAR(20),
  `coming_movies_genre` VARCHAR(10),
  `coming_movies_play_date` VARCHAR(20),
  `coming_movies_poster` TEXT,
  `coming_movies_trailer` TEXT,
  PRIMARY KEY (`coming_movies_id`),
  UNIQUE KEY (`coming_movies_encoded_id`)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 影城資訊
DROP TABLE IF EXISTS `theaters`;
CREATE TABLE `theaters`
(
 `theaters_id` INT AUTO_INCREMENT NOT NULL,
 `theaters_name` VARCHAR(20),
 `theaters_address` VARCHAR(30),
 `theaters_phone` VARCHAR(20),
 `theaters_imgurl` TEXT,
 PRIMARY KEY (`theaters_id`)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 電影時刻
DROP TABLE IF EXISTS `movie_time`;
CREATE TABLE `movie_time`
(
  `movie_time_id` INT AUTO_INCREMENT NOT NULL,
  `movies_encoded_id` VARCHAR(50),
  `theaters_name` VARCHAR(20),
  `movie_time_seat_tag` VARCHAR(20),
  `movie_time_time` VARCHAR(10),
  `movie_time_seat_info` VARCHAR(10),
  PRIMARY KEY (`movie_time_id`),
  FOREIGN KEY(`movies_encoded_id`) REFERENCES `movies`(`movies_encoded_id`)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 電影日期
DROP TABLE IF EXISTS `movie_day`;
CREATE TABLE `movie_day`
(
  `movie_day_id` INT AUTO_INCREMENT NOT NULL,
  `movies_encoded_id` VARCHAR(50),
  `movie_day_weekday` VARCHAR(20),
  `movie_day_date` DATE,
  PRIMARY KEY (`movie_day_id`),
  FOREIGN KEY(`movies_encoded_id`) REFERENCES `movies`(`movies_encoded_id`)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 廳
DROP TABLE IF EXISTS `courts`;
CREATE TABLE `courts`
(
  `courts_id` INT AUTO_INCREMENT NOT NULL,
  `courts_seats` VARCHAR(50),
  `courts_name` varchar(10),
  PRIMARY KEY (`courts_id`)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 放映場次
DROP TABLE IF EXISTS `screenings`;
CREATE TABLE `screenings`
(
  `screenings_id` INT AUTO_INCREMENT NOT NULL,
  `movies_encoded_id` VARCHAR(50),
  `movie_time_time` VARCHAR(20),
  `movie_day_date` DATE,
  `courts_id` INT,
  PRIMARY KEY (`screenings_id`),
  FOREIGN KEY(`movies_encoded_id`) REFERENCES `movies`(`movies_encoded_id`),
  FOREIGN KEY(`courts_id`) REFERENCES `courts`(`courts_id`)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 票種
DROP TABLE IF EXISTS `tickets`;
CREATE TABLE `tickets`
(
  `tickets_id` INT AUTO_INCREMENT NOT NULL,
  `tickets_name` VARCHAR(50),
  `tickets_price` INT,
  PRIMARY KEY (`tickets_id`)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 訂單
DROP TABLE IF EXISTS `order_details`;
CREATE TABLE `order_details`
(
  `order_details_id` INT AUTO_INCREMENT NOT NULL,
  `screenings_id` INT,
  `members_id` INT,
  `order_details_num` INT,
  `order_details_seat` VARCHAR(50),
  `order_details_total_price` INT,
  `order_details_discounted_price` INT,
  `order_details_tickets_num` VARCHAR(30),
  `order_details_food_drinks_num` VARCHAR(30),
  `order_details_datetime`  TIMESTAMP,
  PRIMARY KEY (`order_details_id`),
  FOREIGN KEY(`screenings_id`) REFERENCES `screenings`(`screenings_id`),
  FOREIGN KEY(`members_id`) REFERENCES `members`(`members_id`)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;