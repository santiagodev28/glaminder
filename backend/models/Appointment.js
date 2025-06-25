import db from "../database/connectiondb.js";

class Appointment {
    static async getAllAppointments() {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM citas", (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }

    static async getAppointmentById(cita_id) {
        return new Promise((resolve, reject) => {
            db.query(
                "SELECT * FROM citas WHERE cita_id = ?",
                [cita_id],
                (err, results) => {
                    if (err) return reject(err);
                    resolve(results.length > 0 ? results[0] : null);
                }
            );
        });
    }

    static async updateAppointment(cita_id, cita) {
        return new Promise((resolve, reject) => {
            const { tienda_id, servicio_id, cita_fecha, horario_id } = cita;
            db.query(
                "UPDATE citas SET tienda_id = ?, servicio_id = ?, cita_fecha = ?, horario_id = ? WHERE cita_id = ?",
                [tienda_id, servicio_id, cita_fecha, horario_id, cita_id],
                (err, results) => {
                    if (err) return reject(err);
                    resolve({ message: "Cita actualizada exitosamente." });
                }
            );
        });
    }

    static async createAppointment({
        usuario_id,
        empleado_id,
        tienda_id,
        servicio_id,
        cita_fecha,
        horario_id
    }) {
        return new Promise((resolve, reject) => {
            db.query(
                "INSERT INTO citas (usuario_id, empleado_id, tienda_id, servicio_id, cita_fecha, horario_id) VALUES (?, ?, ?, ?, ?, ?)",
                [
                    usuario_id,
                    empleado_id,
                    tienda_id,
                    servicio_id,
                    cita_fecha,
                    horario_id,
                ],
                (err, results) => {
                    if (err) return reject(err);
                    resolve({ message: "Cita creada exitosamente." });
                }
            );
        });
    }

    static async changeStateAppointment(cita_id, nuevo_estado) {
        return new Promise((resolve, reject) => {
            db.query(
                "UPDATE citas SET cita_estado = ? WHERE cita_id = ?",
                [nuevo_estado, cita_id],
                (err, results) => {
                    if (err) return reject(err);
                    resolve({ message: "Cita actualizada exitosamente." });
                }
            );
        });
    }

    static async cancelAppointment(cita_id) {
        return this.changeStateAppointment(cita_id, "cancelada");
    }

    static async confirmAppointment(cita_id) {
        return this.changeStateAppointment(cita_id, "confirmada");
    }

    static async completeAppointment(cita_id) {
        return this.changeStateAppointment(cita_id, "completada");
    }

    static async deleteAppointment(cita_id) {
        return new Promise((resolve, reject) => {
            db.query(
                "DELETE FROM citas WHERE cita_id = ? AND cita_estado = 'pendiente'",
                [cita_id],
                (err, results) => {
                    if (err) return reject(err);
                    resolve({
                        deleted: results.affectedRows,
                        message:
                            results.affectedRows > 0
                                ? "Cita eliminada exitosamente."
                                : "No se pudo eliminar la cita.",
                    });
                }
            );
        });
    }
}

export default Appointment;
