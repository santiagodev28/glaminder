import db from "../database/connectiondb.js";

class Schedule {
    static async getAllSchedules() {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM horarios", (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }

    static async getScheduleById(horario_id) {
        return new Promise((resolve, reject) => {
            db.query(
                "SELECT * FROM horarios WHERE horario_id = ?",
                [horario_id],
                (err, results) => {
                    if (err) return reject(err);
                    resolve(results.length > 0 ? results[0] : null);
                }
            );
        });
    }

    static async deleteSchedule(horario_id) {
        return new Promise((resolve, reject) => {
            db.query(
                "DELETE FROM horarios WHERE horario_id = ?",
                [horario_id],
                (err, results) => {
                    if (err) return reject(err);
                    resolve({
                        message: "Horario eliminado exitosamente.",
                        affected: results.affectedRows,
                    });
                }
            );
        });
    }

    static async createSchedule({
        horario_dia,
        horario_hora_inicio,
        horario_hora_fin,
    }) {
        return new Promise((resolve, reject) => {
            db.query(
                "INSERT INTO horarios (horario_dia, horario_hora_inicio, horario_hora_fin) VALUES (?, ?, ?)",
                [horario_dia, horario_hora_inicio, horario_hora_fin],
                (err, results) => {
                    if (err) return reject(err);
                    resolve({
                        message: "Horario creado exitosamente.",
                        insertId: results.insertId,
                    });
                }
            );
        });
    }

    static async updateSchedule({
        horario_id,
        empleado_id,
        horario_dia,
        horario_hora_inicio,
        horario_hora_fin,
    }) {
        return new Promise((resolve, reject) => {
            db.query(
                `UPDATE horarios SET 
                    empleado_id = ?, 
                    horario_dia = ?, 
                    horario_hora_inicio = ?, 
                    horario_hora_fin = ? 
                 WHERE horario_id = ?`,
                [
                    empleado_id,
                    horario_dia,
                    horario_hora_inicio,
                    horario_hora_fin,
                    horario_id
                ],
                (err, results) => {
                    if (err) return reject(err);
                    resolve({
                        message: "Horario actualizado exitosamente.",
                        affected: results.affectedRows,
                    });
                }
            );
        });
    }
}

export default Schedule;
