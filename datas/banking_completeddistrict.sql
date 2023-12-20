-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: banking
-- ------------------------------------------------------
-- Server version	8.0.34

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
-- Table structure for table `completeddistrict`
--

DROP TABLE IF EXISTS `completeddistrict`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `completeddistrict` (
  `district_id` int NOT NULL,
  `city` text,
  `state_name` text,
  `state_abbrev` text,
  `region` text,
  `division` text,
  PRIMARY KEY (`district_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `completeddistrict`
--

LOCK TABLES `completeddistrict` WRITE;
/*!40000 ALTER TABLE `completeddistrict` DISABLE KEYS */;
INSERT INTO `completeddistrict` VALUES (1,'New York City','New York','NY','Northeast','Middle Atlantic'),(2,'Jacksonville','Florida','FL','South','South Atlantic'),(3,'Columbus','Ohio','OH','Midwest','East North Central'),(4,'Charlotte','North Carolina','NC','South','South Atlantic'),(5,'Indianapolis','Indiana','IN','Northeast','East North Central'),(6,'Seattle','Washington','WA','West','Pacific'),(7,'Denver','Colorado','CO','West','Mountain'),(8,'Washington','District of Columbia','DC','South','South Atlantic'),(9,'Boston','Massachusetts','MA','Northeast','New England'),(10,'Detroit','Michigan','MI','Midwest','East North Central'),(11,'Nashville','Tennessee','TN','South','East South Central'),(12,'Portland','Oregon','OR','West','Pacific'),(13,'Oklahoma City','Oklahoma','OK','South','West South Central'),(14,'Las Vegas','Nevada','NV','West','Mountain'),(15,'Louisville','Kentucky','KY','South','East South Central'),(16,'Baltimore','Maryland','MD','South','South Atlantic'),(17,'Milwaukee','Wisconsin','WI','Midwest','East North Central'),(18,'Albuquerque','New Mexico','NM','West','Mountain'),(19,'Atlanta','Georgia','GA','South','South Atlantic'),(20,'Kansas City','Missouri','MO','Midwest','West North Central'),(21,'Omaha','Nebraska','NE','Midwest','West North Central'),(22,'Virginia Beach','Virginia','VA','South','South Atlantic'),(23,'Minneapolis','Minnesota','MN','Midwest','West North Central'),(24,'New Orleans','Louisiana','LA','South','West South Central'),(25,'Wichita','Kansas','KS','Midwest','West North Central'),(26,'Honolulu','Hawaii','HI','West','Pacific'),(27,'San Antonio','Texas','TX','South','West South Central'),(28,'Anchorage','Alaska','AK','West','Pacific'),(29,'Newark','New Jersey','NJ','Northeast','Middle Atlantic'),(30,'Boise','Idaho','ID','West','Mountain'),(31,'Des Moines','Iowa','IA','Midwest','West North Central'),(32,'Birmingham','Alabama','AL','South','East South Central'),(33,'Salt Lake City','Utah','UT','West','Mountain'),(34,'Little Rock','Arkansas','AR','South','West South Central'),(35,'Sioux Falls','South Dakota','SD','Midwest','West North Central'),(36,'Providence','Rhode Island','RI','Northeast','New England'),(37,'Jackson','Mississippi','MS','South','East South Central'),(38,'Bridgeport','Connecticut','CT','Northeast','New England'),(39,'Charleston','South Carolina','SC','South','South Atlantic'),(40,'Fargo','North Dakota','ND','Midwest','West North Central'),(41,'Manchester','New Hampshire','NH','Northeast','New England'),(42,'Billings','Montana','MT','West','Mountain'),(43,'Wilmington','Delaware','DE','South','South Atlantic'),(44,'Portland','Maine','ME','Northeast','New England'),(45,'Cheyenne','Wyoming','WY','West','Mountain'),(46,'San Diego','California','CA','West','Pacific'),(47,'Charleston','West Virginia','WV','South','South Atlantic'),(48,'Worcester','Massachusetts','MA','Northeast','New England'),(49,'Burlington','Vermont','VT','Northeast','New England'),(50,'Buffalo','New York','NY','Northeast','Middle Atlantic'),(51,'Springfield','Massachusetts','MA','Northeast','New England'),(52,'New Haven','Connecticut','CT','Northeast','New England'),(53,'Hartford','Connecticut','CT','Northeast','New England'),(54,'Houston','Texas','TX','South','West South Central'),(55,'Lowell','Massachusetts','MA','Northeast','New England'),(56,'Cambridge','Massachusetts','MA','Northeast','New England'),(57,'New Bedford','Massachusetts','MA','Northeast','New England'),(58,'Brockton','Massachusetts','MA','Northeast','New England'),(59,'Quincy','Massachusetts','MA','Northeast','New England'),(60,'Lynn','Massachusetts','MA','Northeast','New England'),(61,'Fall River','Massachusetts','MA','Northeast','New England'),(62,'Nashua','New Hampshire','NH','Northeast','New England'),(63,'Norwalk','Connecticut','CT','Northeast','New England'),(64,'Phoenix','Arizona','AZ','West','Mountain'),(65,'Newton','Massachusetts','MA','Northeast','New England'),(66,'Warwick','Rhode Island','RI','Northeast','New England'),(67,'Danbury','Connecticut','CT','Northeast','New England'),(68,'Cranston','Rhode Island','RI','Northeast','New England'),(69,'Lawrence','Massachusetts','MA','Northeast','New England'),(70,'Los Angeles','California','CA','West','Pacific'),(71,'Somerville','Massachusetts','MA','Northeast','New England'),(72,'Philadelphia','Pennsylvania','PA','Northeast','Middle Atlantic'),(73,'New Britain','Connecticut','CT','Northeast','New England'),(74,'Chicago','Illinois','IL','Northeast','East North Central'),(75,'Rochester','New York','NY','Northeast','Middle Atlantic'),(76,'Yonkers','New York','NY','Northeast','Middle Atlantic'),(77,'Syracuse','New York','NY','Northeast','Middle Atlantic');
/*!40000 ALTER TABLE `completeddistrict` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-20 20:17:53
