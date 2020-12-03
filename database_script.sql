-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: wdl
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `gym_candidate`
--

DROP TABLE IF EXISTS `gym_candidate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gym_candidate` (
  `name` varchar(45) NOT NULL,
  `gym_ID` int NOT NULL AUTO_INCREMENT,
  `pswd` varchar(45) NOT NULL,
  `l_name` varchar(45) NOT NULL,
  `gender` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `number` bigint NOT NULL,
  `plans` varchar(50) DEFAULT NULL,
  `totalPayment` int DEFAULT NULL,
  `payment_done` varchar(10) NOT NULL,
  PRIMARY KEY (`gym_ID`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gym_candidate`
--

LOCK TABLES `gym_candidate` WRITE;
/*!40000 ALTER TABLE `gym_candidate` DISABLE KEYS */;
INSERT INTO `gym_candidate` VALUES ('Anandteertha',1,'U2FsdGVkX19w9gtgyzjBFRWLeSz/jynepgNO+wTBoSk=','Rao','Male','anandteertha.ramesh18@siesgst.ac.in',9769298928,'online,offline,trainer',1902500,'true');
/*!40000 ALTER TABLE `gym_candidate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tt`
--

DROP TABLE IF EXISTS `tt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tt` (
  `Trainer` varchar(20) NOT NULL,
  `location` varchar(45) NOT NULL,
  `time` varchar(45) DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(45) DEFAULT 'null',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tt`
--

LOCK TABLES `tt` WRITE;
/*!40000 ALTER TABLE `tt` DISABLE KEYS */;
INSERT INTO `tt` VALUES ('Anandteertha Rao','Airoli','9:16',1,'null'),('Atharva Vaidya','Airoli','15:20',2,'null');
/*!40000 ALTER TABLE `tt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'wdl'
--

--
-- Dumping routines for database 'wdl'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-03 18:15:47
