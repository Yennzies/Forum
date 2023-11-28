-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema forum
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema forum
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `forum` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `forum` ;

-- -----------------------------------------------------
-- Table `forum`.`Users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `forum`.`Users` (
  `idUsers` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `picture` LONGTEXT NOT NULL,
  `joined_at` VARCHAR(45) NOT NULL,
  `bio` VARCHAR(45) NULL,
  PRIMARY KEY (`idUsers`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `forum`.`Posts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `forum`.`Posts` (
  `idPosts` INT NOT NULL AUTO_INCREMENT,
  `question` VARCHAR(255) NOT NULL,
  `created_at` VARCHAR(25) NOT NULL,
  `userFid` INT NOT NULL,
  PRIMARY KEY (`idPosts`),
  INDEX `fk_Posts_Users_idx` (`userFid` ASC) VISIBLE,
  CONSTRAINT `fk_Posts_Users`
    FOREIGN KEY (`userFid`)
    REFERENCES `forum`.`Users` (`idUsers`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `forum`.`comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `forum`.`comments` (
  `idComments` INT NOT NULL AUTO_INCREMENT,
  `comment` VARCHAR(255) NOT NULL,
  `likes` INT NOT NULL,
  `created_at` VARCHAR(25) NOT NULL,
  `postFid` INT NOT NULL,
  `userFid` INT NOT NULL,
  PRIMARY KEY (`idComments`),
  INDEX `fk_comments_Posts1_idx` (`postFid` ASC) VISIBLE,
  INDEX `fk_comments_Users1_idx` (`userFid` ASC) VISIBLE,
  CONSTRAINT `fk_comments_Posts1`
    FOREIGN KEY (`postFid`)
    REFERENCES `forum`.`Posts` (`idPosts`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_comments_Users1`
    FOREIGN KEY (`userFid`)
    REFERENCES `forum`.`Users` (`idUsers`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
