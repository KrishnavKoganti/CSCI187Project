-- MySQL dump 10.13  Distrib 8.1.0, for macos13 (x86_64)
--
-- Host: localhost    Database: weekendwizdb
-- ------------------------------------------------------
-- Server version	8.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `calendarinfo`
--

DROP TABLE IF EXISTS `calendarinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `calendarinfo` (
  `calendarid` int DEFAULT NULL,
  `calendartitle` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `calendarinfo`
--

LOCK TABLES `calendarinfo` WRITE;
/*!40000 ALTER TABLE `calendarinfo` DISABLE KEYS */;
/*!40000 ALTER TABLE `calendarinfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eventinfo`
--

DROP TABLE IF EXISTS `eventinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eventinfo` (
  `eventname` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `budget` double DEFAULT NULL,
  `calendarid` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventinfo`
--

LOCK TABLES `eventinfo` WRITE;
/*!40000 ALTER TABLE `eventinfo` DISABLE KEYS */;
/*!40000 ALTER TABLE `eventinfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friendinfo`
--

DROP TABLE IF EXISTS `friendinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friendinfo` (
  `userid` int DEFAULT NULL,
  `friendid` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friendinfo`
--

LOCK TABLES `friendinfo` WRITE;
/*!40000 ALTER TABLE `friendinfo` DISABLE KEYS */;
/*!40000 ALTER TABLE `friendinfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logininfo`
--

DROP TABLE IF EXISTS `logininfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `logininfo` (
  `userid` int DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logininfo`
--

LOCK TABLES `logininfo` WRITE;
/*!40000 ALTER TABLE `logininfo` DISABLE KEYS */;
/*!40000 ALTER TABLE `logininfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modifypermission`
--

DROP TABLE IF EXISTS `modifypermission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modifypermission` (
  `eventname` varchar(255) DEFAULT NULL,
  `accesstype` varchar(255) DEFAULT NULL,
  `friendid` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modifypermission`
--

LOCK TABLES `modifypermission` WRITE;
/*!40000 ALTER TABLE `modifypermission` DISABLE KEYS */;
/*!40000 ALTER TABLE `modifypermission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `participantinfo`
--

DROP TABLE IF EXISTS `participantinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `participantinfo` (
  `eventname` varchar(255) DEFAULT NULL,
  `partcipantionid` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `participantinfo`
--

LOCK TABLES `participantinfo` WRITE;
/*!40000 ALTER TABLE `participantinfo` DISABLE KEYS */;
/*!40000 ALTER TABLE `participantinfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `taskinfo`
--

DROP TABLE IF EXISTS `taskinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `taskinfo` (
  `taskname` varchar(255) DEFAULT NULL,
  `taskdescription` varchar(255) DEFAULT NULL,
  `duetime` datetime DEFAULT NULL,
  `calendarid` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taskinfo`
--

LOCK TABLES `taskinfo` WRITE;
/*!40000 ALTER TABLE `taskinfo` DISABLE KEYS */;
/*!40000 ALTER TABLE `taskinfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userinfo`
--

DROP TABLE IF EXISTS `userinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userinfo` (
  `userid` int DEFAULT NULL,
  `calendarid` int DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userinfo`
--

LOCK TABLES `userinfo` WRITE;
/*!40000 ALTER TABLE `userinfo` DISABLE KEYS */;
/*!40000 ALTER TABLE `userinfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `viewpermission`
--

DROP TABLE IF EXISTS `viewpermission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `viewpermission` (
  `calendarid` int DEFAULT NULL,
  `accesstype` varchar(255) DEFAULT NULL,
  `friendid` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `viewpermission`
--

LOCK TABLES `viewpermission` WRITE;
/*!40000 ALTER TABLE `viewpermission` DISABLE KEYS */;
/*!40000 ALTER TABLE `viewpermission` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-26 22:54:08
