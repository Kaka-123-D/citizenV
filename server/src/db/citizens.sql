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

-- Bảng lưu số lượng bản ghi đã xóa
CREATE TABLE records (
	id INT AUTO_INCREMENT PRIMARY KEY,
    amount INT NOT NULL DEFAULT 0
);
INSERT INTO records(amount) VALUES (0);
-- DROP TABLE records;

-- ============================> Store Procedure and Function <================================

-- ------------------------------ Lấy %Person theo tuổi, giới tính, nơi ở  --------------------------
DELIMITER $$
CREATE FUNCTION calRatioPopulationWithAge(minAge INTEGER, maxAge INTEGER, sex INTEGER, address VARCHAR(255), totalPerson INTEGER)
RETURNS FLOAT
NO SQL 
BEGIN
DECLARE ratio FLOAT DEFAULT 0;
IF (address = "nationwide") THEN
	IF (sex = 1) THEN
		SELECT COUNT(*) INTO ratio
		FROM citizens.persons p
		WHERE ((DATEDIFF(NOW(), p.birthday))/365) >= minAge AND ((DATEDIFF(NOW(), p.birthday))/365) <= maxAge AND p.sex = true;
	ELSEIF (sex = 0) THEN
		SELECT COUNT(*) INTO ratio
		FROM citizens.persons p
		WHERE ((DATEDIFF(NOW(), p.birthday))/365) >= minAge AND ((DATEDIFF(NOW(), p.birthday))/365) <= maxAge AND p.sex = false;
	ELSEIF (sex = -1) THEN
		SELECT COUNT(*) INTO ratio
		FROM citizens.persons p
		WHERE ((DATEDIFF(NOW(), p.birthday))/365) >= minAge AND ((DATEDIFF(NOW(), p.birthday))/365) <= maxAge;
	END IF;
ELSE 
	IF (sex = 1) THEN
		SELECT COUNT(*) INTO ratio
		FROM citizens.persons p
		WHERE ((DATEDIFF(NOW(), p.birthday))/365) >= minAge
        AND ((DATEDIFF(NOW(), p.birthday))/365) <= maxAge 
        AND p.thuongTru REGEXP address
        AND p.sex = true;
	ELSEIF (sex = 0) THEN
		SELECT COUNT(*) INTO ratio
		FROM citizens.persons p
		WHERE ((DATEDIFF(NOW(), p.birthday))/365) >= minAge 
        AND ((DATEDIFF(NOW(), p.birthday))/365) <= maxAge 
        AND p.thuongTru REGEXP address
        AND p.sex = false;
	ELSEIF (sex = -1) THEN
		SELECT COUNT(*) INTO ratio
		FROM citizens.persons p
		WHERE ((DATEDIFF(NOW(), p.birthday))/365) >= minAge 
        AND p.thuongTru REGEXP address
        AND ((DATEDIFF(NOW(), p.birthday))/365) <= maxAge;
	END IF;
END IF;
RETURN ratio / totalPerson;
END $$
DELIMITER ;

-- DROP FUNCTION calRatioPopulationWithAge;
-- EXPLAIN SELECT calRatioPopulationWithAge(0, 4, 1, "nationwide", 50000);

-- ----------------------------------------- Lấy %Nam các tuổi -----------------------------
DELIMITER $$
CREATE PROCEDURE getPercentAgeMale(IN address VARCHAR(255), IN totalPerson INTEGER) 
BEGIN
SELECT calRatioPopulationWithAge(0, 4, 1, address, totalPerson) age_0;
SELECT calRatioPopulationWithAge(5, 9, 1, address, totalPerson) age_5;
SELECT calRatioPopulationWithAge(10, 14, 1, address, totalPerson) age_10;
SELECT calRatioPopulationWithAge(15, 19, 1, address, totalPerson) age_15;
SELECT calRatioPopulationWithAge(20, 24, 1, address, totalPerson) age_20;
SELECT calRatioPopulationWithAge(25, 29, 1, address, totalPerson) age_25;
SELECT calRatioPopulationWithAge(30, 34, 1, address, totalPerson) age_30;
SELECT calRatioPopulationWithAge(35, 39, 1, address, totalPerson) age_35;
SELECT calRatioPopulationWithAge(40, 44, 1, address, totalPerson) age_40;
SELECT calRatioPopulationWithAge(45, 49, 1, address, totalPerson) age_45;
SELECT calRatioPopulationWithAge(50, 54, 1, address, totalPerson) age_50;
SELECT calRatioPopulationWithAge(55, 59, 1, address, totalPerson) age_55;
SELECT calRatioPopulationWithAge(60, 64, 1, address, totalPerson) age_60;
SELECT calRatioPopulationWithAge(65, 69, 1, address, totalPerson) age_65;
SELECT calRatioPopulationWithAge(70, 74, 1, address, totalPerson) age_70;
SELECT calRatioPopulationWithAge(75, 79, 1, address, totalPerson) age_75;
SELECT calRatioPopulationWithAge(80, 130, 1, address, totalPerson) age_80;
END $$
DELIMITER ;

-- DROP PROCEDURE getPercentAgeMale;
-- CALL getPercentAgeMale("nationwide", 50000);

-- ------------------------------------- Lấy %Nữ các tuổi -----------------------------
DELIMITER $$
CREATE PROCEDURE getPercentAgeFemale(IN address VARCHAR(255), IN totalPerson INTEGER) 
BEGIN
SELECT calRatioPopulationWithAge(0, 4, 0, address, totalPerson) age_0;
SELECT calRatioPopulationWithAge(5, 9, 0, address, totalPerson) age_5;
SELECT calRatioPopulationWithAge(10, 14, 0, address, totalPerson) age_10;
SELECT calRatioPopulationWithAge(15, 19, 0, address, totalPerson) age_15;
SELECT calRatioPopulationWithAge(20, 24, 0, address, totalPerson) age_20;
SELECT calRatioPopulationWithAge(25, 29, 0, address, totalPerson) age_25;
SELECT calRatioPopulationWithAge(30, 34, 0, address, totalPerson) age_30;
SELECT calRatioPopulationWithAge(35, 39, 0, address, totalPerson) age_35;
SELECT calRatioPopulationWithAge(40, 44, 0, address, totalPerson) age_40;
SELECT calRatioPopulationWithAge(45, 49, 0, address, totalPerson) age_45;
SELECT calRatioPopulationWithAge(50, 54, 0, address, totalPerson) age_50;
SELECT calRatioPopulationWithAge(55, 59, 0, address, totalPerson) age_55;
SELECT calRatioPopulationWithAge(60, 64, 0, address, totalPerson) age_60;
SELECT calRatioPopulationWithAge(65, 69, 0, address, totalPerson) age_65;
SELECT calRatioPopulationWithAge(70, 74, 0, address, totalPerson) age_70;
SELECT calRatioPopulationWithAge(75, 79, 0, address, totalPerson) age_75;
SELECT calRatioPopulationWithAge(80, 130, 0, address, totalPerson) age_80;
END $$
DELIMITER ;

-- DROP PROCEDURE getPercentAgeFemale;
-- CALL getPercentAgeFemale("nationwide");

-- ------------------------------ Lấy số lượng người dân ---------------------------------
DELIMITER $$
CREATE FUNCTION getAmountPerson(address VARCHAR(255)) 
RETURNS INTEGER
NO SQL
BEGIN
DECLARE amountPerson INTEGER DEFAULT 0;
DECLARE maxSttPerson INTEGER DEFAULT 0;
DECLARE minSttPerson INTEGER DEFAULT 0;
DECLARE amountRecordDelete INTEGER DEFAULT 0;
IF (address = "nationwide") THEN 
	SELECT amount INTO amountPerson FROM records;
ELSE 
	SELECT COUNT(*) INTO amountPerson
	FROM citizens.persons p
	WHERE p.thuongTru REGEXP address;
END IF;

RETURN amountPerson;
END $$
DELIMITER ;

-- DROP FUNCTION getAmountPerson;
-- SELECT COUNT(*) FROM citizens.persons;

-- Trigger cập nhập lại số lượng dân số sau khi thêm, xóa
DELIMITER $$
CREATE TRIGGER afterPersonDelete
    AFTER DELETE
    ON citizens.persons FOR EACH ROW
BEGIN
    DECLARE amountPerson INTEGER DEFAULT 0;
    SELECT COUNT(*) INTO amountPerson FROM citizens.persons;
	UPDATE records SET amount = amountPerson WHERE id = 1;
END$$
DELIMITER ;
-- DROP TRIGGER afterPersonDelete;
DELIMITER $$
CREATE TRIGGER afterPersonInsert
    AFTER INSERT
    ON citizens.persons FOR EACH ROW
BEGIN
    DECLARE amountPerson INTEGER DEFAULT 0;
    SELECT COUNT(*) INTO amountPerson FROM citizens.persons;
	UPDATE records SET amount = amountPerson WHERE id = 1;
END$$
DELIMITER ;


-- ------------------------------------ Lấy % thành thị ---------------------------------

DELIMITER $$
CREATE FUNCTION getPercentRegionCity(address VARCHAR(255), totalPerson INTEGER) 
RETURNS FLOAT
NO SQL 
BEGIN
DECLARE ts INTEGER DEFAULT 0;
IF (address = "nationwide") THEN
	SELECT COUNT(*) INTO ts FROM citizens.persons p WHERE p.thuongTru like '%Thành Phố%';
ELSE
	SELECT COUNT(*) INTO ts 
    FROM citizens.persons p 
    WHERE p.thuongTru like '%Thành Phố%'
    AND p.thuongTru REGEXP address;
END IF;
RETURN ts / totalPerson;
END $$
DELIMITER ;

-- DROP FUNCTION getPercentRegionCity;
-- SELECT getPercentRegionCity("thành phố Hồ Chí Minh|tỉnh An Giang");

-- ----------------------------------- Hàm lấy % luồng di cư theo start và end -------------------------------
DELIMITER $$
CREATE FUNCTION getPercentMigrateDetail(s INTEGER, f INTEGER, totalPerson INTEGER) 
RETURNS FLOAT
NO SQL 
BEGIN
DECLARE ts INTEGER DEFAULT 0;
IF (s = 1 and f = 0) THEN
	SELECT COUNT(*) INTO ts FROM citizens.persons p 
    WHERE p.village like '%Thành Phố%' AND p.thuongTru not like '%Thành Phố%';
ELSEIF (s = 0 and f = 1) THEN
	SELECT COUNT(*) INTO ts FROM citizens.persons p 
    WHERE p.village not like '%Thành Phố%' AND p.thuongTru like '%Thành Phố%';
ELSEIF (s = 1 and f = 1) THEN
	SELECT COUNT(*) INTO ts FROM citizens.persons p 
    WHERE p.village like '%Thành Phố%' AND p.thuongTru like '%Thành Phố%' AND p.village != p.thuongTru;
ELSEIF (s = 0 and f = 0) THEN
	SELECT COUNT(*) INTO ts FROM citizens.persons p 
    WHERE p.village not like '%Thành Phố%' AND p.thuongTru not like '%Thành Phố%' AND p.village != p.thuongTru;
END IF;
RETURN ts / totalPerson;
END $$
DELIMITER ;

-- DROP FUNCTION getPercentMigrateDetail;

-- ------------------------------------- Chương trình lấy % luồng di cư -----------------------------------
DELIMITER $$
CREATE PROCEDURE getPercentMigrate(IN totalPerson INTEGER) 
BEGIN
SELECT getPercentMigrateDetail(1, 0, totalPerson) row_1;
SELECT getPercentMigrateDetail(0, 1, totalPerson) row_2;
SELECT getPercentMigrateDetail(1, 1, totalPerson) row_3;
SELECT getPercentMigrateDetail(0, 0, totalPerson) row_4;
END $$
DELIMITER ;

-- DROP PROCEDURE getPercentMigrate;
-- CALL getPercentMigrate();

-- ------------------------------------- Chương trình lấy cơ cấu nhóm tuổi -------------------------------
DELIMITER $$
CREATE PROCEDURE getPercentGroupAge(IN address VARCHAR(255), IN totalPerson INTEGER) 
BEGIN
SELECT calRatioPopulationWithAge(0, 14, -1, address, totalPerson) age_0;
SELECT (calRatioPopulationWithAge(15, 61, 1, address, totalPerson) + calRatioPopulationWithAge(15, 59, 0, address, totalPerson)) age_1;
SELECT (calRatioPopulationWithAge(62, 130, 1, address, totalPerson) + calRatioPopulationWithAge(60, 130, 0, address, totalPerson)) age_2;
END $$
DELIMITER ;

-- DROP PROCEDURE getPercentGroupAge;
-- CALL getPercentGroupAge("huyện khu bốn, tỉnh An Giang");

-- -------------------------- Hàm tính % theo tôn giáo ---------------------------------
DELIMITER $$
CREATE FUNCTION getPercentReligionDetails(religion VARCHAR(255), address VARCHAR(255), totalPerson INTEGER) 
RETURNS FLOAT
NO SQL 
BEGIN
DECLARE ts INTEGER DEFAULT 0;
IF (address = "nationwide") THEN
	SELECT COUNT(*) INTO ts FROM citizens.persons p 
	WHERE p.religion = religion;
ELSE
	SELECT COUNT(*) INTO ts 
    FROM citizens.persons p 
	WHERE p.religion = religion
    AND p.thuongTru REGEXP address;
END IF;
RETURN ts / totalPerson;
END $$
DELIMITER ;

-- DROP FUNCTION getPercentReligionDetails;
-- SELECT getPercentReligionDetails("Kitô Giáo", "thành phố Hồ Chí Minh");

-- ----------------------------------- Chương trình lấy cơ cấu tôn giáo -------------------------------------
DELIMITER $$
CREATE PROCEDURE getPercentReligion(IN address VARCHAR(255), IN totalPerson INTEGER) 
BEGIN
SELECT getPercentReligionDetails("Kitô Giáo", address, totalPerson) r_1;
SELECT getPercentReligionDetails("Phật Giáo", address, totalPerson) r_2;
SELECT getPercentReligionDetails("Đạo Tin Lành", address, totalPerson) r_3;
SELECT getPercentReligionDetails("Phật Giáo Hòa Hảo", address, totalPerson) r_4;
SELECT getPercentReligionDetails("Đạo Cao Đài", address, totalPerson) r_5;
SELECT getPercentReligionDetails("Không", address, totalPerson) r_6;
SELECT getPercentReligionDetails("Khác", address, totalPerson) r_7;
END $$
DELIMITER ;

-- DROP PROCEDURE getPercentReligion;
-- CALL getPercentReligion();

-- --------------------------------- Hàm tính % học thpt theo giới tính, nơi ở -------------------
DELIMITER $$
CREATE FUNCTION getPercentEducationDetails(region VARCHAR(255), sex BOOLEAN, address VARCHAR(255)) 
RETURNS FLOAT
NO SQL 
BEGIN
DECLARE totalPerson INTEGER DEFAULT -1;
DECLARE ts INTEGER DEFAULT 0;
IF (region = "thành thị") THEN 
	IF (address = "nationwide") THEN 
		SELECT COUNT(*) INTO totalPerson 
        FROM citizens.persons p 
        WHERE p.thuongTru like '%Thành Phố%';
        
		IF (totalPerson = 0) THEN 
			SET totalPerson = -1;
		END IF;
        
		SELECT COUNT(*) INTO ts FROM citizens.persons p 
		WHERE p.thuongTru like '%Thành Phố%' 
		AND ((DATEDIFF(NOW(), p.birthday))/365) >= 15
		AND ((DATEDIFF(NOW(), p.birthday))/365) <= 17
		AND p.educationLevel != "Trung Học Phổ Thông"
        AND p.educationLevel != "Trung Cấp"
		AND p.educationLevel != "Đại Học"
		AND p.educationLevel != "Cao Đẳng"
		AND p.educationLevel != "Bậc Sau Đại Học"
		AND p.sex = sex;
	ELSE         
		SELECT COUNT(*) INTO totalPerson 
        FROM citizens.persons p 
        WHERE p.thuongTru like '%Thành Phố%'
        AND p.thuongTru REGEXP address;
        
		IF (totalPerson = 0) THEN 
			SET totalPerson = -1;
		END IF;
        
		SELECT COUNT(*) INTO ts FROM citizens.persons p 
		WHERE p.thuongTru like '%Thành Phố%' 
        AND p.thuongTru REGEXP address
		AND ((DATEDIFF(NOW(), p.birthday))/365) >= 15
		AND ((DATEDIFF(NOW(), p.birthday))/365) <= 17
		AND p.educationLevel != "Trung Học Phổ Thông"
        AND p.educationLevel != "Trung Cấp"
		AND p.educationLevel != "Đại Học"
		AND p.educationLevel != "Cao Đẳng"
		AND p.educationLevel != "Bậc Sau Đại Học"
		AND p.sex = sex;
    END IF;
ELSEIF (region = "nông thôn") THEN 
	IF (address = "nationwide") THEN 
		SELECT COUNT(*) INTO totalPerson 
        FROM citizens.persons p 
        WHERE p.thuongTru not like '%Thành Phố%';
        
		IF (totalPerson = 0) THEN 
			SET totalPerson = -1;
		END IF;
        
		SELECT COUNT(*) INTO ts FROM citizens.persons p 
		WHERE p.thuongTru not like '%Thành Phố%' 
		AND ((DATEDIFF(NOW(), p.birthday))/365) >= 15
		AND ((DATEDIFF(NOW(), p.birthday))/365) <= 17
		AND p.educationLevel != "Trung Học Phổ Thông"
        AND p.educationLevel != "Trung Cấp"
		AND p.educationLevel != "Đại Học"
		AND p.educationLevel != "Cao Đẳng"
		AND p.educationLevel != "Bậc Sau Đại Học"
		AND p.sex = sex;
	ELSE 
		SELECT COUNT(*) INTO totalPerson 
        FROM citizens.persons p 
        WHERE p.thuongTru not like '%Thành Phố%'
        AND p.thuongTru REGEXP address;
        
		IF (totalPerson = 0) THEN 
			SET totalPerson = -1;
		END IF;
        
		SELECT COUNT(*) INTO ts FROM citizens.persons p 
		WHERE p.thuongTru not like '%Thành Phố%' 
        AND p.thuongTru REGEXP address
		AND ((DATEDIFF(NOW(), p.birthday))/365) >= 15
		AND ((DATEDIFF(NOW(), p.birthday))/365) <= 17
		AND p.educationLevel != "Trung Học Phổ Thông"
        AND p.educationLevel != "Trung Cấp"
		AND p.educationLevel != "Đại Học"
		AND p.educationLevel != "Cao Đẳng"
		AND p.educationLevel != "Bậc Sau Đại Học"
		AND p.sex = sex;
	END IF;
ELSEIF (region = "toàn phạm vi") THEN 
	IF (address = "nationwide") THEN 
		SELECT COUNT(*) INTO totalPerson FROM citizens.persons;
        
		IF (totalPerson = 0) THEN 
			SET totalPerson = -1;
		END IF;
        
		SELECT COUNT(*) INTO ts FROM citizens.persons p 
		WHERE ((DATEDIFF(NOW(), p.birthday))/365) >= 15
		AND ((DATEDIFF(NOW(), p.birthday))/365) <= 17
		AND p.educationLevel != "Trung Học Phổ Thông"
        AND p.educationLevel != "Trung Cấp"
		AND p.educationLevel != "Đại Học"
		AND p.educationLevel != "Cao Đẳng"
		AND p.educationLevel != "Bậc Sau Đại Học"
		AND p.sex = sex;
	ELSE 
		SELECT COUNT(*) INTO totalPerson 
        FROM citizens.persons p
        WHERE p.thuongTru REGEXP address;
        
		IF (totalPerson = 0) THEN 
			SET totalPerson = -1;
		END IF;
        
		SELECT COUNT(*) INTO ts FROM citizens.persons p 
		WHERE ((DATEDIFF(NOW(), p.birthday))/365) >= 15
		AND ((DATEDIFF(NOW(), p.birthday))/365) <= 17
        AND p.thuongTru REGEXP address
		AND p.educationLevel != "Trung Học Phổ Thông"
        AND p.educationLevel != "Trung Cấp"
		AND p.educationLevel != "Đại Học"
		AND p.educationLevel != "Cao Đẳng"
		AND p.educationLevel != "Bậc Sau Đại Học"
		AND p.sex = sex;
    END IF;
END IF;
RETURN ts / totalPerson;
END $$
DELIMITER ;

-- DROP FUNCTION getPercentEducationDetails;

-- ------------------------------ Chương trình lấy cơ cấu học thpt của nam --------------------------
DELIMITER $$
CREATE PROCEDURE getPercentEducationMale(IN address VARCHAR(255)) 
BEGIN
	SELECT getPercentEducationDetails("thành thị", true, address) m_1;
    SELECT getPercentEducationDetails("nông thôn", true, address) m_2;
    SELECT getPercentEducationDetails("toàn phạm vi", true, address) m_3;
END $$
DELIMITER ;

-- DROP PROCEDURE getPercentEducationMale;
-- CALL getPercentEducationMale();

-- ------------------------------ Chương trình lấy cơ cấu học thpt của nữ --------------------------
DELIMITER $$
CREATE PROCEDURE getPercentEducationFemale(IN address VARCHAR(255)) 
BEGIN
	SELECT getPercentEducationDetails("thành thị", false, address) f_1;
    SELECT getPercentEducationDetails("nông thôn", false, address) f_2;
    SELECT getPercentEducationDetails("toàn phạm vi", false, address) f_3;
END $$
DELIMITER ;
-- DROP PROCEDURE getPercentEducationFemale;
-- CALL getPercentEducationFemale();

-- ------------------------------- Hàm tính % theo giới tính và nơi ở -------------------------
-- CREATE INDEX sex ON citizens.persons(sex);
-- CREATE INDEX thuongTru ON citizens.persons(thuongTru);
DELIMITER $$
CREATE FUNCTION getPercentGenderDetails(address VARCHAR(255), sex BOOLEAN, totalPerson INTEGER) 
RETURNS FLOAT
NO SQL 
BEGIN
DECLARE ts INTEGER DEFAULT 0;
IF (address = "nationwide") THEN
	SELECT COUNT(*) INTO ts FROM citizens.persons p WHERE p.sex = sex;
ELSE
	SELECT COUNT(*) INTO ts 
    FROM citizens.persons p 
    WHERE p.sex = sex
    AND p.thuongTru REGEXP address;
END IF;
RETURN ts / totalPerson;
END $$
DELIMITER ;

-- DROP FUNCTION getPercentGenderDetails;
-- SELECT getPercentMale("tỉnh An Giang|thành phố Hồ Chí Minh");

-- ---------------------------- Chương trình lấy cơ cấu theo giới tính ------------------------
DELIMITER $$
CREATE PROCEDURE getPercentGender(IN address VARCHAR(255), IN totalPerson INTEGER) 
BEGIN
	SELECT getPercentGenderDetails(address, true, totalPerson) g_1;
    SELECT getPercentGenderDetails(address, false, totalPerson) g_2;
END $$
DELIMITER ;

-- DROP PROCEDURE getPercentGender;
-- CALL getPercentGender("huyện khu 4, tỉnh An Giang");

-- -------------------------- Hàm tính % thất nghiệp theo nơi ở ---------------------------------
DELIMITER $$
CREATE FUNCTION getPercentUnemployment(address VARCHAR(255), totalPerson INTEGER) 
RETURNS FLOAT
NO SQL 
BEGIN
DECLARE ts INTEGER DEFAULT 0;
IF (address = "nationwide") THEN
	SELECT COUNT(*) INTO ts FROM citizens.persons p WHERE p.job = "Thất Nghiệp";
ELSE
	SELECT COUNT(*) INTO ts 
    FROM citizens.persons p 
    WHERE p.job = "Thất Nghiệp"
    AND p.thuongTru REGEXP address;
END IF;
RETURN ts / totalPerson;
END $$
DELIMITER ;

-- DROP FUNCTION getPercentUnemployment;
-- SELECT getPercentUnemployment("nationwide");