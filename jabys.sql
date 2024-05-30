-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         8.0.30 - MySQL Community Server - GPL
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para jabys
CREATE DATABASE IF NOT EXISTS `jabys` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `jabys`;

-- Volcando estructura para tabla jabys.cliente
CREATE TABLE IF NOT EXISTS `cliente` (
  `id_cliente` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(250) DEFAULT NULL,
  `apellido_p` varchar(250) DEFAULT NULL,
  `apellido_m` varchar(250) DEFAULT NULL,
  `correo` varchar(250) DEFAULT NULL,
  `telefono` varchar(50) DEFAULT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  KEY `PK_ID_CLIENTE` (`id_cliente`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla jabys.cliente: ~0 rows (aproximadamente)
DELETE FROM `cliente`;

-- Volcando estructura para tabla jabys.insumo
CREATE TABLE IF NOT EXISTS `insumo` (
  `id_insumo` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(120) DEFAULT NULL,
  `unidad_medida` varchar(50) DEFAULT NULL,
  `cantidad` int DEFAULT NULL,
  KEY `PK_ID_INSUMO` (`id_insumo`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla jabys.insumo: ~0 rows (aproximadamente)
DELETE FROM `insumo`;

-- Volcando estructura para tabla jabys.producto
CREATE TABLE IF NOT EXISTS `producto` (
  `id_producto` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT NULL,
  `precio` int DEFAULT NULL,
  `cantidad` int DEFAULT NULL,
  `descripcion` varchar(250) DEFAULT NULL,
  `alto` float DEFAULT NULL,
  `ancho` float DEFAULT NULL,
  `largo` float DEFAULT NULL,
  `imagen` blob,
  KEY `PK_ID_PRODUCTO` (`id_producto`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla jabys.producto: ~0 rows (aproximadamente)
DELETE FROM `producto`;

-- Volcando estructura para tabla jabys.proveedor
CREATE TABLE IF NOT EXISTS `proveedor` (
  `id_proveedor` int NOT NULL AUTO_INCREMENT,
  `nombre` int DEFAULT NULL,
  `rut` int DEFAULT NULL,
  `materiales` json DEFAULT NULL,
  `direccion` int DEFAULT NULL,
  KEY `PK_ID_PROVEEDOR` (`id_proveedor`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla jabys.proveedor: ~0 rows (aproximadamente)
DELETE FROM `proveedor`;

-- Volcando estructura para tabla jabys.repuesto
CREATE TABLE IF NOT EXISTS `repuesto` (
  `id_respuesto` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT NULL,
  `precio` int DEFAULT NULL,
  `cantidad` int DEFAULT NULL,
  KEY `PK_ID_REPUESTO` (`id_respuesto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla jabys.repuesto: ~0 rows (aproximadamente)
DELETE FROM `repuesto`;

-- Volcando estructura para tabla jabys.solicitud
CREATE TABLE IF NOT EXISTS `solicitud` (
  `id_solicitud` int NOT NULL AUTO_INCREMENT,
  `id_cliente` int DEFAULT NULL,
  `id_producto` int DEFAULT NULL,
  KEY `PK_ID_SOLICITUD` (`id_solicitud`),
  KEY `FK_ID_CLIENTE_SOLICITUD` (`id_cliente`),
  KEY `FK_ID_PRODUCTO_SOLICITUD` (`id_producto`),
  CONSTRAINT `FK_ID_CLIENTE_SOLICITUD` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`),
  CONSTRAINT `FK_ID_PRODUCTO_SOLICITUD` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla jabys.solicitud: ~0 rows (aproximadamente)
DELETE FROM `solicitud`;

-- Volcando estructura para tabla jabys.venta
CREATE TABLE IF NOT EXISTS `venta` (
  `id_venta` int NOT NULL AUTO_INCREMENT,
  `id_producto` int DEFAULT NULL,
  `id_cliente` int DEFAULT NULL,
  `total` int DEFAULT NULL,
  `iva` int DEFAULT NULL,
  `totalneto` int DEFAULT NULL,
  KEY `PK_ID_VENTA` (`id_venta`),
  KEY `FK_ID_CLIENTE_VENTA` (`id_cliente`),
  KEY `FK_ID_PRODUCTO_VENTA` (`id_producto`),
  CONSTRAINT `FK_ID_CLIENTE_VENTA` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`),
  CONSTRAINT `FK_ID_PRODUCTO_VENTA` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla jabys.venta: ~0 rows (aproximadamente)
DELETE FROM `venta`;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
