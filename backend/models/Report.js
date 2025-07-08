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

  static async getTopEmployeesByAppointments(negocio_id) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT e.empleado_id, u.usuario_nombre AS nombre, u.usuario_apellido AS apellido, COUNT(*) AS total_citas FROM citas c JOIN empleados e ON c.empleado_id = e.empleado_id JOIN usuarios u ON e.usuario_id = u.usuario_id JOIN tiendas t ON e.tienda_id = t.tienda_id WHERE t.negocio_id = ? GROUP BY e.empleado_id ORDER BY total_citas DESC LIMIT 5`,
        [negocio_id],
        (err, results) => {
          if (err) return reject(err);
          resolve(results);
        }
      );
    });
  }

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
}

export default Reports;
