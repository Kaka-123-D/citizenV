-- MySQL version: 8.0.21
-- Host: localhost:3306

-- Author: Vũ Ngọc Quyền

-- Create database
CREATE DATABASE IF NOT EXISTS citizensV;
USE citizensV;

-- ---------------------------------------------------------------------
-- Table structure for table `sessions`
CREATE TABLE `sessions` (
  `sid` varchar(36) NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table structure for table `users`
CREATE TABLE `users` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `group` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `managerId` int DEFAULT NULL,
  PRIMARY KEY (`userId`),
  KEY `managerId` (`managerId`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`managerId`) REFERENCES `users` (`userId`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- Table structure for table `permissions`
CREATE TABLE `permissions` (
  `permissionId` int NOT NULL AUTO_INCREMENT,
  `isFinish` tinyint(1) NOT NULL,
  `isComplete` tinyint(1) NOT NULL,
  `timeStart` datetime DEFAULT NULL,
  `timeEnd` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`permissionId`),
  KEY `userId` (`userId`),
  CONSTRAINT `permissions_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table structure for table `persons`
CREATE TABLE `persons` (
  `stt` int NOT NULL AUTO_INCREMENT,
  `personId` varchar(255) DEFAULT NULL,
  `fullName` varchar(255) NOT NULL,
  `birthday` datetime NOT NULL,
  `sex` tinyint(1) NOT NULL,
  `village` varchar(255) NOT NULL,
  `thuongTru` varchar(255) NOT NULL,
  `tamTru` varchar(255) NOT NULL,
  `religion` varchar(255) NOT NULL,
  `educationLevel` varchar(255) NOT NULL,
  `job` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`stt`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Table structure for table `provinces`
CREATE TABLE `provinces` (
  `provinceId` varchar(255) NOT NULL,
  `provinceName` varchar(255) NOT NULL,
  `textDes` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`provinceId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Table structure for table `districts`
CREATE TABLE `districts` (
  `districtId` varchar(255) NOT NULL,
  `districtName` varchar(255) NOT NULL,
  `textDes` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `provinceId` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`districtId`),
  KEY `provinceId` (`provinceId`),
  CONSTRAINT `districts_ibfk_1` FOREIGN KEY (`provinceId`) REFERENCES `provinces` (`provinceId`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Table structure for table `wards`
CREATE TABLE `wards` (
  `wardId` varchar(255) NOT NULL,
  `wardName` varchar(255) NOT NULL,
  `textDes` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `districtId` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`wardId`),
  KEY `districtId` (`districtId`),
  CONSTRAINT `wards_ibfk_1` FOREIGN KEY (`districtId`) REFERENCES `districts` (`districtId`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Table structure for table `villages`
CREATE TABLE `villages` (
  `villageId` varchar(255) NOT NULL,
  `villageName` varchar(255) NOT NULL,
  `textDes` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `wardId` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`villageId`),
  KEY `wardId` (`wardId`),
  CONSTRAINT `villages_ibfk_1` FOREIGN KEY (`wardId`) REFERENCES `wards` (`wardId`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;