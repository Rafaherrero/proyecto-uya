-- MySQL Script generated by MySQL Workbench
-- lun 09 may 2016 10:43:29 WEST
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema sharis_development
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema sharis_development
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `sharis_development` DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci ;
USE `sharis_development` ;

-- -----------------------------------------------------
-- Table `sharis_development`.`Rutas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sharis_development`.`Rutas` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `propietario` INT(11) NOT NULL,
  `origen` INT(11) NOT NULL,
  `destino` INT(11) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = ucs2
COLLATE = ucs2_spanish_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
