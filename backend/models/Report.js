import db from "../database/connectiondb.js";

class Reports{

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
}

export default Reports;
