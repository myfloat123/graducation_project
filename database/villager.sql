-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: village
-- ------------------------------------------------------
-- Server version	8.0.19

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
-- Table structure for table `apis`
--

DROP TABLE IF EXISTS `apis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apis` (
  `id` int NOT NULL AUTO_INCREMENT,
  `jwtUnless` tinyint(1) DEFAULT NULL COMMENT '是否需要token',
  `type` int NOT NULL COMMENT 'api类型：1101为目录和菜单 1102为api接口',
  `parentId` int NOT NULL COMMENT '父目录id',
  `url` varchar(255) DEFAULT NULL COMMENT 'api路径',
  `name` varchar(255) NOT NULL COMMENT 'api名称',
  `method` varchar(255) DEFAULT NULL COMMENT '请求方法',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apis`
--

LOCK TABLES `apis` WRITE;
/*!40000 ALTER TABLE `apis` DISABLE KEYS */;
/*!40000 ALTER TABLE `apis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assistinfos`
--

DROP TABLE IF EXISTS `assistinfos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assistinfos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `assist_code` varchar(255) NOT NULL COMMENT '帮扶编号',
  `recipient` varchar(255) NOT NULL COMMENT '受助户主',
  `assist_content` text NOT NULL COMMENT '帮扶内容',
  `executive_condition` tinyint(1) NOT NULL DEFAULT '0' COMMENT '执行情况，0：未执行，1：已执行',
  `assistinfo_status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '帮扶信息状态，0：未删除，1：已删除',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assistinfos`
--

LOCK TABLES `assistinfos` WRITE;
/*!40000 ALTER TABLE `assistinfos` DISABLE KEYS */;
INSERT INTO `assistinfos` VALUES (1,'BF2947','张一','经济补助',1,0,'2023-05-05 16:24:22','2023-05-05 16:24:47'),(2,'BF1135','张二','经济补助',1,1,'2023-05-05 16:38:41','2023-05-06 01:21:49'),(3,'BF7661','张三2','经济补助',1,1,'2023-05-05 17:14:33','2023-05-06 01:10:03'),(4,'BF1928','张四','经济困难补助',1,1,'2023-05-06 01:05:54','2023-05-06 01:07:29'),(5,'BF5033','张五1','经济补助1',0,1,'2023-05-06 01:07:04','2023-05-06 01:07:29'),(6,'BF3903','张六','经济补助',0,1,'2023-05-06 01:09:53','2023-05-06 01:10:03'),(7,'BF5523','张六','经济补助',0,1,'2023-05-06 01:21:44','2023-05-06 01:21:49'),(8,'BF2974','张二','经济困难补助',1,0,'2023-05-13 15:08:05','2023-05-13 15:08:50'),(9,'BF8652','张三','住房补贴',0,0,'2023-05-13 15:09:32','2023-05-13 15:09:32');
/*!40000 ALTER TABLE `assistinfos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assistplans`
--

DROP TABLE IF EXISTS `assistplans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assistplans` (
  `id` int NOT NULL AUTO_INCREMENT,
  `assist_code` varchar(255) NOT NULL COMMENT '帮扶编号',
  `assist_demand` text NOT NULL COMMENT '帮扶需求',
  `assist_type` int NOT NULL DEFAULT '0' COMMENT '0：经济扶贫，1：教育扶贫，2：医疗扶贫，3：住房扶贫，4：精准扶贫，5：社会扶贫，6：就业扶贫，7：产业扶贫，8：其他',
  `accountability_unit` varchar(255) NOT NULL COMMENT '责任单位',
  `principal` varchar(255) NOT NULL COMMENT '责任人',
  `assistplan_status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '帮扶计划状态，0：未删除，1：已删除',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assistplans`
--

LOCK TABLES `assistplans` WRITE;
/*!40000 ALTER TABLE `assistplans` DISABLE KEYS */;
INSERT INTO `assistplans` VALUES (1,'BF2947','一周内提供自己补助',0,'河头村委会','陈一',0,'2023-05-05 16:24:47','2023-05-05 16:24:47'),(2,'BF1135','一周内提供资金',0,'何为村委会','陈二',1,'2023-05-05 16:39:09','2023-05-06 01:40:28'),(3,'BF7661','一周内提供经济资助100011元',0,'河东村委会','何三',0,'2023-05-05 17:15:18','2023-05-05 17:18:53'),(4,'BF1928','一周内提供经济困难补助',4,'何南村委会','何四',0,'2023-05-06 01:06:28','2023-05-06 01:06:49'),(5,'BF2974','一周内提供经济补助',0,'江西村委会','江一',0,'2023-05-13 15:08:50','2023-05-13 15:08:50');
/*!40000 ALTER TABLE `assistplans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `files`
--

DROP TABLE IF EXISTS `files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `files` (
  `id` int NOT NULL AUTO_INCREMENT,
  `file_originalFilename` text COMMENT '文件原名',
  `file_basename` text COMMENT '文件名',
  `file_mimetype` text COMMENT '文件类型',
  `file_status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '文件状态，0：未删除，1：已删除',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `files`
--

LOCK TABLES `files` WRITE;
/*!40000 ALTER TABLE `files` DISABLE KEYS */;
INSERT INTO `files` VALUES (3,'调查问卷.docx','aa50281682199379237b03200.docx','application/vnd.openxmlformats-officedocument.wordprocessingml.document',0,'2023-04-24 11:31:29','2023-04-24 12:14:28'),(4,'小慕图书管理后台文档.txt','39db3a241e3adebca489ab200.txt','text/plain',0,'2023-04-24 12:11:45','2023-04-24 12:14:32'),(6,'txt1.txt','3e9adf4c0755f24f717f71501.txt','text/plain',0,'2023-04-24 13:35:45','2023-04-24 13:35:45'),(12,'关于老房翻建的通知.txt','171c6e46d3c2a893424fff105.txt','text/plain',0,'2023-04-25 16:54:52','2023-04-25 16:54:52'),(15,'农村产权流转交易规范化试点工作的要求.txt','ab770b4d436cb7e0770d0e902.txt','text/plain',0,'2023-04-26 16:09:37','2023-04-26 16:09:37'),(18,'环境卫生整治提升活动通知.txt','ab770b4d436cb7e0770d0e905.txt','text/plain',0,'2023-04-26 16:17:39','2023-04-26 16:17:39');
/*!40000 ALTER TABLE `files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `finances`
--

DROP TABLE IF EXISTS `finances`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `finances` (
  `id` int NOT NULL AUTO_INCREMENT,
  `finance_code` varchar(255) NOT NULL COMMENT '财务编号',
  `finance_type` int NOT NULL DEFAULT '1' COMMENT '财务类型，1：收入，2：支出',
  `finance_money` varchar(255) NOT NULL COMMENT '金额',
  `finance_money_unit` int NOT NULL DEFAULT '1' COMMENT '单位，1：万，2：十万，3：百万，4：千万，5：亿',
  `finance_explain` text COMMENT '说明',
  `finance_status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '财务状态，0：未删除，1：已删除',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `finance_code_UNIQUE` (`finance_code`)
) ENGINE=InnoDB AUTO_INCREMENT=114 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `finances`
--

LOCK TABLES `finances` WRITE;
/*!40000 ALTER TABLE `finances` DISABLE KEYS */;
INSERT INTO `finances` VALUES (2,'CW5232',2,'30000',1,'建小学教学楼',1,'2023-04-22 11:23:28','2023-05-09 07:57:55'),(3,'CW5298',1,'30000',2,'农产品销售海外收入',1,'2023-04-22 11:28:10','2023-05-09 07:57:55'),(28,'CW7608',2,'3000',1,'优质水稻苗进口',1,'2023-04-22 14:19:06','2023-05-09 07:57:55'),(31,'CW7079',1,'30',5,'自然灾害捐款',1,'2023-04-22 14:25:40','2023-05-09 07:57:55'),(32,'0002',1,'400000',1,'外部捐赠',1,'2023-04-24 11:04:53','2023-05-09 03:33:40'),(33,'CW1376',2,'3',5,'森林火灾救助',0,'2023-05-09 03:18:15','2023-05-09 03:18:15'),(34,'CW2139',2,'4',5,'抗震救灾',0,'2023-05-09 03:19:05','2023-05-09 03:19:05'),(35,'CW5976',1,'90',4,'抗震救灾捐赠',0,'2023-05-09 03:20:45','2023-05-09 03:20:45'),(36,'CW0749',1,'20',2,'个人捐赠',1,'2023-05-09 03:21:27','2023-05-09 03:33:40'),(43,'6',2,'20',5,'洪涝灾害救助支出',1,'2023-05-09 06:46:10','2023-05-09 07:57:44'),(44,'7',2,'20',3,'金融危机',1,'2023-05-09 06:49:02','2023-05-09 07:57:44'),(50,'5',1,'20',5,'抗震救灾捐赠',1,'2023-05-09 07:01:13','2023-05-09 07:57:44'),(58,'4',1,'10',5,'好心人士捐赠',1,'2023-05-09 07:28:51','2023-05-09 07:57:44'),(74,'8',2,'20',5,'金融危机',1,'2023-05-09 07:39:25','2023-05-09 07:57:44'),(75,'9',2,'20',5,'金融危机',1,'2023-05-09 07:39:52','2023-05-09 07:57:28'),(76,'10',2,'20',5,'金融危机',1,'2023-05-09 07:41:02','2023-05-09 07:57:28'),(77,'11',2,'20',5,'金融危机',1,'2023-05-09 07:42:21','2023-05-09 07:57:28'),(78,'12',2,'20',5,'金融危机',1,'2023-05-09 07:43:39','2023-05-09 07:57:28'),(79,'13',2,'20',5,'金融危机',1,'2023-05-09 07:44:29','2023-05-09 07:57:28'),(80,'14',2,'20',5,'金融危机',1,'2023-05-09 07:52:56','2023-05-09 07:57:28'),(81,'15',2,'20',5,'金融危机',1,'2023-05-09 07:53:31','2023-05-09 07:57:28'),(82,'16',2,'20',5,'金融危机',1,'2023-05-09 07:54:38','2023-05-09 07:57:28'),(83,'17',2,'20',5,'金融危机',1,'2023-05-09 07:55:54','2023-05-09 07:57:28'),(84,'18',2,'20',5,'金融危机',1,'2023-05-09 07:56:43','2023-05-09 07:57:28'),(87,'19',2,'20',5,'金融危机',0,'2023-05-09 07:59:22','2023-05-09 07:59:22'),(88,'20',2,'20',5,'金融危机',0,'2023-05-09 07:59:50','2023-05-09 07:59:50'),(89,'21',2,'20',5,'金融危机',0,'2023-05-09 08:00:54','2023-05-09 08:00:54'),(90,'22',2,'20',5,'金融危机',0,'2023-05-09 08:01:51','2023-05-09 08:01:51'),(95,'23',2,'20',5,'金融危机',0,'2023-05-09 08:02:54','2023-05-09 08:02:54'),(99,'24',2,'20',5,'金融危机',0,'2023-05-09 08:03:34','2023-05-09 08:03:34'),(100,'25',2,'20',5,'金融危机',0,'2023-05-09 08:04:00','2023-05-09 08:04:00'),(101,'26',2,'20',5,'金融危机',0,'2023-05-09 08:04:47','2023-05-09 08:04:47'),(102,'27',1,'20',5,'抗震救灾捐赠',0,'2023-05-09 08:05:07','2023-05-09 08:05:07'),(104,'28',2,'20',5,'金融危机',0,'2023-05-09 08:06:04','2023-05-09 08:06:04'),(105,'30',2,'20',5,'金融危机',0,'2023-05-09 08:06:38','2023-05-09 08:06:38'),(106,'31',2,'20',5,'金融危机',0,'2023-05-09 08:07:55','2023-05-09 08:07:55'),(108,'32',2,'20',5,'金融危机',0,'2023-05-09 08:10:25','2023-05-09 08:10:25'),(110,'33',2,'20',5,'金融危机',0,'2023-05-09 08:12:54','2023-05-09 08:12:54'),(111,'34',2,'10',5,'洪涝灾害救助',0,'2023-05-13 15:27:19','2023-05-13 15:27:19'),(112,'35',2,'10',5,'洪涝灾害救助',0,'2023-05-13 15:33:41','2023-05-13 15:33:41'),(113,'CW0532',1,'10',5,'外部捐赠',0,'2023-05-13 15:34:18','2023-05-13 15:34:18');
/*!40000 ALTER TABLE `finances` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `housebuilds`
--

DROP TABLE IF EXISTS `housebuilds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `housebuilds` (
  `id` int NOT NULL AUTO_INCREMENT,
  `housebuild_code` varchar(255) NOT NULL COMMENT '房屋建筑编号',
  `villager_name` varchar(255) NOT NULL COMMENT '村民姓名',
  `have_or_not_safety_danger` int NOT NULL COMMENT '有无安全隐患，1：有，2：无',
  `have_or_not_violate_build` int NOT NULL COMMENT '有无违规建筑，1：有，2：无',
  `housebuild_status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '房屋建筑状态，0：未删除，1：已删除',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `housebuilds`
--

LOCK TABLES `housebuilds` WRITE;
/*!40000 ALTER TABLE `housebuilds` DISABLE KEYS */;
INSERT INTO `housebuilds` VALUES (1,'0001','张四',1,1,1,'2023-04-20 09:54:50','2023-04-20 16:20:55'),(2,'0002','张三',1,1,1,'2023-04-20 10:20:38','2023-04-20 16:20:55'),(3,'FWJZ9693','张五',1,1,0,'2023-04-20 15:56:35','2023-04-20 16:20:13'),(4,'FWJZ3630','张六',2,1,0,'2023-04-20 15:57:21','2023-04-20 16:20:13'),(5,'FWJZ7354','张七',2,1,0,'2023-04-20 15:58:45','2023-04-20 16:15:37'),(6,'FWJZ8716','张八',1,1,0,'2023-04-20 15:59:05','2023-04-20 16:15:37'),(7,'FWJZ4269','张九',1,1,0,'2023-04-20 15:59:51','2023-04-20 16:03:41'),(8,'FWJZ9816','张十',1,2,0,'2023-04-20 16:22:18','2023-05-07 15:07:12'),(9,'FWJZ5386','张十一',1,1,0,'2023-05-07 15:09:55','2023-05-07 15:09:55'),(10,'FWJZ8834','张十二',1,1,0,'2023-05-07 15:12:55','2023-05-07 15:12:55'),(11,'FWJZ0503','张十三',1,1,0,'2023-05-07 15:13:09','2023-05-07 15:13:09'),(12,'FWJZ6774','张十四',2,2,0,'2023-05-07 15:13:57','2023-05-07 15:13:57'),(13,'FWJZ7825','张十五',2,2,1,'2023-05-07 15:14:15','2023-05-07 15:27:02'),(14,'FWJZ7796','张十六',1,1,1,'2023-05-07 15:19:46','2023-05-07 15:27:02'),(15,'FWJZ6109','张二',1,1,0,'2023-05-13 15:19:05','2023-05-13 15:19:05');
/*!40000 ALTER TABLE `housebuilds` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `households`
--

DROP TABLE IF EXISTS `households`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `households` (
  `id` int NOT NULL AUTO_INCREMENT,
  `household_number` varchar(255) NOT NULL COMMENT '户号',
  `household_name` varchar(255) NOT NULL COMMENT '户主姓名',
  `household_sex` varchar(255) NOT NULL COMMENT '性别',
  `household_ID` varchar(255) NOT NULL COMMENT '户主身份证号',
  `household_birthday` varchar(255) DEFAULT NULL COMMENT '户主出生日期',
  `household_phone` varchar(255) DEFAULT NULL COMMENT '户主联系方式',
  `is_poor_household` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否贫困家庭，0：否，1：是',
  `household_status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '每户的状态，0：未删除，1：已删除',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `households`
--

LOCK TABLES `households` WRITE;
/*!40000 ALTER TABLE `households` DISABLE KEYS */;
INSERT INTO `households` VALUES (1,'0001','赵十三','男','440923200011116845','2000-11-11','15788990645',1,0,'2023-04-20 17:36:06','2023-05-03 16:23:09'),(2,'HH3878','赵九','男','440923200001236854','2000-01-23','15265449874',1,0,'2023-04-21 03:00:25','2023-04-21 05:04:24'),(3,'HH8585','陈十','女','440923200001236850','2000-01-23','15276986553',1,0,'2023-04-21 03:14:24','2023-04-21 06:59:31'),(4,'HH4639','陈七','男','440923200001246580','2000-01-24','15240365441',1,0,'2023-04-21 03:29:25','2023-04-21 06:59:36'),(5,'HH0411','陈三','男','440923200001236485','2000-01-23','15217610113',1,0,'2023-04-21 03:52:49','2023-04-21 07:03:35'),(6,'HH8083','杨十','男','440923200001256850','2000-01-25','15217610445',0,0,'2023-04-21 03:54:37','2023-04-21 03:54:37'),(7,'HH2700','杨十一','男','440923200001236896','2000-01-23','15217610114',0,0,'2023-04-21 03:55:52','2023-05-05 05:45:09'),(8,'HH0439','何十七','男','440923200001236869','2000-01-23','15217610440',1,0,'2023-05-03 16:25:43','2023-05-08 04:00:14'),(9,'HH2910','何十八','女','440923200001226890','2000-01-22','15768990398',0,0,'2023-05-09 01:46:13','2023-05-14 09:15:14'),(10,'HH6390','何十九','男','440923200001226890','2000-01-22','15768990398',0,0,'2023-05-09 01:59:45','2023-05-09 01:59:45'),(11,'HH3532','何二十','女','440923200001226890','2000-01-22','15768990398',0,0,'2023-05-09 02:07:15','2023-05-09 02:07:15'),(12,'HH9244','王一','男','440923200001216859','2000-01-21','15698445632',0,0,'2023-05-13 14:45:03','2023-05-13 14:45:03');
/*!40000 ALTER TABLE `households` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hygienes`
--

DROP TABLE IF EXISTS `hygienes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hygienes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `hygiene_code` varchar(255) NOT NULL COMMENT '环境卫生编号',
  `hygiene_accendant` varchar(255) NOT NULL COMMENT '维护人员',
  `hygiene_trash_can_number` int NOT NULL DEFAULT '0' COMMENT '垃圾桶数量',
  `hygiene_trash_can_clean_situation` int DEFAULT '0' COMMENT '垃圾桶清理情况，0：无，1：待清理，2：已清理',
  `hygiene_toilet_number` int NOT NULL DEFAULT '0' COMMENT '厕所数量',
  `hygiene_toilet_clean_situation` int DEFAULT '0' COMMENT '厕所清洁情况，0：无，1：干净，2：较干净，3：很脏，4：无',
  `hygiene_remark` text COMMENT '备注',
  `hygiene_status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '环境卫生状态，0：未删除，1：已删除',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hygienes`
--

LOCK TABLES `hygienes` WRITE;
/*!40000 ALTER TABLE `hygienes` DISABLE KEYS */;
INSERT INTO `hygienes` VALUES (1,'HJWS7317','王一',0,0,0,0,'已维护完毕',0,'2023-04-23 06:40:12','2023-04-23 06:40:12'),(2,'HJWS1490','王二',1,1,1,3,'已清理完毕',0,'2023-04-23 06:41:47','2023-04-23 07:00:56'),(3,'HJWS3750','王三',1,1,0,0,'已维护完毕',0,'2023-04-23 07:02:24','2023-04-23 07:02:32'),(4,'HJWS4307','王四',1,2,1,1,'已维护完毕',0,'2023-04-23 07:03:12','2023-05-08 01:48:41'),(5,'HJWS3820','王四',1,1,0,0,'已维护完毕',1,'2023-04-23 07:06:05','2023-04-23 07:23:03'),(6,'HJWS5663','王五',0,0,0,0,'已维护完毕',1,'2023-04-23 07:06:52','2023-04-23 07:23:03'),(7,'HJWS3643','王七',1,1,0,0,'已维护完毕',1,'2023-04-23 07:08:22','2023-04-23 07:19:45'),(8,'HJWS9667','王八',1,1,1,3,'已维护完毕',1,'2023-04-23 07:11:05','2023-04-23 07:19:15'),(9,'HJWS2999','王五',1,1,1,1,'',1,'2023-05-08 01:20:19','2023-05-08 02:03:34'),(10,'HJWS5572','王六',1,2,1,1,'',1,'2023-05-08 01:23:25','2023-05-08 02:03:34'),(11,'HJWS5566','王七',1,1,1,1,'1111',0,'2023-05-08 01:25:25','2023-05-08 01:25:32');
/*!40000 ALTER TABLE `hygienes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `infrastructures`
--

DROP TABLE IF EXISTS `infrastructures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `infrastructures` (
  `id` int NOT NULL AUTO_INCREMENT,
  `infra_code` varchar(255) NOT NULL COMMENT '基础设施编号',
  `infra_name` varchar(255) NOT NULL COMMENT '基础设施名称',
  `infra_type` int NOT NULL DEFAULT '1' COMMENT '1：生产性基础设施，2：生活性基础设施，3：人文性基础设施，4：流通性基础设施',
  `location` varchar(255) NOT NULL COMMENT '位置',
  `construction_date` datetime DEFAULT NULL COMMENT '建设日期',
  `construction_unit` varchar(255) NOT NULL COMMENT '建设单位',
  `construction_capital` varchar(255) DEFAULT NULL COMMENT '建设资金',
  `use_condition` int DEFAULT '1' COMMENT '使用情况，1：正常，2：闲置，3：废弃',
  `operation_condition` int DEFAULT '1' COMMENT '运行状况，1：良好，2：已维修，3：待维修',
  `maintain_condition` int DEFAULT '1' COMMENT '维修情况，1：无需维修，2：已维修，3：待维修',
  `infra_status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '基础信息状态，0：未删除，1：已删除',
  `exist_issue` text COMMENT '存在问题',
  `improvement_measure` text COMMENT '改进措施',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `infrastructures`
--

LOCK TABLES `infrastructures` WRITE;
/*!40000 ALTER TABLE `infrastructures` DISABLE KEYS */;
INSERT INTO `infrastructures` VALUES (1,'0001','蚝头坡生蚝养殖基地',2,'蚝头村','2015-10-09 00:00:00','蚝头村委会','30亿',1,2,1,1,'有一点小问题','有空就解决','2023-04-07 15:37:04','2023-05-06 01:45:30'),(2,'0002','山后罗非鱼养殖基地',1,'山后村','2016-11-10 00:00:00','山后村委会','20亿',1,2,1,1,'运行状况一般','很快就处理','2023-04-07 15:47:44','2023-05-06 01:45:30'),(3,'JCSS6469','山前水电站',2,'山前村','2023-04-11 00:00:00','山前村委会','40亿',1,2,1,0,'一点小问题','很快解决','2023-04-12 16:00:24','2023-04-12 16:40:01'),(4,'JCSS2860','山前水电站',2,'山前村','2023-04-12 00:00:00','山前村委会','40亿',2,2,2,1,'一点小问题','很快解决','2023-04-12 16:13:40','2023-04-12 16:43:59'),(5,'JCSS9334','山前水电站',1,'山前村','2023-04-18 00:00:00','山前村委会','40亿',1,1,1,1,NULL,NULL,'2023-04-18 01:11:42','2023-05-06 06:09:44'),(6,'JCSS2473','山前水电站',1,'山前村','2023-04-18 00:00:00','山前村委会','40亿',1,1,1,1,NULL,NULL,'2023-04-18 01:12:54','2023-05-06 06:09:44'),(7,'JCSS7524','山前水电站',1,'山前村','2023-04-18 00:00:00','山前村委会','40亿',1,1,3,1,'一点小问题','很快解决','2023-04-18 01:13:40','2023-05-06 01:48:50'),(8,'JCSS7430','山前水电站',1,'山前村','2023-04-18 00:00:00','山前村委会','40亿',1,1,1,1,NULL,NULL,'2023-04-18 01:15:23','2023-05-06 01:48:50'),(9,'JCSS9474','山前水电站',1,'山前村','2023-04-18 00:00:00','山前村委会','40亿',1,1,1,1,NULL,NULL,'2023-04-18 01:16:46','2023-05-06 01:46:24'),(10,'JCSS9183','山前水电站',2,'山前村','2023-04-19 00:00:00','山前村委会','40亿',1,1,1,1,NULL,NULL,'2023-04-18 01:18:57','2023-05-06 01:46:24'),(11,'JCSS9862','山前水电站',1,'山前村','2023-04-18 00:00:00','山前村委会','40亿',1,1,1,1,NULL,NULL,'2023-04-18 01:20:07','2023-05-06 01:16:00'),(12,'JCSS3176','山前水电站',1,'山前村','2023-04-18 00:00:00','山前村委会','40亿',1,1,2,1,'一点小问题','很快解决','2023-04-18 01:22:13','2023-05-06 01:16:00'),(13,'JCSS5523','山前水电站',1,'山前村','2023-04-18 00:00:00','山前村委会','40亿',1,1,1,0,NULL,NULL,'2023-04-18 01:26:14','2023-04-18 01:26:14'),(14,'JCSS5533','山前水电站',1,'山前村','2023-04-20 00:00:00','山前村委会','40亿',2,1,1,0,'一点小问题','很快解决','2023-04-18 01:27:12','2023-04-18 01:27:12'),(15,'JCSS5954','山前水电站',1,'山前村','2023-04-10 00:00:00','山前村委会','40亿',1,2,1,0,'一点小问题','很快解决','2023-04-18 01:32:20','2023-04-18 01:32:20'),(16,'JCSS6532','山前水电站',1,'山前村','2023-04-19 00:00:00','山前村委会','40亿',1,1,1,0,NULL,NULL,'2023-04-18 01:33:31','2023-04-18 01:33:31'),(17,'JCSS8289','山前水电站',1,'山前村','2023-04-19 00:00:00','山前村委会','40亿',2,3,3,0,'一点小问题','很快解决','2023-04-18 01:34:20','2023-04-18 01:34:20'),(18,'JCSS7567','山前水电站',1,'山前村','2023-04-19 00:00:00','山前村委会','40亿',1,1,2,0,'一点小问题','已解决','2023-04-18 01:36:11','2023-04-18 01:36:11'),(19,'JCSS4944','山前水电站',1,'山前村','2023-04-19 00:00:00','山前村委会','40亿',1,2,1,1,'一点小问题','很快解决','2023-04-18 01:36:50','2023-04-18 02:22:46'),(20,'JCSS2237','山前水电站',1,'山前村','2023-04-19 00:00:00','山前村委会','40亿',2,2,1,1,'一点小问题','很快解决','2023-04-18 01:37:25','2023-04-18 01:37:46'),(21,'JCSS5122','山前水电站',1,'山前村','2023-04-19 00:00:00','山前村委会','40亿',1,1,1,1,NULL,NULL,'2023-04-18 01:41:35','2023-04-18 01:42:34'),(22,'JCSS9354','山前水电站',1,'山前村','2023-04-19 00:00:00','山前村委会','40亿',1,1,1,1,NULL,NULL,'2023-04-18 01:48:30','2023-04-18 01:49:00'),(23,'JCSS2390','山前水电站',1,'山前村','2023-04-19 00:00:00','山前村委会','40亿',1,1,1,1,NULL,NULL,'2023-04-18 01:49:39','2023-04-18 01:51:07'),(24,'JCSS1736','山前水电站',1,'山前村','2023-04-19 00:00:00','山前村委会','40亿',1,1,1,1,NULL,NULL,'2023-04-18 01:58:17','2023-04-18 02:01:23'),(25,'JCSS5740','山前水电站',1,'山前村','2023-04-19 00:00:00','山前村委会','40亿',2,1,1,1,'一点小问题','很快解决','2023-04-18 02:02:00','2023-04-18 02:04:49'),(26,'JCSS5838','山前水电站',1,'山前村','2023-04-19 00:00:00','山前村委会','40亿',2,2,1,1,'一点小问题','很快解决','2023-04-18 02:06:46','2023-04-18 02:07:18'),(27,'JCSS1006','山前水电站',1,'山前村','2023-04-19 00:00:00','山前村委会','40亿',1,1,1,1,NULL,NULL,'2023-04-18 02:08:07','2023-04-18 02:09:02'),(28,'JCSS5992','山前水电站',1,'山前村','2023-04-19 00:00:00','山前村委会','40亿',1,2,2,1,'一点小问题','很快解决','2023-04-18 02:09:42','2023-04-18 02:10:22'),(29,'JCSS5360','山前水电站',1,'山前村','2023-04-19 00:00:00','山前村委会','40亿',2,2,3,1,'一点小问题','很快解决','2023-04-18 02:11:03','2023-04-18 02:14:07'),(30,'JCSS9790','山前水电站',1,'山前村','2023-04-19 00:00:00','山前村委会','40亿',1,2,3,1,'一点小问题','很快解决','2023-04-18 02:15:04','2023-04-18 02:17:58'),(31,'JCSS9514','山前水电站',1,'山前村','2023-04-19 00:00:00','山前村委会','40亿',1,1,1,1,NULL,NULL,'2023-04-18 02:18:34','2023-04-18 02:20:48'),(32,'JCSS0216','山前水电站',1,'山前村','2023-04-19 00:00:00','山前村委会','40亿',1,1,1,1,NULL,NULL,'2023-04-18 02:21:16','2023-04-18 02:22:05'),(33,'JCSS8076','山前水电站',1,'山前村','2023-04-19 00:00:00','山前村委会','40亿',1,1,1,1,NULL,NULL,'2023-04-18 02:22:36','2023-04-18 02:22:43'),(34,'JCSS0344','山前水电站',1,'山前村','2023-04-19 00:00:00','山前村委会','40亿',1,1,1,0,NULL,NULL,'2023-04-18 02:23:16','2023-04-18 02:23:16'),(35,'JCSS1892','虎跳峡发电站1',2,'虎跳峡1','2023-05-06 00:00:00','虎跳峡村委会','13亿',1,1,1,0,'','','2023-05-03 16:54:07','2023-05-06 05:57:55');
/*!40000 ALTER TABLE `infrastructures` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lands`
--

DROP TABLE IF EXISTS `lands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lands` (
  `id` int NOT NULL AUTO_INCREMENT,
  `land_code` varchar(255) NOT NULL COMMENT '土地流转合同编号',
  `land_transfer_person` varchar(255) NOT NULL COMMENT '流转人',
  `land_receive_person` varchar(255) NOT NULL COMMENT '接收人',
  `land_sign_contract_date` datetime NOT NULL COMMENT '签约日期',
  `land_transfer_term` datetime NOT NULL COMMENT '截止日期',
  `land_transfer_type` int NOT NULL DEFAULT '1' COMMENT '流转类型，1：出租、2：转让、3：互换',
  `land_transfer_price` varchar(255) NOT NULL COMMENT '流转价格',
  `land_unit` int NOT NULL DEFAULT '1' COMMENT '单位，1：万/亩、2：万/公顷、3：万/顷',
  `land_use` text COMMENT '用途',
  `land_status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '土地流转状态，0：未删除，1：已删除',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lands`
--

LOCK TABLES `lands` WRITE;
/*!40000 ALTER TABLE `lands` DISABLE KEYS */;
INSERT INTO `lands` VALUES (1,'0001','蔡一','刘一','2023-05-23 00:00:00','2024-05-23 00:00:00',3,'20',1,'种植蔬菜',1,'2023-04-23 08:40:26','2023-04-26 16:25:18'),(2,'0002','刘二','蔡二','2023-04-17 00:00:00','2024-06-17 00:00:00',2,'10',3,'种植蔬菜',1,'2023-04-23 09:15:49','2023-04-26 16:25:18'),(3,'TDLZ2631','赵一','赵二','2023-04-24 00:00:00','2023-05-24 00:00:00',2,'20',1,'建设房子',0,'2023-04-24 05:54:36','2023-04-24 12:13:27'),(4,'TDLZ9012','赵三','赵四','2023-04-24 00:00:00','2023-04-25 00:00:00',1,'20',1,'出租给对方使用',0,'2023-04-24 06:34:00','2023-04-24 12:13:27'),(5,'TDLZ2676','郑二','郑三','2023-04-27 00:00:00','2023-05-27 00:00:00',3,'30',2,'种植农作物',0,'2023-04-26 16:23:36','2023-05-08 02:20:10'),(6,'TDLZ0721','王十','王九','2023-05-04 00:00:00','2023-06-30 00:00:00',2,'100',2,'建房子',0,'2023-05-03 17:20:16','2023-05-08 02:20:37');
/*!40000 ALTER TABLE `lands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menuapi`
--

DROP TABLE IF EXISTS `menuapi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menuapi` (
  `id` int NOT NULL AUTO_INCREMENT,
  `menuId` int DEFAULT NULL COMMENT '关联菜单',
  `apiId` int DEFAULT NULL COMMENT '关联api',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menuapi`
--

LOCK TABLES `menuapi` WRITE;
/*!40000 ALTER TABLE `menuapi` DISABLE KEYS */;
/*!40000 ALTER TABLE `menuapi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menus`
--

DROP TABLE IF EXISTS `menus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menus` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` int NOT NULL DEFAULT '1102' COMMENT '菜单类型：1101为目录 1102为菜单 1103为功能（按钮）',
  `label` varchar(255) NOT NULL COMMENT '目录/菜单/功能名称',
  `name` varchar(255) DEFAULT NULL COMMENT '前端标识(组件/路由名称)',
  `parentId` int NOT NULL DEFAULT '0' COMMENT '父目录id',
  `perm` varchar(255) DEFAULT NULL COMMENT '功能标识',
  `apiIds` varchar(255) DEFAULT NULL COMMENT 'apis，主要是方便前端回显',
  `icon` varchar(255) DEFAULT NULL COMMENT 'icon',
  `hidden` int NOT NULL COMMENT '是否隐藏 1101隐藏 1102显示',
  `sort` int NOT NULL DEFAULT '0' COMMENT '排序',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menus`
--

LOCK TABLES `menus` WRITE;
/*!40000 ALTER TABLE `menus` DISABLE KEYS */;
INSERT INTO `menus` VALUES (1,1101,'系统设置','system',0,NULL,NULL,NULL,1102,0,'2023-05-03 08:03:20','2023-05-03 08:03:20'),(2,1102,'菜单设置','menu',1,NULL,NULL,NULL,1102,0,'2023-05-03 08:38:19','2023-05-03 08:38:19');
/*!40000 ALTER TABLE `menus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `permission_name` varchar(255) NOT NULL COMMENT '权限名称，唯一',
  `permission_url` varchar(255) DEFAULT NULL COMMENT '路由',
  `permission_status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0：未删除，1：已删除',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `permission_name` (`permission_name`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (1,'添加',NULL,0,'2023-05-01 07:18:23','2023-05-01 07:18:23'),(7,'修改',NULL,0,'2023-05-01 08:37:20','2023-05-01 08:37:20'),(8,'村务财务状况管理','/finance',0,'2023-05-02 12:27:09','2023-05-02 12:27:09'),(9,'村民信息管理','/villagerinformation',0,'2023-05-02 12:28:01','2023-05-02 12:28:01'),(10,'资产管理','/assetinformation',0,'2023-05-02 12:28:34','2023-05-02 12:28:34'),(11,'日常经营信息','/dailybusiness',0,'2023-05-02 12:34:14','2023-05-02 12:34:14');
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `relations`
--

DROP TABLE IF EXISTS `relations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `relations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `household_number` varchar(255) NOT NULL COMMENT '户号',
  `name` varchar(255) DEFAULT NULL COMMENT '姓名',
  `relation` varchar(255) DEFAULT NULL COMMENT '关系',
  `relation_status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '户主关系状态，0：未删除，1：已删除',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=199 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `relations`
--

LOCK TABLES `relations` WRITE;
/*!40000 ALTER TABLE `relations` DISABLE KEYS */;
INSERT INTO `relations` VALUES (1,'0001','李四','夫妻',0,'2023-03-12 08:29:16','2023-04-01 10:01:20'),(2,'0002','张九','父女',0,'2023-03-12 08:30:32','2023-03-12 08:47:04'),(3,'0001','赵十','父子',0,'2023-03-12 09:10:14','2023-03-12 15:26:05'),(5,'0003','张二','父女',0,'2023-03-12 14:24:29','2023-03-12 14:24:29'),(102,'0004','王六','父子',0,'2023-04-01 07:55:08','2023-04-01 07:55:08'),(103,'0004','王七','父女',0,'2023-04-01 07:55:08','2023-04-01 10:01:58'),(104,'0004','王八','父子',0,'2023-04-01 07:58:31','2023-04-01 10:02:31'),(107,'0004','王九','父子',1,'2023-04-01 08:11:22','2023-04-01 08:34:05'),(109,'0004','王十一','父女',1,'2023-04-01 08:22:20','2023-04-01 08:34:40'),(110,'0004','王七','父女',1,'2023-04-01 08:43:51','2023-04-01 08:44:00'),(111,'0004','王七','父女',1,'2023-04-01 08:44:48','2023-04-01 10:00:59'),(112,'0004','王八','父子',1,'2023-04-01 08:47:30','2023-04-01 10:00:59'),(113,'0004','王九','父子',1,'2023-04-01 09:10:16','2023-04-01 09:50:47'),(114,'0004','王十','父子',1,'2023-04-01 09:10:16','2023-04-01 09:14:26'),(115,'0004','王十一','父女',1,'2023-04-01 09:10:34','2023-04-01 09:14:24'),(118,'0004','王十二','父子',1,'2023-04-01 09:11:49','2023-04-01 09:13:28'),(119,'0004','王十三','父子',1,'2023-04-01 09:11:49','2023-04-01 09:12:19'),(120,'0004','王十四','父子',1,'2023-04-01 09:12:01','2023-04-01 09:12:13'),(121,'0004','王十','父子',1,'2023-04-01 09:14:50','2023-04-01 09:16:50'),(122,'0004','王十一','父子',1,'2023-04-01 09:14:50','2023-04-01 09:15:01'),(123,'0004','王十','父子',1,'2023-04-01 09:18:03','2023-04-01 09:49:31'),(124,'0004','王十一','父子',1,'2023-04-01 09:18:03','2023-04-01 09:18:08'),(125,'0004','王十一','父子',1,'2023-04-01 09:21:11','2023-04-01 09:45:44'),(126,'0004','王十二','父子',1,'2023-04-01 09:21:11','2023-04-01 09:44:27'),(127,'0004','王二','父女',0,'2023-04-01 15:22:06','2023-04-01 15:22:06'),(130,'0005','李五','父子',0,'2023-04-01 15:37:02','2023-04-01 15:37:02'),(131,'0005','李六','父女',1,'2023-04-01 15:37:02','2023-04-01 15:58:48'),(132,'0005','李七','父女',1,'2023-04-01 15:40:18','2023-04-01 15:58:48'),(133,'0005','李六','父女',1,'2023-04-01 16:00:43','2023-04-01 16:17:35'),(134,'0005','李七','父子',1,'2023-04-01 16:09:29','2023-04-01 16:17:43'),(135,'0005','李六','父子',1,'2023-04-01 16:20:03','2023-04-01 16:25:27'),(136,'0005','李七','父女',1,'2023-04-01 16:20:03','2023-04-01 16:27:19'),(137,'0005','李八','父子',1,'2023-04-01 16:26:52','2023-04-01 16:27:19'),(138,'0005','李六','父子',1,'2023-04-01 16:27:43','2023-04-01 16:48:21'),(139,'0005','李七','父女',1,'2023-04-01 16:27:43','2023-04-01 16:29:21'),(140,'0005','李七','父女',1,'2023-04-01 16:29:32','2023-04-01 16:34:35'),(141,'0005','李七','父女',1,'2023-04-01 16:34:52','2023-04-01 16:48:21'),(142,'0005','李六','父女',1,'2023-04-01 16:48:50','2023-04-02 05:22:03'),(143,'0005','李七','父子',1,'2023-04-01 16:48:50','2023-04-01 16:49:12'),(144,'0005','李七','父子',1,'2023-04-01 16:50:53','2023-04-01 16:51:04'),(145,'0005','李七','父子',1,'2023-04-01 16:55:22','2023-04-02 05:22:03'),(146,'0005','李六','父子',1,'2023-04-02 05:22:56','2023-04-02 05:35:51'),(147,'0005','李七','父女',1,'2023-04-02 05:22:57','2023-04-02 05:35:51'),(148,'0005','李六','父子',1,'2023-04-02 05:36:27','2023-04-02 05:38:37'),(149,'0005','李七','父女',1,'2023-04-02 05:36:27','2023-04-02 05:38:37'),(150,'0005','李六','父子',1,'2023-04-02 05:39:20','2023-04-02 05:39:40'),(151,'0005','李七','父女',1,'2023-04-02 05:39:20','2023-04-02 05:39:40'),(152,'0005','李六','父子',1,'2023-04-02 05:53:49','2023-04-02 06:00:35'),(153,'0005','李七','父女',1,'2023-04-02 05:53:49','2023-04-02 06:00:35'),(154,'0005','李六','父子',1,'2023-04-02 06:01:29','2023-04-02 06:05:33'),(155,'0005','李七','父女',1,'2023-04-02 06:01:30','2023-04-02 06:05:33'),(156,'0005','李六','父子',1,'2023-04-02 06:06:26','2023-04-02 06:06:50'),(157,'0005','李七','父女',1,'2023-04-02 06:06:26','2023-04-02 06:06:50'),(158,'0005','李六','父子',1,'2023-04-02 06:07:29','2023-04-02 06:14:45'),(159,'0005','李七','父女',1,'2023-04-02 06:07:29','2023-04-02 06:14:45'),(160,'0005','李六','父子',1,'2023-04-02 06:15:29','2023-04-02 06:24:29'),(161,'0005','李七','父子',1,'2023-04-02 06:15:29','2023-04-02 06:24:29'),(162,'0005','李六','父子',1,'2023-04-02 06:26:04','2023-04-02 07:17:27'),(163,'0005','李七','父女',1,'2023-04-02 06:26:04','2023-04-02 07:17:27'),(164,'0005','李六','父子',0,'2023-04-02 07:19:00','2023-04-02 07:19:00'),(165,'0005','李七','父女',0,'2023-04-02 07:19:00','2023-04-02 07:19:00'),(166,'0005','李八','父女',1,'2023-04-02 07:19:23','2023-04-02 07:57:03'),(167,'0009','杨八','父子',0,'2023-04-02 08:38:18','2023-04-02 08:38:18'),(168,'0009','杨七','父女',0,'2023-04-02 08:38:18','2023-04-02 08:38:18'),(169,'0008','邵二','父子',0,'2023-04-02 08:49:26','2023-04-02 08:49:26'),(170,'HH7222','蔡二','父子',0,'2023-04-02 08:53:52','2023-04-02 08:53:52'),(171,'HH7222','蔡三','父女',0,'2023-04-02 08:53:52','2023-04-02 08:53:52'),(172,'HH8721','张四','夫妻',1,'2023-04-02 09:01:28','2023-04-02 09:02:06'),(173,'HH8721','张五','父女',1,'2023-04-02 09:01:28','2023-04-02 09:02:06'),(174,'HH8721','张六','父女',1,'2023-04-02 09:01:28','2023-04-02 09:02:00'),(175,'HH8721','张四','父子',0,'2023-04-02 09:07:02','2023-04-02 09:07:02'),(176,'HH8721','张五','父女',0,'2023-04-02 09:07:33','2023-04-02 09:07:33'),(177,'HH8916','李五','母子',0,'2023-04-02 10:38:35','2023-04-02 10:38:52'),(178,'HH3397','王六','母子',0,'2023-04-02 10:40:32','2023-04-02 10:40:32'),(179,'HH3397','王七','母女',0,'2023-04-02 10:40:32','2023-04-02 10:40:32'),(180,'HH3397','王八','母子',0,'2023-04-02 10:40:45','2023-04-02 10:40:45'),(181,'HH1833','赵七','夫妻',0,'2023-04-02 10:47:44','2023-04-02 10:47:44'),(182,'HH1833','赵八','母子',0,'2023-04-02 10:47:44','2023-04-02 10:47:44'),(183,'HH1833','赵九','母子',0,'2023-04-02 10:47:44','2023-04-02 10:48:15'),(184,'HH5784','张四','父子',0,'2023-04-05 08:59:18','2023-04-05 08:59:18'),(185,'HH3878','赵八','父子',0,'2023-04-21 03:00:25','2023-04-21 03:00:25'),(186,'HH8585','陈九','父子',0,'2023-04-21 03:14:24','2023-04-21 03:14:24'),(187,'HH4639','陈六','父子',0,'2023-04-21 03:29:25','2023-04-21 03:29:25'),(188,'HH4639','陈五','父子',0,'2023-04-21 03:29:25','2023-04-21 03:29:25'),(189,'HH4639','陈四','父子',0,'2023-04-21 03:29:25','2023-04-21 03:29:25'),(190,'HH0411','陈二','父子',0,'2023-04-21 03:52:50','2023-04-21 03:52:50'),(191,'HH2700','杨十二','父子',0,'2023-04-21 03:55:53','2023-05-05 05:45:09'),(192,'HH0439','何一','父女',0,'2023-05-04 12:48:51','2023-05-06 02:16:36'),(193,'HH0439','何三','父女',1,'2023-05-04 12:48:51','2023-05-05 03:16:21'),(194,'HH0439','何三','父子',1,'2023-05-05 03:16:34','2023-05-05 03:16:58'),(195,'HH0439','何三','父子',0,'2023-05-05 03:17:18','2023-05-06 02:16:36'),(196,'HH9244','王二','父女',1,'2023-05-13 14:45:04','2023-05-13 15:00:06'),(197,'HH9244','王三','父子',1,'2023-05-13 15:00:41','2023-05-13 15:05:23'),(198,'HH9244','王四','父子',1,'2023-05-13 15:06:38','2023-05-13 15:06:43');
/*!40000 ALTER TABLE `relations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resources`
--

DROP TABLE IF EXISTS `resources`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resources` (
  `id` int NOT NULL AUTO_INCREMENT,
  `resource_code` varchar(255) NOT NULL COMMENT '资源编号',
  `resource_name` varchar(255) NOT NULL COMMENT '资源名称',
  `resource_picture` text COMMENT '资源图片',
  `resource_kind` int DEFAULT '1' COMMENT '资源种类，1：矿产资源，2：水资源，3：森林资源，4：土地资源，5：生物资源，6：农业资源，7：其他资源',
  `resource_reserves` varchar(255) NOT NULL COMMENT '资源储量',
  `resource_reserves_unit` int DEFAULT '1' COMMENT '储量单位，1：吨，2：升，3：亩，4：只，5：个，6：平方千米',
  `resource_location` varchar(255) NOT NULL COMMENT '资源位置',
  `resource_use` text COMMENT '资源用途',
  `resource_status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '自然资源状态，0：未删除，1：已删除',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resources`
--

LOCK TABLES `resources` WRITE;
/*!40000 ALTER TABLE `resources` DISABLE KEYS */;
INSERT INTO `resources` VALUES (1,'ZRZY5695','桃林','9fe07979566f6f99f2a16be00.jpeg',3,'10',1,'世外桃源','生成寿桃',0,'2023-04-20 07:23:51','2023-04-29 09:57:10'),(2,'ZRZY9422','毛竹林','9fe07979566f6f99f2a16be01.jpg',3,'100',6,'竹仔村','生产竹席',0,'2023-04-20 07:34:22','2023-04-29 10:02:07'),(3,'ZRZY7489','铝矿石','9fe07979566f6f99f2a16be02.jpg',1,'30',1,'铝山','生产铝箔',0,'2023-04-20 07:38:08','2023-04-29 10:04:39'),(4,'ZRZY5694','冰冻湖水','9fe07979566f6f99f2a16be03.jpg',2,'2000000',2,'千灯湖','提供供应用水',0,'2023-04-20 07:38:59','2023-04-29 10:07:31'),(5,'ZRZY5471','银矿石','9fe07979566f6f99f2a16be04.jpg',1,'20',1,'银山','生产银器',0,'2023-04-20 08:22:27','2023-04-29 10:08:28'),(6,'ZRZY5377','钒矿石','9fe07979566f6f99f2a16be05.jpg',1,'10',1,'钒山','净水',0,'2023-04-20 08:23:51','2023-04-29 10:09:18'),(7,'ZRZY7816','荔枝树林','cc5f4d096b2b51255998e5a00.jpeg',3,'12',6,'河头村','生产荔枝木',0,'2023-05-03 17:16:08','2023-05-03 17:16:08'),(8,'ZRZY6099','松树林','f1343e79cbffb89fa987a6900.jpg',3,'12',3,'山后海边树林','制造松香',1,'2023-05-13 15:15:35','2023-05-13 15:17:42'),(9,'ZRZY1369','松树林','f1343e79cbffb89fa987a6901.jpg',3,'10',3,'香山岭','制造松香',1,'2023-05-13 15:16:51','2023-05-13 15:17:40'),(10,'ZRZY4311','松树林','f1343e79cbffb89fa987a6902.jpg',3,'10',3,'山后海边松树林','制造松香',0,'2023-05-13 15:18:20','2023-05-13 15:18:20');
/*!40000 ALTER TABLE `resources` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rolepermission`
--

DROP TABLE IF EXISTS `rolepermission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rolepermission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `roleId` int DEFAULT NULL,
  `permissionId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `roleId` (`roleId`),
  KEY `permissionId` (`permissionId`),
  CONSTRAINT `rolepermission_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`),
  CONSTRAINT `rolepermission_ibfk_2` FOREIGN KEY (`permissionId`) REFERENCES `permissions` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rolepermission`
--

LOCK TABLES `rolepermission` WRITE;
/*!40000 ALTER TABLE `rolepermission` DISABLE KEYS */;
INSERT INTO `rolepermission` VALUES (7,5,8,'2023-05-02 12:29:28','2023-05-02 12:29:28'),(8,5,9,'2023-05-02 12:29:28','2023-05-02 12:29:28'),(9,5,10,'2023-05-02 12:29:28','2023-05-02 12:29:28'),(10,7,11,'2023-05-02 12:34:45','2023-05-02 12:34:45');
/*!40000 ALTER TABLE `rolepermission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(255) NOT NULL COMMENT '角色名称，唯一',
  `role_remark` text COMMENT '备注',
  `role_status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0：未删除，1：已删除',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `role_name` (`role_name`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'管理员','admin',0,'2023-04-30 15:36:37','2023-04-30 16:14:29'),(5,'行政村领导','leader',0,'2023-05-01 05:59:35','2023-05-01 15:41:31'),(6,'办事员','officer',0,'2023-05-01 15:42:07','2023-05-01 15:42:07'),(7,'会计','accountant',0,'2023-05-01 15:42:13','2023-05-03 09:19:22');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userrole`
--

DROP TABLE IF EXISTS `userrole`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userrole` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `roleId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `roleId` (`roleId`),
  CONSTRAINT `userrole_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `userrole_ibfk_2` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userrole`
--

LOCK TABLES `userrole` WRITE;
/*!40000 ALTER TABLE `userrole` DISABLE KEYS */;
INSERT INTO `userrole` VALUES (2,5,5,'2023-05-01 12:51:48','2023-05-01 12:51:48'),(5,11,7,'2023-05-01 16:04:25','2023-05-01 16:04:25'),(6,9,6,'2023-05-01 16:04:30','2023-05-01 16:04:30'),(9,14,5,'2023-05-02 10:44:11','2023-05-02 10:44:11'),(10,15,6,'2023-05-02 10:45:13','2023-05-02 10:45:13'),(11,16,7,'2023-05-02 10:45:19','2023-05-02 10:45:19'),(13,16,5,'2023-05-02 10:45:33','2023-05-02 10:45:33'),(14,17,5,'2023-05-02 10:46:16','2023-05-02 10:46:16'),(15,18,7,'2023-05-03 12:56:49','2023-05-03 12:56:49'),(16,19,1,'2023-05-13 14:22:24','2023-05-13 14:22:24'),(17,20,5,'2023-05-13 14:23:01','2023-05-13 14:23:01'),(18,21,6,'2023-05-13 14:23:47','2023-05-13 14:23:47'),(19,22,7,'2023-05-13 14:25:08','2023-05-13 14:25:08');
/*!40000 ALTER TABLE `userrole` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) NOT NULL COMMENT '用户名，唯一',
  `password` char(64) NOT NULL COMMENT '密码',
  `avatar` varchar(255) DEFAULT NULL COMMENT '头像',
  `state` int NOT NULL DEFAULT '0' COMMENT '0：管理员，1：行政村领导，2：办事员，3：会计',
  `user_status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0：未删除，1：已删除',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `role_name` varchar(255) DEFAULT NULL COMMENT '角色名称',
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_name` (`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','$2a$10$sU8WHz8HxXw/aKIosjrp3eEQk3YhboSIyGoIrHSx2DnV0wk8HcIcW','D:\\毕业设计\\graduation_project\\village_koa_api\\src\\uploads\\f9d6baadd7b2c94e4f4eb6100.jpg',0,0,'2023-04-30 13:30:31','2023-05-09 16:10:22',NULL),(5,'leader','$2a$10$HJaspNUTp5FsbJl2YIUqsuG/0GtnMKOOVTO/Mqyd9bNEV4KNsFK36','a8910197c49c97cfa30261a00.gif',0,0,'2023-05-01 08:13:31','2023-05-01 15:42:49','行政村领导'),(9,'officer','$2a$10$6e2augAfb6ZkQZTa0nbdzOWa0uKgOaBDO4.8E3UPi9ZA.NWyfHzuO','8045ed1e44a23d7ad2cdd3700.gif',0,0,'2023-05-01 15:58:44','2023-05-01 16:04:30','办事员'),(11,'accountant','$2a$10$JjOx9iLXljKo4jKiMl9WDe8Orbs1YcoGKShkPkUZOYweNqRBGuOVu','828ae87a4274612035ce9ee00.png',0,0,'2023-05-01 16:03:38','2023-05-13 11:06:02','会计'),(14,'editor','$2a$10$.NZr3mLG4gPIyFlGcn5bQe5FBXMuiFjDF6NV9d6egrpa/pIqDSWxm','8045ed1e44a23d7ad2cdd3700.gif',0,0,'2023-05-01 16:51:35','2023-05-02 10:44:11','行政村领导'),(15,'editor1','$2a$10$3JmtKgBdZ5PORPa5s0jcwuUYnzGv3dbq5UF.pp2GlN8jkZfH9Dslm','8045ed1e44a23d7ad2cdd3700.gif',0,0,'2023-05-02 10:15:40','2023-05-02 10:45:13','办事员'),(16,'editor2','$2a$10$P6q16VsFfQ5uh.1mJj3.5On8orKfbdh2R5em6FspwbVrBVAKGExoy','8045ed1e44a23d7ad2cdd3700.gif',0,0,'2023-05-02 10:19:45','2023-05-02 10:45:33','行政村领导,会计'),(17,'editor3','$2a$10$wjNuujiMqxp8sqVaGREINu1Po28rz/LV8KyWWQsNi0Q/LfHcRZ26C','8045ed1e44a23d7ad2cdd3700.gif',0,0,'2023-05-02 10:38:07','2023-05-02 10:46:53','行政村领导'),(18,'editor4','$2a$10$nw3MfXEP2N1N5T6pSjY1Quk7tmMLxbrKmpJe2FsUAP115U9PhVxGW','8045ed1e44a23d7ad2cdd3700.gif',0,0,'2023-05-03 12:56:45','2023-05-09 09:58:19','会计'),(19,'editor5','$2a$10$YTSpie/QtFaNpQCoH.e9KugLlsc9gWLM5sg.UGZWn8SCKR02UOnOK','8045ed1e44a23d7ad2cdd3700.gif',0,0,'2023-05-13 14:22:16','2023-05-13 14:22:24','管理员'),(20,'editor6','$2a$10$s9VmPSq0RJU/ek01ngObzOHQGIDzyMv.xfmwX9fZaGwgGRdY03AQ.','8045ed1e44a23d7ad2cdd3700.gif',0,0,'2023-05-13 14:22:57','2023-05-13 14:23:01','行政村领导'),(21,'editor7','$2a$10$xs.3peqSJ1RjGkY1wmcjf.0Dnd2wI4JfsfcIsLlwJ6w/IAlxFGeEe','8045ed1e44a23d7ad2cdd3700.gif',0,0,'2023-05-13 14:23:42','2023-05-13 14:23:47','办事员'),(22,'editor8','$2a$10$5XJvf8Lnuhb8WTbJUgXEcO4Ou613cvPMqm1pTPo7Qul2n8TuvgsaC','8045ed1e44a23d7ad2cdd3700.gif',0,0,'2023-05-13 14:24:38','2023-05-13 14:25:08','会计');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `villagers`
--

DROP TABLE IF EXISTS `villagers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `villagers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `villager_name` varchar(255) NOT NULL COMMENT '姓名',
  `villager_age` int NOT NULL COMMENT '年龄',
  `villager_sex` varchar(255) NOT NULL COMMENT '性别',
  `villager_phone` varchar(255) NOT NULL COMMENT '手机号码',
  `villager_ID_number` varchar(255) NOT NULL COMMENT '身份证号',
  `villager_address` varchar(255) NOT NULL COMMENT '住址',
  `villager_birthday` varchar(255) NOT NULL COMMENT '出生日期',
  `villager_marriage` tinyint(1) NOT NULL COMMENT '婚姻情况',
  `villager_picture` varchar(255) DEFAULT NULL COMMENT '相片',
  `villager_email` varchar(255) DEFAULT NULL COMMENT '邮箱',
  `villager_status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '村民的状态，0：未删除，1：已删除',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `villagers`
--

LOCK TABLES `villagers` WRITE;
/*!40000 ALTER TABLE `villagers` DISABLE KEYS */;
INSERT INTO `villagers` VALUES (1,'xiaomei',20,'女','19806839790','440923200002256850','广州','2000-02-25',0,'8503e62bcdee96ccdff00af00.png','2458998156@qq.com',1,'2023-03-05 13:37:39','2023-04-29 12:43:01'),(2,'xiaomei',20,'女','15768990396','440923200102256850','广州市番禺区天安青华公寓1栋A座','2001-02-25',0,'31df159847922ea9003e13502.png','1@qq.com',1,'2023-03-05 13:39:57','2023-03-08 11:02:31'),(3,'xiaohong',18,'女','15768990398','440923200001226890','广州市番禺区','2000-01-22',0,'31df159847922ea9003e13503.gif',NULL,1,'2023-03-05 13:53:09','2023-04-29 13:01:32'),(4,'xiaohong',18,'女','15768990398','440923200001226890','广州市番禺区','2000-01-22',0,NULL,NULL,1,'2023-03-05 13:57:07','2023-04-29 12:55:32'),(5,'xiaohong',18,'女','15768990398','440923200001226890','广州市番禺区','2000-01-22',0,NULL,NULL,1,'2023-03-05 13:59:33','2023-03-08 11:02:42'),(6,'xiaohong',18,'女','15768990398','440923200001226890','广州市番禺区','2000-01-22',0,NULL,NULL,1,'2023-03-05 14:05:22','2023-03-08 11:02:44'),(7,'xiaohong',18,'女','15768990398','440923200001226890','广州市番禺区','2000-01-22',0,NULL,NULL,1,'2023-03-05 14:07:08','2023-03-08 11:02:46'),(8,'xiaohong',18,'女','15768990398','440923200001226890','广州市番禺区','2000-01-22',0,'3fdbb1a43acfff5bc58dea401.png',NULL,1,'2023-03-05 15:18:59','2023-04-29 13:01:32'),(9,'xiaohong',18,'女','15768990398','440923200001226890','广州市番禺区','2000-01-22',0,'3fdbb1a43acfff5bc58dea402.png',NULL,1,'2023-03-05 15:20:37','2023-03-09 13:17:19'),(10,'xiaohong',18,'女','15768990398','440923200001226890','广州市番禺区','2000-01-22',0,'1cccd089a6c93a108ee039700.png',NULL,1,'2023-03-05 15:22:54','2023-03-09 14:44:46'),(11,'xiaohong',18,'女','15768990398','440923200001226890','广州市番禺区','2000-01-22',0,'1cccd089a6c93a108ee039702.gif',NULL,1,'2023-03-05 15:26:09','2023-03-11 14:20:30'),(12,'xiaohong',18,'女','15768990398','440923200001226890','广州市番禺区','2000-01-22',0,'1cccd089a6c93a108ee039703.png',NULL,1,'2023-03-05 15:26:51','2023-03-09 14:44:46'),(13,'xiaochen',23,'男','15768990399','440923200001216855','广州市荔湾区纺织路24号','2000-01-21',0,'fb6125078fb12120955ba7500.png',NULL,1,'2023-03-07 05:47:44','2023-03-11 14:20:30'),(14,'xiaohong',18,'女','15768990398','440923200001226890','广州市番禺区','2000-01-22',0,'176c2b39d8dffc9fbaed84a03.png','1234567890@qq.com',1,'2023-03-09 14:53:12','2023-03-11 14:20:24'),(15,'xiaohong',18,'女','15768990398','440923200001226890','广州市番禺区','2000-01-22',0,'176c2b39d8dffc9fbaed84a04.png',NULL,1,'2023-03-09 14:57:14','2023-03-11 14:20:21'),(16,'xiaohong',18,'女','15768990398','440923200001226890','广州市番禺区','2000-01-22',0,'176c2b39d8dffc9fbaed84a05.png','0987654321@qq.com',1,'2023-03-09 16:06:13','2023-03-11 14:20:30'),(17,'xiaohong',18,'女','15768990398','440923200001226890','广州市番禺区','2000-01-22',0,'176c2b39d8dffc9fbaed84a06.png','2581473690@qq.com',1,'2023-03-09 16:07:42','2023-03-11 14:20:34'),(18,'xiaoming',23,'男','13578880380','440923200001216969','广州市番禺区东环街道番禺大道北554号','2000-02-21',0,NULL,NULL,1,'2023-03-11 14:22:01','2023-03-11 17:06:42'),(19,'xiaohong',22,'女','18756990393','440923200101256599','广州市荔湾区东沙街道24号','2001-01-25',1,NULL,'2458998556@qq.com',1,'2023-03-11 14:23:32','2023-03-11 17:06:42'),(20,'xiaochen',23,'男','13576660329','440923200001296850','广州市海珠区东沙路纺织街24号','2000-01-29',1,'1f272beadd6b35d6d1b5f9600.png',NULL,1,'2023-03-11 14:24:54','2023-03-11 17:07:40'),(21,'xiaoli',23,'女','15217610559','440923200001226897','广州市天河区棠下','2000-01-22',0,'1f272beadd6b35d6d1b5f9601.gif','2458770982@qq.com',1,'2023-03-11 14:26:19','2023-03-11 17:07:40'),(22,'xiaohong',23,'女','15768990393','440923200001216850','广州','2000-01-21',0,NULL,NULL,1,'2023-03-11 17:09:31','2023-03-11 17:20:22'),(23,'xiaohong',23,'女','13526660398','440923200001266582','广州市荔湾区纺织路东沙街24号','2000-01-26',0,'188cfe5ad3286fc502de00200.gif','2458996785@qq.com',0,'2023-03-12 06:52:10','2023-03-12 06:52:10'),(24,'小明',23,'男','13145789145','440923200001216877','广东番禺','2000-01-21',0,'4cfcbc2387c62a185fe69dd00.png','2767252511@qq.com',0,'2023-03-28 03:29:05','2023-04-24 06:54:18'),(25,'xiaohong',18,'女','15768990398','440923200001226890','广州市番禺区','2000-01-22',0,'a764af2595e55262521019400.png',NULL,0,'2023-03-31 07:56:49','2023-04-22 05:46:57'),(26,'xiaohong',18,'女','15768990398','440923200001226890','广州市番禺区','2000-01-22',0,NULL,NULL,0,'2023-03-31 07:57:28','2023-03-31 07:57:28'),(27,'xiaomei',20,'女','19806839790','440923200002256850','广州','2000-02-25',0,'8503e62bcdee96ccdff00af00.png','2458998156@qq.com',1,'2023-04-29 12:36:29','2023-04-29 12:55:37'),(28,'xiaodong',23,'男','13526669856','440923200001236854','广东广州','2000-01-23',0,'320fa35a15b48626d1a8cdd00.gif','123456@qq.com',1,'2023-04-29 17:21:39','2023-05-13 14:31:56'),(29,'小王',23,'女','15217869545','440923200001216853','广东广州','2000-01-21',1,'98cdd681004180317d399a501.png','123456@qq.com',0,'2023-05-03 15:25:35','2023-05-03 15:26:01'),(30,'小李',23,'2','13529996584','440923200001236845','广东广州','2000-01-23',0,'98cdd681004180317d399a502.jpg','123456@qq.com',0,'2023-05-03 15:28:38','2023-05-03 15:35:48'),(31,'小陈',23,'2','15317678990','440923200001236845','广东广州','2000-01-23',0,NULL,NULL,1,'2023-05-03 15:36:32','2023-05-03 15:55:24'),(32,'小杨',23,'2','13542226789','440923200001236875','广州广州','2000-01-23',1,NULL,NULL,1,'2023-05-03 15:40:57','2023-05-03 15:55:24'),(33,'小赵',23,'2','15278965445','440923200001253654','广东广州','2000-01-25',1,'8045ed1e44a23d7ad2cdd3700.gif','123456@qq.com',1,'2023-05-03 15:43:46','2023-05-03 15:54:45'),(34,'小赵',23,'女','15278965445','440923200001253654','广东广州','2000-01-25',1,'8045ed1e44a23d7ad2cdd3700.gif','123456@qq.com',1,'2023-05-03 15:52:23','2023-05-03 15:54:45'),(35,'小赵',23,'女','15278965445','440923200001253654','广东广州','2000-01-25',1,'2562ab1071734b269da6eb205.png','123456@qq.com',0,'2023-05-03 15:52:32','2023-05-03 15:54:17'),(36,'陈一',23,'1','13527774568','440923200001216853','广东广州','2000-01-21',0,'8045ed1e44a23d7ad2cdd3700.gif','123456@qq.com',0,'2023-05-09 01:19:52','2023-05-09 01:19:52'),(37,'陈二',23,'1','13523336541','440923200001216854','广东广州','2000-01-21',0,'8045ed1e44a23d7ad2cdd3700.gif','123456@qq.com',0,'2023-05-09 01:20:53','2023-05-09 01:20:53'),(38,'陈三',23,'1','13524445623','440923200001213654','广东广州','2000-01-21',0,'36a58c574e0c3cd4aa9538400.png','123456@qq.com',0,'2023-05-09 01:22:47','2023-05-09 01:22:47'),(39,'陈四',23,'1','15326445623','440923200001216854','广东广州','2000-01-21',0,'8045ed1e44a23d7ad2cdd3700.gif','123456@qq.com',0,'2023-05-09 01:23:34','2023-05-09 01:23:34'),(40,'xiaohong',23,'1','15768990398','440923200001226890','广州市番禺区','2000-01-22',1,'36a58c574e0c3cd4aa9538401.jpeg','123456@qq.com',0,'2023-05-09 01:35:43','2023-05-09 01:35:43'),(41,'xiaohong',23,'1','15768990398','440923200001226890','广东广州','2000-01-22',0,'8045ed1e44a23d7ad2cdd3700.gif','123456@qq.com',0,'2023-05-09 01:40:52','2023-05-09 01:40:52'),(42,'xiaohong',23,'2','15768990398','440923200001226890','广东广州','2000-01-22',1,'8045ed1e44a23d7ad2cdd3700.gif',NULL,0,'2023-05-09 01:43:32','2023-05-09 01:43:32'),(43,'xiaohong',18,'2','15768990398','440923200001226890','广州市番禺区','2000-01-22',0,'8045ed1e44a23d7ad2cdd3700.gif',NULL,0,'2023-05-09 01:45:13','2023-05-09 01:45:13'),(44,'小美',23,'女','13526669856','440923200002246850','广东广州','2000-02-24',0,'181bb922902255d26d355d900.png','123456@qq.com',0,'2023-05-13 11:07:55','2023-05-13 11:45:02'),(45,'小王',23,'男','13526664563','440923200001236854','广州市','2000-01-23',0,'8045ed1e44a23d7ad2cdd3700.gif','123456@qq.com',1,'2023-05-13 14:26:47','2023-05-13 14:31:33'),(46,'小蔡',23,'男','13528459631','440923200001256899','广州市','2000-01-25',0,'9344230efeeef4feb2e16b301.jpeg','123456@qq.com',0,'2023-05-13 14:39:03','2023-05-14 03:21:49'),(47,'小蔡蔡',23,'女','15768445632','440923200006216854','广州市','2000-06-21',0,'9344230efeeef4feb2e16b306.jpeg','',0,'2023-05-13 14:41:51','2023-05-14 03:35:25');
/*!40000 ALTER TABLE `villagers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-27 23:29:50
