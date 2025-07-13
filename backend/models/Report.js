import db from "../database/connectiondb.js";

class Reports {
  // Obtener todas las citas por estado (pendiente, confirmada, etc.)
  static async getAllAppointmentsByState(cita_estado) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM citas WHERE cita_estado = ?",
        [cita_estado],
        (err, results) => {
          if (err) return reject(err);
          resolve(results);
        }
      );
    });
  }

  // Obtener todas las citas por día específico
  static async getAppointmentsByDay(cita_fecha) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM citas WHERE cita_fecha = ?",
        [cita_fecha],
        (err, results) => {
          if (err) return reject(err);
          resolve(results);
        }
      );
    });
  }

  // Servicios más agendados (TOP 5)
  static async getMostScheduledServices() {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT servicio_id, COUNT(*) as cantidad 
                 FROM citas 
                 GROUP BY servicio_id 
                 ORDER BY cantidad DESC 
                 LIMIT 5`,
        (err, results) => {
          if (err) return reject(err);
          resolve(results);
        }
      );
    });
  }

  // Empleados más agendados (TOP 5)
  static async getMostScheduledEmployees() {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT empleado_id, COUNT(*) as cantidad 
                 FROM citas 
                 GROUP BY empleado_id 
                 ORDER BY cantidad DESC 
                 LIMIT 5`,
        (err, results) => {
          if (err) return reject(err);
          resolve(results);
        }
      );
    });
  }
  // Empleados más agendados por negocio
  static async getTopEmployeesByAppointments(negocio_id) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT e.empleado_id, u.usuario_nombre AS nombre, u.usuario_apellido AS apellido, COUNT(*) AS total_citas FROM citas c JOIN empleados e ON c.empleado_id = e.empleado_id JOIN usuarios u ON e.usuario_id = u.usuario_id JOIN tiendas t ON e.tienda_id = t.tienda_id WHERE t.negocio_id = 1 GROUP BY e.empleado_id ORDER BY total_citas DESC LIMIT 5;`,
        [negocio_id],
        (err, results) => {
          if (err) return reject(err);
          resolve(results);
        }
      );
    });
  }
  // Servicios más agendados por negocio
  static async getTopServicesByAppointments(negocio_id) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT s.servicio_id, s.servicio_nombre, COUNT(*) AS total_solicitudes FROM citas c JOIN servicios s ON c.servicio_id = s.servicio_id JOIN tiendas t ON c.tienda_id = t.tienda_id WHERE t.negocio_id = ? GROUP BY s.servicio_id ORDER BY total_solicitudes DESC LIMIT 5;`,
        [negocio_id],
        (err, results) => {
          if (err) return reject(err);
          resolve(results);
        }
      );
    });
  }
  // Tiendas más agendadas por negocio
  static async getTopStores(negocio_id) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT t.tienda_id, t.tienda_nombre, COUNT(*) AS total_visitas FROM citas c JOIN tiendas t ON c.tienda_id = t.tienda_id WHERE t.negocio_id = ? GROUP BY t.tienda_id ORDER BY total_visitas DESC LIMIT 5;`,
        [negocio_id],
        (err, results) => {
          if (err) return reject(err);
          resolve(results);
        }
      );
    });
  }
  // Negocios con más calificaciones
  static async getTopBusiness(negocio_id) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT n.negocio_id, n.negocio_nombre, n.negocio_descripcion, ROUND(AVG(c.calificacion_puntuacion),1) AS promedio_calificacion, COUNT(*) AS total_calificaciones FROM negocios n JOIN calificaciones_negocios nc ON n.negocio_id = nc.negocio_id JOIN calificaciones c ON nc.calificacion_id = c.calificacion_id WHERE n.negocio_estado = 1 GROUP BY n.negocio_id ORDER BY promedio_calificacion DESC LIMIT 5;`,
        [negocio_id],
        (err, results) => {
          if (err) return reject(err);
          resolve(results);
        }
      );
    });
  }
  // Agendamientos por mes
  static async getAppointmentsTrends(negocio_id) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT DATE_FORMAT(c.cita_fecha, '%Y-%m') AS mes, COUNT(*) AS total FROM citas c JOIN tiendas t ON c.tienda_id = t.tienda_id WHERE t.negocio_id = ? GROUP BY mes ORDER BY mes DESC LIMIT 6;`,
        [negocio_id],
        (err, results) => {
          if (err) return reject(err);
          resolve(results);
        }
      );
    });
  }
  // Usuarios registrados por mes
  static async getUserPerMonth(usuario_fecha_registro) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT DATE_FORMAT(usuario_fecha_registro, '%Y-%m') AS mes, COUNT(*) AS total FROM usuarios WHERE usuario_fecha_registro >= ? GROUP BY mes ORDER BY mes DESC LIMIT 6;`,
        [usuario_fecha_registro],
        (err, results) => {
          if (err) return reject(err);
          resolve(results);
        }
      );
    });
  }
  // Resumen de estadísticas
  static async getStatsOverview() {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT (SELECT COUNT(*) FROM usuarios) AS total_usuarios, (SELECT COUNT(*) FROM negocios) AS total_negocios, (SELECT COUNT(*) FROM empleados) AS total_empleados, (SELECT COUNT(*) FROM usuarios WHERE rol_id = 4) AS total_clientes;",
        (err, results) => {
          if (err) return reject(err);
          resolve(results);
        }
      );
    });
  }
}

export default Reports;
