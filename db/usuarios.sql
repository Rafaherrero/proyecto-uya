-- MySQL Script generated by MySQL Workbench
-- lun 09 may 2016 10:43:29 WEST
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema usuario_schema
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema usuario_schema
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `usuario_schema` DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci ;
USE `usuario_schema` ;

-- -----------------------------------------------------
-- Table `usuario_schema`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `usuario_schema`.`usuario` (
  `id` INT(10) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `nick` VARCHAR(45) NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `apellidos` VARCHAR(45) NOT NULL,
  `cumpleanos` DATE NULL,
  `telefono` INT(9) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = ucs2
COLLATE = ucs2_spanish_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
