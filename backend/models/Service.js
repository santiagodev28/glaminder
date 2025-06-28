import db from "../database/connectiondb.js";

class Services {
    static async getAllServices() {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM servicios", (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }

    static async getServiceById(servicio_id) {
        return new Promise((resolve, reject) => {
            db.query(
                "SELECT * FROM servicios WHERE servicio_id = ?",
                [servicio_id],
                (err, results) => {
                    if (err) return reject(err);
                    resolve(results.length > 0 ? results[0] : null);
                }
            );
        });
    }

    static async createService({
        tienda_id,
        servicio_nombre,
        servicio_descripcion,
        servicio_precio,
        servicio_duracion,
        servicio_categoria,
    }) {
        return new Promise((resolve, reject) => {
            db.query(
                `INSERT INTO servicios 
                (tienda_id, servicio_nombre, servicio_descripcion, servicio_precio, servicio_duracion, servicio_categoria) 
                VALUES (?, ?, ?, ?, ?, ?)`,
                [
                    tienda_id,
                    servicio_nombre,
                    servicio_descripcion,
                    servicio_precio,
                    servicio_duracion,
                    servicio_categoria,
                ],
                (err, results) => {
                    if (err) return reject(err);
                    resolve({
                        message: "Servicio creado exitosamente.",
                        insertId: results.insertId,
                    });
                }
            );
        });
    }

    static async updateService(
        servicio_id,
        {
            tienda_id,
            servicio_nombre,
            servicio_descripcion,
            servicio_precio,
            servicio_duracion,
            servicio_categoria,
        }
    ) {
        return new Promise((resolve, reject) => {
            db.query(
                `UPDATE servicios SET 
                tienda_id = ?, 
                servicio_nombre = ?, 
                servicio_descripcion = ?, 
                servicio_precio = ?, 
                servicio_duracion = ?, 
                servicio_categoria = ?
                WHERE servicio_id = ?`,
                [
                    tienda_id,
                    servicio_nombre,
                    servicio_descripcion,
                    servicio_precio,
                    servicio_duracion,
                    servicio_categoria,
                    servicio_id,
                ],
                (err, results) => {
                    if (err) return reject(err);
                    resolve({
                        message: "Servicio actualizado exitosamente.",
                        affected: results.affectedRows,
                    });
                }
            );
        });
    }

    static async deleteService(servicio_id) {
        return new Promise((resolve, reject) => {
            db.query(
                "DELETE FROM servicios WHERE servicio_id = ?",
                [servicio_id],
                (err, results) => {
                    if (err) return reject(err);
                    resolve({
                        message: "Servicio eliminado exitosamente.",
                        affected: results.affectedRows,
                    });
                }
            );
        });
    }
}

export default Services;
