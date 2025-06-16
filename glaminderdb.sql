START TRANSACTION;
-- Base de datos: glaminderdb

DROP DATABASE IF EXISTS `glaminderdb`;
CREATE DATABASE `glaminderbd`;
USE `glaminderdb`;

DROP TABLE IF EXISTS `roles`, `usuarios`, `empleados`, `propietarios`, `negocios`, `tiendas`, `servicios`, `calificaciones`, `calificaciones_negocios`, `calificaciones_empleados`, `horarios`, `citas`;

-- Tabla roles
CREATE TABLE `roles` (
  `rol_id` INT AUTO_INCREMENT PRIMARY KEY,
  `rol_nombre` VARCHAR(50)
);

-- Datos iniciales
INSERT INTO `roles` (`rol_id`,`rol_nombre`) VALUES 
(1,'Administrador'),
(2,'Propietario'),
(3,'Empleado'),
(4,'Cliente');

-- Tabla usuarios
CREATE TABLE `usuarios` (
  `usuario_id` INT AUTO_INCREMENT PRIMARY KEY,
  `usuario_nombre` VARCHAR(100),
  `usuario_apellido` VARCHAR(100),
  `usuario_correo` VARCHAR(150) UNIQUE,
  `usuario_telefono` INT(10),
  `usuario_contrasena` VARCHAR(255),
  `usuario_fecha_registro` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `rol_id` INT
);

-- Tabla empleados
CREATE TABLE `empleados` (
  `empleado_id` INT AUTO_INCREMENT PRIMARY KEY,
  `usuario_id` INT,
  `tienda_id` INT,
  `empleado_especialidad` VARCHAR(100)
);

-- Tabla propietarios
CREATE TABLE `propietarios` (
  `propietario_id` INT AUTO_INCREMENT PRIMARY KEY,
  `usuario_id` INT
);

-- Tabla negocios
CREATE TABLE `negocios` (
  `negocio_id` INT AUTO_INCREMENT PRIMARY KEY,
  `propietario_id` INT,
  `negocio_nombre` VARCHAR(150),
  `negocio_telefono` VARCHAR(15),
  `negocio_correo` VARCHAR(150),
  `negocio_descripcion` TEXT,
  `negocio_fecha_registro` DATETIME
);

-- Tabla tiendas
CREATE TABLE `tiendas` (
  `tienda_id` INT AUTO_INCREMENT PRIMARY KEY,
  `negocio_id` INT,
  `tienda_nombre` VARCHAR(100),
  `tienda_direccion` VARCHAR(200),
  `tienda_telefono` VARCHAR(10),
  `tienda_correo` VARCHAR(150),
  `tienda_ciudad` VARCHAR(50),
  `tienda_latitud` DECIMAL(10,8),
  `tienda_longitud` DECIMAL(11,8),
  `tienda_activa` BOOLEAN,
  `tienda_fecha_apertura` DATE
);

-- Tabla servicios
CREATE TABLE `servicios` (
  `servicio_id` INT AUTO_INCREMENT PRIMARY KEY,
  `tienda_id` INT,
  `servicio_nombre` VARCHAR(100),
  `servicio_descripcion` TEXT,
  `servicio_precio` DECIMAL(10,2),
  `servicio_duracion` INT,  
  `servicio_categoria` VARCHAR(50)
);

-- Tabla calificaciones
CREATE TABLE `calificaciones` (
  `calificacion_id` INT AUTO_INCREMENT PRIMARY KEY,
  `usuario_id` INT,
  `calificacion_puntuacion` TINYINT,
  `calificacion_comentario` TEXT,
  `calificacion_imagen` TEXT,
  `calificacion_fecha` DATETIME
);

-- Tabla calificaciones_negocios
CREATE TABLE `calificaciones_negocios` (
  `negocio_id` INT,
  `calificacion_id` INT
);

-- Tabla calificaciones_empleados
CREATE TABLE `calificaciones_empleados` (
  `calificacion_id` INT,
  `empleado_id` INT
);

-- Tabla horarios
CREATE TABLE `horarios` (
  `horario_id` INT AUTO_INCREMENT PRIMARY KEY,
  `tienda_id` INT,
  `empleado_id` INT,
  `horario_dia` TINYINT,
  `horario_inicio` TIME,
  `horario_fin` TIME,
  `horario_activo` BOOLEAN
);

-- Tabla citas
CREATE TABLE `citas` (
  `cita_id` INT AUTO_INCREMENT PRIMARY KEY,
  `usuario_id` INT,
  `servicio_id` INT,
  `horario_id` INT,
  `empleado_id` INT,
  `tienda_id` INT,
  `cita_fecha` DATE,
  `cita_estado` ENUM('pendiente', 'confirmada', 'cancelada', 'completada'),
  `cita_motivo_cancelacion` TEXT,
  `cita_fecha_creacion` DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Claves foráneas
ALTER TABLE `usuarios` ADD FOREIGN KEY (`rol_id`) REFERENCES `roles`(`rol_id`);
ALTER TABLE `empleados` ADD FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`usuario_id`);
ALTER TABLE `empleados` ADD FOREIGN KEY (`tienda_id`) REFERENCES `tiendas`(`tienda_id`);
ALTER TABLE `propietarios` ADD FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`usuario_id`);
ALTER TABLE `negocios` ADD FOREIGN KEY (`propietario_id`) REFERENCES `propietarios`(`propietario_id`);
ALTER TABLE `tiendas` ADD FOREIGN KEY (`negocio_id`) REFERENCES `negocios`(`negocio_id`);
ALTER TABLE `servicios` ADD FOREIGN KEY (`tienda_id`) REFERENCES `tiendas`(`tienda_id`);
ALTER TABLE `calificaciones` ADD FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`usuario_id`);
ALTER TABLE `calificaciones_negocios` ADD FOREIGN KEY (`negocio_id`) REFERENCES `negocios`(`negocio_id`);
ALTER TABLE `calificaciones_negocios` ADD FOREIGN KEY (`calificacion_id`) REFERENCES `calificaciones`(`calificacion_id`);
ALTER TABLE `calificaciones_empleados` ADD FOREIGN KEY (`calificacion_id`) REFERENCES `calificaciones`(`calificacion_id`);
ALTER TABLE `calificaciones_empleados` ADD FOREIGN KEY (`empleado_id`) REFERENCES `empleados`(`empleado_id`);
ALTER TABLE `horarios` ADD FOREIGN KEY (`tienda_id`) REFERENCES `tiendas`(`tienda_id`);
ALTER TABLE `horarios` ADD FOREIGN KEY (`empleado_id`) REFERENCES `empleados`(`empleado_id`);
ALTER TABLE `citas` ADD FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`usuario_id`);
ALTER TABLE `citas` ADD FOREIGN KEY (`servicio_id`) REFERENCES `servicios`(`servicio_id`);
ALTER TABLE `citas` ADD FOREIGN KEY (`horario_id`) REFERENCES `horarios`(`horario_id`);
ALTER TABLE `citas` ADD FOREIGN KEY (`empleado_id`) REFERENCES `empleados`(`empleado_id`);
ALTER TABLE `citas` ADD FOREIGN KEY (`tienda_id`) REFERENCES `tiendas`(`tienda_id`);

COMMIT;
-- -- Fin de la transacción