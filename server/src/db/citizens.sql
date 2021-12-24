-- MySQL version: 8.0.21
-- Host: localhost:3306

-- Author: Vũ Ngọc Quyền

-- Create database
CREATE DATABASE IF NOT EXISTS citizens;
USE citizens;

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
  `lastLogin` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `managerId` int DEFAULT NULL,
  PRIMARY KEY (`userId`),
  KEY `managerId` (`managerId`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`managerId`) REFERENCES `users` (`userId`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

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
  `provinceType` varchar(255) NOT NULL,
  `textDes` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`provinceId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Table structure for table `districts`
CREATE TABLE `districts` (
  `districtId` varchar(255) NOT NULL,
  `districtName` varchar(255) NOT NULL,
  `districtType` varchar(255) NOT NULL,
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
  `wardType` varchar(255) NOT NULL,
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
  `villageType` varchar(255) NOT NULL,
  `textDes` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `wardId` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`villageId`),
  KEY `wardId` (`wardId`),
  CONSTRAINT `villages_ibfk_1` FOREIGN KEY (`wardId`) REFERENCES `wards` (`wardId`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- -----------------------------Store Procedure and Function-----------------------------------
-- Lấy %Person with age and sex
DELIMITER $$
CREATE FUNCTION calRatioPopulationWithAge(minAge INTEGER, maxAge INTEGER, sex INTEGER)
RETURNS FLOAT
NO SQL 
BEGIN
DECLARE ratio FLOAT DEFAULT 0;
DECLARE totalPerson INT DEFAULT -1;
SELECT COUNT(*) INTO totalPerson
FROM citizens.persons;
IF (totalPerson = 0) THEN 
	SET totalPerson = -1;
END IF;
IF (sex = 1) THEN
	SELECT COUNT(*) INTO ratio
	FROM citizens.persons p
	WHERE ((DATEDIFF(NOW(), p.birthday))/365) >= minAge AND ((DATEDIFF(NOW(), p.birthday))/365) <= maxAge AND p.sex = true;
	RETURN ratio/totalPerson;
ELSEIF (sex = 0) THEN
	SELECT COUNT(*) INTO ratio
	FROM citizens.persons p
	WHERE ((DATEDIFF(NOW(), p.birthday))/365) >= minAge AND ((DATEDIFF(NOW(), p.birthday))/365) <= maxAge AND p.sex = false;
	RETURN ratio/totalPerson;
ELSEIF (sex = -1) THEN
	SELECT COUNT(*) INTO ratio
	FROM citizens.persons p
	WHERE ((DATEDIFF(NOW(), p.birthday))/365) >= minAge AND ((DATEDIFF(NOW(), p.birthday))/365) <= maxAge;
	RETURN ratio/totalPerson;
END IF;
RETURN ratio / totalPerson;
END $$
DELIMITER ;

-- DROP FUNCTION calRatioPopulationWithAge;

-- Lấy %Nam các tuổi
DELIMITER $$
CREATE PROCEDURE getPercentAgeMale() 
BEGIN
SELECT calRatioPopulationWithAge(0, 4, 1) age_0;
SELECT calRatioPopulationWithAge(5, 9, 1) age_5;
SELECT calRatioPopulationWithAge(10, 14, 1) age_10;
SELECT calRatioPopulationWithAge(15, 19, 1) age_15;
SELECT calRatioPopulationWithAge(20, 24, 1) age_20;
SELECT calRatioPopulationWithAge(25, 29, 1) age_25;
SELECT calRatioPopulationWithAge(30, 34, 1) age_30;
SELECT calRatioPopulationWithAge(35, 39, 1) age_35;
SELECT calRatioPopulationWithAge(40, 44, 1) age_40;
SELECT calRatioPopulationWithAge(45, 49, 1) age_45;
SELECT calRatioPopulationWithAge(50, 54, 1) age_50;
SELECT calRatioPopulationWithAge(55, 59, 1) age_55;
SELECT calRatioPopulationWithAge(60, 64, 1) age_60;
SELECT calRatioPopulationWithAge(65, 69, 1) age_65;
SELECT calRatioPopulationWithAge(70, 74, 1) age_70;
SELECT calRatioPopulationWithAge(75, 79, 1) age_75;
SELECT calRatioPopulationWithAge(80, 130, 1) age_80;
END $$
DELIMITER ;

-- DROP PROCEDURE getPercentAgeMale;

-- Lấy %Nữ các tuổi
DELIMITER $$
CREATE PROCEDURE getPercentAgeFemale() 
BEGIN
SELECT calRatioPopulationWithAge(0, 4, 0) age_0;
SELECT calRatioPopulationWithAge(5, 9, 0) age_5;
SELECT calRatioPopulationWithAge(10, 14, 0) age_10;
SELECT calRatioPopulationWithAge(15, 19, 0) age_15;
SELECT calRatioPopulationWithAge(20, 24, 0) age_20;
SELECT calRatioPopulationWithAge(25, 29, 0) age_25;
SELECT calRatioPopulationWithAge(30, 34, 0) age_30;
SELECT calRatioPopulationWithAge(35, 39, 0) age_35;
SELECT calRatioPopulationWithAge(40, 44, 0) age_40;
SELECT calRatioPopulationWithAge(45, 49, 0) age_45;
SELECT calRatioPopulationWithAge(50, 54, 0) age_50;
SELECT calRatioPopulationWithAge(55, 59, 0) age_55;
SELECT calRatioPopulationWithAge(60, 64, 0) age_60;
SELECT calRatioPopulationWithAge(65, 69, 0) age_65;
SELECT calRatioPopulationWithAge(70, 74, 0) age_70;
SELECT calRatioPopulationWithAge(75, 79, 0) age_75;
SELECT calRatioPopulationWithAge(80, 130, 0) age_80;
END $$
DELIMITER ;

-- DROP PROCEDURE getPercentAgeFemale;

-- Lấy số lượng người dân
DELIMITER $$
CREATE PROCEDURE getAmountPerson(IN address VARCHAR(255)) 
BEGIN
DECLARE pattern VARCHAR(255) DEFAULT "";
SET pattern = CONCAT("%", address, "%");
SELECT COUNT(*) amountPerson
FROM citizens.persons p
WHERE p.thuongTru like pattern;
END $$
DELIMITER ;

-- Lấy % thành thị

DELIMITER $$
CREATE FUNCTION getPercentRegionCity() 
RETURNS FLOAT
NO SQL 
BEGIN
DECLARE totalPerson INTEGER DEFAULT -1;
DECLARE ts INTEGER DEFAULT 0;
SELECT COUNT(*) INTO totalPerson FROM citizens.persons;
SELECT COUNT(*) INTO ts FROM citizens.persons p WHERE p.thuongTru like '%thành phố%';
IF (totalPerson = 0) THEN 
	SET totalPerson = -1;
END IF;
RETURN ts / totalPerson;
END $$
DELIMITER ;

-- Lấy % luồng di cư detail
DELIMITER $$
CREATE FUNCTION getPercentMigrateDetail(s INTEGER, f INTEGER) 
RETURNS FLOAT
NO SQL 
BEGIN
DECLARE totalPerson INTEGER DEFAULT -1;
DECLARE ts INTEGER DEFAULT 0;
SELECT COUNT(*) INTO totalPerson FROM citizens.persons;
IF (totalPerson = 0) THEN 
	SET totalPerson = -1;
END IF;

IF (s = 1 and f = 0) THEN
	SELECT COUNT(*) INTO ts FROM citizens.persons p 
    WHERE p.village like '%thành phố%' AND p.thuongTru not like '%thành phố%';
ELSEIF (s = 0 and f = 1) THEN
	SELECT COUNT(*) INTO ts FROM citizens.persons p 
    WHERE p.village not like '%thành phố%' AND p.thuongTru like '%thành phố%';
ELSEIF (s = 1 and f = 1) THEN
	SELECT COUNT(*) INTO ts FROM citizens.persons p 
    WHERE p.village like '%thành phố%' AND p.thuongTru like '%thành phố%' AND p.village != p.thuongTru;
ELSEIF (s = 0 and f = 0) THEN
	SELECT COUNT(*) INTO ts FROM citizens.persons p 
    WHERE p.village not like '%thành phố%' AND p.thuongTru not like '%thành phố%' AND p.village != p.thuongTru;
END IF;
RETURN ts / totalPerson;
END $$
DELIMITER ;

-- Lấy % luồng di cư
DELIMITER $$
CREATE PROCEDURE getPercentMigrate() 
BEGIN
SELECT getPercentMigrateDetail(1, 0) row_1;
SELECT getPercentMigrateDetail(0, 1) row_2;
SELECT getPercentMigrateDetail(1, 1) row_3;
SELECT getPercentMigrateDetail(0, 0) row_4;
END $$
DELIMITER ;

-- DROP PROCEDURE getPercentMigrate;
-- CALL getPercentMigrate();

-- Lấy cơ cấu nhóm tuổi
DELIMITER $$
CREATE PROCEDURE getPercentGroupAge() 
BEGIN
SELECT calRatioPopulationWithAge(0, 14, -1) age_0;
SELECT (calRatioPopulationWithAge(15, 62, 1) + calRatioPopulationWithAge(15, 60, 0)) age_1;
END $$
DELIMITER ;

-- CALL getPercentGroupAge();

-- Lấy cơ cấu tôn giáo chi tiết
DELIMITER $$
CREATE FUNCTION getPercentReligionDetails(religion VARCHAR(255)) 
RETURNS FLOAT
NO SQL 
BEGIN
DECLARE totalPerson INTEGER DEFAULT -1;
DECLARE ts INTEGER DEFAULT 0;
SELECT COUNT(*) INTO totalPerson FROM citizens.persons;
IF (totalPerson = 0) THEN 
	SET totalPerson = -1;
END IF;
SELECT COUNT(*) INTO ts FROM citizens.persons p 
WHERE p.religion = religion;
RETURN ts / totalPerson;
END $$
DELIMITER ;

-- Lấy cơ cấu tôn giáo
DELIMITER $$
CREATE PROCEDURE getPercentReligion() 
BEGIN
SELECT getPercentReligionDetails("Kitô Giáo") r_1;
SELECT getPercentReligionDetails("Phật Giáo") r_2;
SELECT getPercentReligionDetails("Đạo Tinh Lành") r_3;
SELECT getPercentReligionDetails("Phật Giáo Hòa Hảo") r_4;
SELECT getPercentReligionDetails("Đạo Cao Đài") r_5;
SELECT getPercentReligionDetails("Không") r_6;
END $$
DELIMITER ;

-- CALL getPercentReligion();

-- Lấy cơ cấu độ tuổi đi học details
DELIMITER $$
CREATE FUNCTION getPercentEducationDetails(region VARCHAR(255), sex BOOLEAN) 
RETURNS FLOAT
NO SQL 
BEGIN
DECLARE totalPerson INTEGER DEFAULT -1;
DECLARE ts INTEGER DEFAULT 0;
IF (region = "thành thị") THEN 
	SELECT COUNT(*) INTO totalPerson FROM citizens.persons p WHERE p.thuongTru like '%thành phố%';
	IF (totalPerson = 0) THEN 
		SET totalPerson = -1;
	END IF;
	SELECT COUNT(*) INTO ts FROM citizens.persons p 
    WHERE p.thuongTru like '%thành phố%' 
    AND ((DATEDIFF(NOW(), p.birthday))/365) >= 15
    AND ((DATEDIFF(NOW(), p.birthday))/365) <= 17
    AND p.educationLevel != "trung học phổ thông"
    AND p.educationLevel != "đại học"
    AND p.educationLevel != "cao đẳng"
    AND p.educationLevel != "giáo sư"
    AND p.educationLevel != "tiến sĩ"
    AND p.educationLevel != "cử nhân"
    AND p.sex = sex;
ELSEIF (region = "nông thôn") THEN 
	SELECT COUNT(*) INTO totalPerson FROM citizens.persons p WHERE p.thuongTru not like '%thành phố%';
	IF (totalPerson = 0) THEN 
		SET totalPerson = -1;
	END IF;
	SELECT COUNT(*) INTO ts FROM citizens.persons p 
    WHERE p.thuongTru not like '%thành phố%' 
    AND ((DATEDIFF(NOW(), p.birthday))/365) >= 15
    AND ((DATEDIFF(NOW(), p.birthday))/365) <= 17
    AND p.educationLevel != "trung học phổ thông"
    AND p.educationLevel != "đại học"
    AND p.educationLevel != "cao đẳng"
    AND p.educationLevel != "giáo sư"
    AND p.educationLevel != "tiến sĩ"
    AND p.educationLevel != "cử nhân"
    AND p.sex = sex;
ELSEIF (region = "toàn quốc") THEN 
	SELECT COUNT(*) INTO totalPerson FROM citizens.persons;
	IF (totalPerson = 0) THEN 
		SET totalPerson = -1;
	END IF;
	SELECT COUNT(*) INTO ts FROM citizens.persons p 
    WHERE ((DATEDIFF(NOW(), p.birthday))/365) >= 15
    AND ((DATEDIFF(NOW(), p.birthday))/365) <= 17
    AND p.educationLevel != "trung học phổ thông"
    AND p.educationLevel != "đại học"
    AND p.educationLevel != "cao đẳng"
    AND p.educationLevel != "giáo sư"
    AND p.educationLevel != "tiến sĩ"
    AND p.educationLevel != "cử nhân"
    AND p.sex = sex;
END IF;
RETURN ts / totalPerson;
END $$
DELIMITER ;

-- Lấy cơ cấu độ tuổi đi học nam
DELIMITER $$
CREATE PROCEDURE getPercentEducationMale() 
BEGIN
	SELECT getPercentEducationDetails("thành thị", true) m_1;
    SELECT getPercentEducationDetails("nông thôn", true) m_2;
    SELECT getPercentEducationDetails("toàn quốc", true) m_3;
END $$
DELIMITER ;

-- DROP PROCEDURE getPercentEducationMale;
-- CALL getPercentEducationMale();

-- Lấy cơ cấu độ tuổi đi học nữ
DELIMITER $$
CREATE PROCEDURE getPercentEducationFemale() 
BEGIN
	SELECT getPercentEducationDetails("thành thị", false) f_1;
    SELECT getPercentEducationDetails("nông thôn", false) f_2;
    SELECT getPercentEducationDetails("toàn quốc", false) f_3;
END $$
DELIMITER ;
-- DROP PROCEDURE getPercentEducationFemale;
-- CALL getPercentEducationFemale();