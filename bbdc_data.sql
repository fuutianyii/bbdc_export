-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- 主机： localhost
-- 生成日期： 2023-09-23 20:48:01
-- 服务器版本： 8.0.33-0ubuntu0.23.04.2
-- PHP 版本： 8.1.12-1ubuntu4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `omelette`
--

-- --------------------------------------------------------

--
-- 表的结构 `bbdc_data`
--

CREATE TABLE `bbdc_data` (
  `word_id` int NOT NULL,
  `derivative` varchar(500) NOT NULL,
  `options` varchar(500) NOT NULL,
  `roots_affixes` varchar(1000) NOT NULL,
  `phrase` varchar(500) NOT NULL,
  `sentence_en` varchar(1000) NOT NULL,
  `sentence_ch` varchar(1000) NOT NULL,
  `type` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 转储表的索引
--

--
-- 表的索引 `bbdc_data`
--
ALTER TABLE `bbdc_data`
  ADD UNIQUE KEY `word_id` (`word_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
